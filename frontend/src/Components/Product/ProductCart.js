import React from 'react';
import { useCart } from './CartContext';
import './ProductCart.css';

const ProductCart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('₹', ''));
        return total + price * item.quantity;
    }, 0);

    const handleBuyNow = () => {
        alert('Purchase successful!');
        clearCart();
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
