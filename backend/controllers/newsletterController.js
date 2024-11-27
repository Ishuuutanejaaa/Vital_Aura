const Subscriber = require('../model/Subscriber');
const nodemailer = require('nodemailer');

exports.subscribe = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "Already subscribed" });
        }

        const subscriber = new Subscriber({ email });
        await subscriber.save();

        // Send confirmation email (setup nodemailer transport)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Subscription Confirmation',
            text: 'Thank you for subscribing to our newsletter!'
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Subscription successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
};