require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');

router.post('/create-checkout-session', async (req, res) => {
    const { cart } = req.body;

    const line_items = cart.map(item => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item.title,
                images: [item.image],
            },
            unit_amount: parseFloat(item.price.replace('₹', '').replace(',', '')) * 100, // Convert to paise
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/product/success`,
            cancel_url: `${process.env.FRONTEND_URL}/product/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Stripe session creation error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
