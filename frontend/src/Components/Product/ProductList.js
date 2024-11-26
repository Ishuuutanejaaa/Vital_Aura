import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './ProductList.css';

const ProductList = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [searchQuery, setSearchQuery] = useState('');
    
    // Predefined list of products
    const products = [
        { image: 'paracetamol.jpeg', title: 'Paracetamol', price: '₹25.00', description: 'Pain reliever' },
        { image: 'Ibuprofen.jpeg', title: 'Ibuprofen', price: '₹30.00', description: 'Anti-inflammatory' },
        { image: 'aspirin.jpeg', title: 'Aspirin', price: '₹40.00', description: 'Pain relief' },
        { image: 'Cetirizine.jpeg', title: 'Cetirizine', price: '₹15.00', description: 'Allergy relief' },
        { image: 'Amoxicillin.jpeg', title: 'Amoxicillin', price: '₹50.00', description: 'Antibiotic' },
        { image: 'Metformin.jpeg', title: 'Metformin', price: '₹60.00', description: 'Diabetes control' },
        { image: 'Atorvastatin.jpeg', title: 'Atorvastatin', price: '₹75.00', description: 'Cholesterol reducer' },
        { image: 'Ranitidine.jpeg', title: 'Ranitidine', price: '₹35.00', description: 'Acidity relief' },
        { image: 'Loratadine.jpeg', title: 'Loratadine', price: '₹20.00', description: 'Allergy relief' },
        { image: 'Losartan.jpeg', title: 'Losartan', price: '₹45.00', description: 'Blood pressure control' },
        { image: 'Omeprazole.jpeg', title: 'Omeprazole', price: '₹25.00', description: 'Acid reflux relief' },
        { image: 'Vitamin D3.jpeg', title: 'Vitamin D3', price: '₹120.00', description: 'Bone health' },
        { image: 'Calcium Carbonate.jpeg', title: 'Calcium Carbonate', price: '₹90.00', description: 'Calcium supplement' },
        { image: 'Cough Syrup.jpeg', title: 'Cough Syrup', price: '₹70.00', description: 'Cough relief' },
        { image: 'Multivitamins.jpeg', title: 'Multivitamins', price: '₹150.00', description: 'General health' },
        { image: 'Insulin.jpeg', title: 'Insulin', price: '₹500.00', description: 'Diabetes management' },
        { image: 'Antacid.jpeg', title: 'Antacid', price: '₹40.00', description: 'Indigestion relief' },
        { image: 'Antiseptic Cream.jpeg', title: 'Antiseptic Cream', price: '₹80.00', description: 'Wound healing' },
    ];

    // Filtered products based on search query
    const filteredProducts = products.filter(
        (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToCart = (product) => {
        addToCart(product);
        navigate('/cart'); // Redirect to cart page
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Update search query on input change
    };

    return (
        <div className="product-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for medicines..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button onClick={() => setSearchQuery(searchQuery)}>Search</button>
            </div>

            <div className="product-list">
                {filteredProducts.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    filteredProducts.map((product, index) => (
                        <div className="product" key={index}>
                            <img src={product.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            <button onClick={() => handleAddToCart(product)}>Buy Now</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;
