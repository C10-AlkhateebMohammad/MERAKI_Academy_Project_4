import React, { useState, useEffect,useContext } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';


const StyledPaper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
}));

function BestProduct() {
  const [bestProduct, setBestProduct] = useState([]);
  const { cart, setCart }=useContext(UserContext)
  const navigate = useNavigate();
  const { cartItemsCount, setCartItemsCount } = useContext(UserContext);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/product?tages=bestproduct')
      .then((res) => {
        setBestProduct(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCart = (productId, quantity) => {
    const token = localStorage.getItem('token'); 
    axios.post('http://localhost:5000/cart/add', {
        product: productId,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data.message)
        setCart([...cart, res.data]);
        setCartItemsCount(cartItemsCount + quantity);
        alert('added has been successfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }

 

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
  {Array.isArray(bestProduct) && bestProduct.map((product, index) => (
    <Grid item xs={6} sm={4} md={2} key={index}>
      <StyledPaper>
      {product.images&&product.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={image} alt={`Image ${imgIndex}`} style={{ width: '200px', height: '200px' }} />
                ))}
        <h2>{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>Brand: {product.brand}</p>
        <Button variant="contained" onClick={()=>{
          addToCart(product._id,1);
        }} >Add to Cart</Button>
      </StyledPaper>
    </Grid>
  ))}
</Grid>
      </Box>
    </div>
  );
}

export default BestProduct;