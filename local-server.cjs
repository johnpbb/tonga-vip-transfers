const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const app = express();
const nodemailer = require('nodemailer');

// Initialize Stripe
// We need to handle the case where the key is missing gracefully for the server to start, 
// though payments will fail.
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? require('stripe')(stripeKey) : null;

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

// ANZ Credentials
const ANZ_MERCHANT_ID = process.env.ANZ_MERCHANT_ID;
const ANZ_API_PASSWORD = process.env.ANZ_API_PASSWORD;
const ANZ_API_URL = `https://anzegate.gateway.mastercard.com/api/rest/version/81/merchant/${ANZ_MERCHANT_ID}/session`;

// Helper to create basic auth header
const getAnzAuthHeader = () => {
    const authString = `merchant.${ANZ_MERCHANT_ID}:${ANZ_API_PASSWORD}`;
    return `Basic ${Buffer.from(authString).toString('base64')}`;
};


// Helper to read bookings
const getBookings = () => {
    try {
        if (!fs.existsSync(BOOKINGS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(BOOKINGS_FILE);
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading bookings:', err);
        return [];
    }
};

// Helper to save booking
const saveBooking = (booking) => {
    const bookings = getBookings();
    bookings.push(booking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
};

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Configure Email Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.us.opalstack.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API Endpoint to create a Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
    if (!stripe) {
        return res.status(500).send({ error: { message: "Stripe is not configured on the server." } });
    }

    try {
        // In a real app, calculate the amount on the server based on the items/service
        // For now, we'll use a placeholder amount of $50.00 USD
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // $50.00
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        console.error('Stripe error:', e);
        res.status(400).send({ error: { message: e.message } });
    }
});

// CREATE ANZ SESSION Endpoint
app.post('/api/create-anz-session', async (req, res) => {
    const { amount, currency = 'FJD', orderId } = req.body;

    if (!ANZ_MERCHANT_ID || !ANZ_API_PASSWORD) {
        return res.status(500).json({ error: 'ANZ credentials not configured' });
    }

    try {
        const payload = {
            apiOperation: "INITIATE_CHECKOUT",
            interaction: {
                operation: "PURCHASE"
            }
        };

        console.log('Creating ANZ Session...');
        console.log('URL:', ANZ_API_URL);
        console.log('Payload:', JSON.stringify(payload, null, 2));

        const response = await fetch(ANZ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAnzAuthHeader()
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('ANZ Response Status:', response.status);
        console.log('ANZ Response Data:', JSON.stringify(data, null, 2));

        if (data.result === 'SUCCESS') {
            res.json({
                sessionId: data.session.id,
                successIndicator: data.successIndicator,
                orderId: orderId || `ORDER-${Date.now()}`
            });
        } else {
            console.error('ANZ Session Creation Failed:', data);
            res.status(400).json({ error: 'Failed to create session', details: data });
        }
    } catch (err) {
        console.error('ANZ Server Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// API Endpoint to send emails and save booking
app.post('/api/send-email', (req, res) => {
    const { subject, text, html, paymentIntentId, ...bookingData } = req.body;

    // Save booking to local file
    const newBooking = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        paymentStatus: paymentIntentId ? 'Paid' : 'Pending/Quote',
        paymentIntentId,
        ...bookingData
    };

    try {
        saveBooking(newBooking);
        console.log('Booking saved:', newBooking.id);
    } catch (err) {
        console.error('Failed to save booking:', err);
    }

    const mailOptions = {
        from: '"Tonga VIP Website" <info@tongaviptransfers.com>',
        to: 'info@tongaviptransfers.com',
        subject: subject || 'New Message from Website',
        text: text,
        html: html || text // Use text as fallback for html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            // We still return success if booking was saved, but warn about email? 
            // Better to fail if email fails for now as it's the primary notification.
            res.status(500).json({ success: false, error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

// Admin API: Get all bookings
app.get('/api/bookings', (req, res) => {
    const bookings = getBookings();
    // Sort by newest first
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(bookings);
});

// Admin API: Delete a booking
app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    let bookings = getBookings();
    const initialLength = bookings.length;
    bookings = bookings.filter(b => b.id !== id);

    if (bookings.length === initialLength) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    res.json({ success: true, message: 'Booking deleted' });
});

// Admin API: Simple Login
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    // Simple protection
    if (password === process.env.ADMIN_PASS) {
        res.json({ success: true, token: 'admin-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing - serve index.html for all routes
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// IMPORTANT: Use Opalstack's PORT environment variable
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tonga VIP Transfers running on port ${PORT}`);
    console.log(`Access at: https://tvip.ajsolutions.opalstacked.com`);
});
