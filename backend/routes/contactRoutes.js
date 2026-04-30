const express = require('express');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
        }

        const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

        await sendEmail({
            to: adminEmail,
            subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
            html: `
                <h3>New Contact Us Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                <hr />
                <h4>Message:</h4>
                <p>${message}</p>
            `
        });

        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message via Contact Us form', error: error.message });
    }
});

module.exports = router;
