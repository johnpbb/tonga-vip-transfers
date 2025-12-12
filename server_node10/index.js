const express = require('express');
const path = require('path');

const app = express();

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
