import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledPaper = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
  }));
  
function WinterCollection() {
  const [winter, setWinter] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/winter/')
      .then((res) => {
        console.log(res.data.result)
        setWinter(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Button variant="contained">Add to Cart</Button>
      </StyledPaper>
    </Grid>
  ))}
</Grid>
      </Box>
    </div>
  );
}

export default WinterCollection;