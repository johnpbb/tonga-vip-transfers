const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const nodemailer = require('nodemailer');

const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

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
        user: 'info_tvip',
        pass: 'TtSOJGTWCEe6di3'
    }
});

// API Endpoint to send emails and save booking
app.post('/api/send-email', (req, res) => {
    const { subject, text, html, ...bookingData } = req.body;

    // Save booking to local file
    const newBooking = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
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
    // Hardcoded password for "Simple protection"
    if (password === 'TongaVIP2025!') {
        res.json({ success: true, token: 'admin-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle client-side routing - serve index.html for all routes
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// IMPORTANT: Use Opalstack's PORT environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tonga VIP Transfers running on port ${PORT}`);
    console.log(`Access at: https://tvip.ajsolutions.opalstacked.com`);
});
