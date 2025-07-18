import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'Gmail', // or 'hotmail', 'Yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password (not email password)
    },
});

async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: `"Receipe App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;
