import React, { useState, useEffect,useContext } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { UserContext } from '../App';


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

  useEffect(() => {
    axios.get('http://localhost:5000/best/')
      .then((res) => {
        setBestProduct(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
  {Array.isArray(bestProduct) && bestProduct.map((product, index) => (
    <Grid item xs={6} sm={4} md={2} key={index}>
      <StyledPaper>
      {product.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={image} alt={`Image ${imgIndex}`} style={{ width: '200px', height: '200px' }} />
                ))}
        <h2>{product.name}</h2>
        <p>Price: {product.price}</p>
        <p>Brand: {product.brand}</p>
        <Button variant="contained">Add to Cart</Button>
      </StyledPaper>
    </Grid>
  ))}
</Grid>
      </Box>
    </div>
  );
}

export default BestProduct;