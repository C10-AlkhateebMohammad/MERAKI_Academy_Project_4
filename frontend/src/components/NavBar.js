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
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Register from './Register';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: 'auto',
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
  const { selectedCategory, setselectedCategory, cartItemsCount, setCartItemsCount } = React.useContext(UserContext);
  const {searchQuery, setSearchQuery}=React.useContext(UserContext)
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryProducts, setCategoryProducts] = React.useState([]);
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [addCart, setAddCart] = useState();
  const [quantity, setQuantity] = useState(1);
  const [searchItem, setSearchItem] = useState('')
  const {products, setProducts}=React.useContext(UserContext)


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setAnchorEl(null);
    getAllCart(); 
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    const category = event.currentTarget.textContent;
    if (category === 'Shoes') {
      setCategoryProducts(/* Fetch products for Shoes category */);
    } else if (category === 'T-Shirts') {
      setCategoryProducts(/* Fetch products for T-Shirts category */);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/category/caetgories')
      .then((res) => {
        setCategoryProducts(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setShowNavbar(false);
  };

  const login = () => {
    setShowNavbar(true);
  };

  const getAllCart = () => {
    axios.get('http://localhost:5000/cart')
      .then((res) => {
        setAddCart(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filteredProduct = products.filter(product =>
    product.Name.toLowerCase().includes(searchItem.toLowerCase())
);

  return (
    <>
      {showNavbar && (
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
                {categoryProducts.map((item, i) => {
                  return (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        setselectedCategory(item._id);
                        handleMenuClose();
                        console.log(item._id);
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Menu>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/AllCart"
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
                  value={searchItem}
                  onChange={(e)=>{
                    setSearchItem(e.target.va)
                  }}
                />
              </Search>
              <Link
              to='/alladdproduct'
                 
              >
                <ShoppingCartIcon />
                <Typography variant="caption">{cartItemsCount}</Typography>
              </Link>
              <Button color="inherit" component={Link} to="/login" onClick={login}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register" element={<Register />}>
                Register
              </Button>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
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
                Modal Title
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {addCart && (
    <div>
      <p>{addCart.product}</p>
      {}
    </div>
  )}
              </Typography>
            </Box>
          </Modal>
        </Box>
      )}
    </>
  );
}