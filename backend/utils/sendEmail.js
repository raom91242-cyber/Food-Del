const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    // Note: If you haven't verified a custom domain on Resend, you MUST send from 'onboarding@resend.dev'
    // and you can only send TO the email address you signed up to Resend with.
    const fromAddress = process.env.NODE_ENV === 'production' 
        ? `${process.env.FROM_NAME || 'Food-Del'} <${process.env.FROM_EMAIL}>` 
        : 'Food-Del <onboarding@resend.dev>';

    await resend.emails.send({
        from: fromAddress,
        to: options.to,
        subject: options.subject,
        html: options.html
    });
};

module.exports = sendEmail;
