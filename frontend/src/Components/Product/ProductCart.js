import React from 'react';
import { useCart } from './CartContext';
import { loadStripe } from '@stripe/stripe-js';
import './ProductCart.css';

const stripePromise = loadStripe('pk_test_51QTeiiDR27IwezZexV7B1xZIuCvAYWg2IOj83dugCEQ2P2zXoRBDGaZnpA47LbYTlgzWznGDDtj4FevyLU4cimex00vw9wLs9j'); // Use your publishable Stripe key

const ProductCart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('₹', ''));
        return total + price * item.quantity;
    }, 0);

    const handleBuyNow = async () => {
        const response = await fetch('http://localhost:5000/api/products/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart }),
        });

        const session = await response.json();

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

        if (error) {
            console.error('Stripe Checkout error:', error);
        }
    };

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <img src={item.image} alt={item.title} />
                            <div className="cart-details">
                                <h2>{item.title}</h2>
                                <p>Price: {item.price}</p>
                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.title, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.title, item.quantity + 1)}>+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.title)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
                    <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                </div>
            )}
        </div>
    );
};

export default ProductCart;

