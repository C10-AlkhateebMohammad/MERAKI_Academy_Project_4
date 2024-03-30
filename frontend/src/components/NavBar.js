import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: 'auto', // Set width to auto to center the input
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SearchAppBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    const category = event.currentTarget.textContent;
    if (category === 'Shoes') {
      axios.get('http://localhost:5000/category/shoes')
        .then((res) => {
          setCategoryProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category === 'T-Shirts') {
      axios.get('http://localhost:5000/category/t-shirts')
        .then((res) => {
          setCategoryProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const addToCart = (productId) => {
    // Logic to add item to cart
  };

  const handleAddToCart = (productId) => {
    console.log(`Product ${productId} added to cart.`);
    addToCart(productId);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/category/categories')
      .then((res) => {
        setCategoryProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
  id="menu-appbar"
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>
  <MenuItem onClick={(event) => handleMenuClick(event, 'Shoes')}>Shoes</MenuItem>
  <MenuItem onClick={(event) => handleMenuClick(event, 'T-Shirts')}>T-Shirts</MenuItem>
</Menu>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Search>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="open shopping cart"
            onClick={handleOpenModal}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cart Items
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {cartItems.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            ))}
            <Button variant="contained" onClick={handleCloseModal}>Check Out</Button>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}