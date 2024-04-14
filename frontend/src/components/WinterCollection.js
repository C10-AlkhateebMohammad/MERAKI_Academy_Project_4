import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserContext } from '../App';

const StyledPaper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
}));

function WinterCollection() {
  const [winter, setWinter] = useState([]);
  const { cart, setCart } = useContext(UserContext);
  const { cartItemsCount, setCartItemsCount } = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:5000/product?tages=Winter')
      .then((res) => {
        console.log(res.data);
        setWinter(res.data.articles);
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
          {winter.map((product, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <StyledPaper>
                {product.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={image} alt={`Image ${imgIndex}`} style={{ width: '200px', height: '200px' }} />
                ))}
                <h2>{product.Name}</h2>
                <p>Price: {product.price}</p>
                <p>Brand: {product.brand}</p>
                <Button variant="contained" onClick={() => addToCart(product._id,1)}>Add to Cart</Button>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default WinterCollection;