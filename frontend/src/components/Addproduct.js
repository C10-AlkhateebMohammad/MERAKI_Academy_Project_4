import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function Addproduct() {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { setCartItemsCount }=useContext(UserContext)
    const navigate = useNavigate();
const token=localStorage.getItem('token')
    useEffect(() => {
        axios.get('http://localhost:5000/cart/',{
            headers: {
                Authorization: `Bearer ${token}`
                }
        })
            .then((res) => {
                setProducts(res.data.cartItem.map(item => item.product));
                const priceTotal = res.data.cartItem.reduce((acc, item) => {
                    const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ''));
                    return acc + price;
                }, 0);
                setTotalPrice(priceTotal);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleCheckout = () => {
        alert("Thank you! Your purchase has been completed successfully.");

        setProducts([]);
        setTotalPrice(0);
        setCartItemsCount(0)
    };
    const back=()=>{
navigate('/')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <h1>Shopping Cart</h1>
            {products && products.map((product, i) => (
                <div key={i} style={styles.product}>
                    <img src={product.images[0]} alt={`Image ${i}`} style={styles.image} />
                    <div>
                        <p style={styles.name}>{product.Name}</p>
                        <p style={styles.price}>{product.price}</p>
                        <p style={styles.brand}>{product.brand}</p>
                    </div>
                </div>
            ))}
            <p style={{ marginTop: '20px', fontSize: '1.2em' }}>Total Price: {totalPrice}</p>
            <button onClick={handleCheckout} style={styles.button}>Checkout</button>
            <button style={styles.backButton} onClick={back}>Back</button>
        </div>
    );
}

const styles = {
    product: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '600px',
    },
    image: {
        width: '150px',
        height: '150px',
        marginRight: '20px',
    },
    name: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    price: {
        marginBottom: '5px',
    },
    brand: {
        color: '#666',
        marginBottom: '5px',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1.2em',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    backButton: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        padding: '10px',
        fontSize: '1em',
        backgroundColor: '#f8f9fa',
        color: '#212529',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};