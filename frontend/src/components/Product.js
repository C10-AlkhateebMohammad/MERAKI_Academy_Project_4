import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
}));

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // تحديد كمية افتراضية
  const [cartItems, setCartItems] = useState([]);
  const [visitsCount, setVisitsCount] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:5000/visit')
    .then((res)=>{
      setVisitsCount(res.data.count);
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  useEffect(() => {
    axios.get('http://localhost:5000/product')
      .then((res) => {
        setProducts(res.data.articles.resuilt);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const addToCart = (productId) => {
    axios.post('http://localhost:5000/cart/add', { product: productId, quantity })
      .then((res) => {
        console.log('Product added to cart:', res.data);
      })
      .catch((err) => {
        console.error('Error adding to cart:', err);
      });
  };

  const handleAddToCart = (productId) => {
    console.log(`Product ${productId} added to cart with quantity ${quantity}.`);
    addToCart(productId);
  };

  if (error) {
    return <p>Error fetching products: {error}</p>;
  }

  return (
    <div className='mo'>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <StyledPaper>
              {product.images.map((image, imgIndex) => (
                <img key={imgIndex} src={image} alt={`Image ${imgIndex}`} style={{ width: '200px', height: '200px' }} />
              ))}
              <h2>{product.Name}</h2>
              <p>Price: {product.price}</p>
              <p>Brand: {product.brand}</p>
              <Button variant="contained" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
    <footer>
      <p>Total Visits: {visitsCount}</p>
    </footer>
    </div>
  );
}

export default Product;