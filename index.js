const express = require('express');
const path = require('path');

const app = express();
const nodemailer = require('nodemailer');

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

// API Endpoint to send emails
app.post('/api/send-email', (req, res) => {
    const { subject, text, html } = req.body;

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

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// IMPORTANT: Use Opalstack's PORT environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tonga VIP Transfers running on port ${PORT}`);
    console.log(`Access at: https://tvip.ajsolutions.opalstacked.com`);
});
