import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { 
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AddProduct() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { setCartItemsCount } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/cart/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setCartItems(res.data.cartItem);
            const priceTotal = res.data.cartItem.reduce((acc, item) => {
                const price = parseFloat(item.product.price.replace(/[^0-9.]/, ''));
                return acc + price * item.quantity;
            }, 0);
            setTotalPrice(priceTotal);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleCheckout = () => {
        alert("Thank you! Your purchase has been completed successfully.");
        setCartItems([]);
        setTotalPrice(0);
        setCartItemsCount(0);
    };

    const back = () => {
        navigate('/');
    }

    const deleteCart = (idCart) => {
        axios.delete(`http://localhost:5000/cart/${idCart}`)
        .then((res) => {
            setCartItems(cartItems.filter(cartItem => cartItem._id !== idCart));
            const updatedPriceTotal = cartItems.reduce((acc, item) => {
                const price = parseFloat(item.product.price.replace(/[^0-9.]/, ''));
                return acc + price * item.quantity;
            }, 0);
            setTotalPrice(updatedPriceTotal);  
            alert("deleted has been successfully")
        })
        .catch((err) => {
            console.log("error deleting cart", err);
        });
    } 

    return (
        <Box sx={styles.container}>
            <Typography variant="h4" sx={styles.title}>Shopping Cart</Typography>
            {cartItems.map((cartItem, i) => (
                <Paper key={i} elevation={3} sx={styles.product}>
                    <img src={cartItem.product.images[0]} alt={`Product ${i}`} style={styles.image} />
                    <Box sx={{ flexGrow: 1, ml: 2 }}>
                        <Typography variant="h6" sx={styles.name}>{cartItem.product.Name}</Typography>
                        <Typography variant="body1" sx={styles.price}>Price: {cartItem.product.price}</Typography>
                        <Typography variant="body1" sx={styles.quantity}>Quantity: {cartItem.quantity}</Typography>
                    </Box>
                    <IconButton id='delete' onClick={() => deleteCart(cartItem._id)} sx={styles.deleteButton} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Paper>
            ))}
            <Typography variant="h6" sx={styles.totalPrice}>Total Price: {totalPrice}</Typography>
            <Button className='btnCheckOut' onClick={handleCheckout} sx={styles.button} variant="contained">Checkout</Button>
            <Button onClick={back} sx={styles.backButton} variant="outlined">Back</Button>
        </Box>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
    },
    title: {
        marginBottom: '20px',
    },
    product: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px',
    },
    image: {
        width: '150px',
        height: '150px',
        marginRight: '20px',
        borderRadius: '5px',
    },
    name: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    price: {
        marginBottom: '5px',
    },
    quantity: {
        marginBottom: '5px',
    },
    deleteButton: {
        padding: '10px',
        color: 'error.main',
    },
    totalPrice: {
        marginTop: '20px',
    },
    button: {
        marginTop: '20px',
        marginRight: '10px',
        padding: '10px 20px',
    },
    backButton: {
        marginTop: '20px',
        padding: '10px 20px',
    },
};
