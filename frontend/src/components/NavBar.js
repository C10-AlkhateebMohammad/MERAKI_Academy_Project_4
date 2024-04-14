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
import { useNavigate, useLocation } from 'react-router-dom';
import global_en from "./tranzolation/en/global.json"
import global_ar from "./tranzolation/ar/global.json"

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
  const { selectedCategory, setselectedCategory, cartItemsCount, setCartItemsCount, products, setProducts,token } = React.useContext(UserContext);
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [categoryProducts, setCategoryProducts] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState((location.pathname.includes("login") || location.pathname.includes("register")) ?false:true);
  const [addCart, setAddCart] = useState();
  const [quantity, setQuantity] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  const [originalProducts, setOriginalProducts] = useState([]);

  

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
      setCategoryProducts(/* Fetch products for Shoes category*/ );
    } else if (category === 'T-Shirts') {
      setCategoryProducts(/* Fetch products for T-Shirts category */);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/category/')
      .then((res) => {
        console.log(res.data.categories)
        setCategoryProducts(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(()=>{
if(location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("contact")){
  setShowNavbar(false)
}else
{
  setShowNavbar(true)
}
  },[location.pathname])

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
  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
  };
  useEffect(() => {
   const timer = setTimeout(() => {
      if (searchItem.trim() === '') {
        setProducts(products);
      } else {
        const filteredProduct = products.filter(product =>
          product.Name.toLowerCase().includes(searchItem.toLowerCase())
        );
        setProducts(filteredProduct);
      }
    }, 500);
  
    return () => clearTimeout(timer);
  }, [searchItem, setProducts, products]);
  
  
  return (
    <>
      {showNavbar && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{backgroundColor: 'white', color: 'black'}}>
            <Toolbar>
              <Typography variant="h6" component={Link} to="/" sx={{color: 'black', fontWeight: 'bold'}}>
                FashionMart
              </Typography>
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
                
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleSearchChange}
                />
              </Search>
              <Link
                to='/alladdproduct'
              >
                <ShoppingCartIcon />
                <Typography variant="caption">{cartItemsCount}</Typography>
              </Link>
              <Button color="inherit" component={Link} to="/login" onClick={login} sx={{color: 'blue'}}>
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                element={<Register />}
                sx={{
                  color: 'black',
                  border: '1px solid white', 
                  borderRadius: '5px', 
                  '&:hover': {
                    borderColor: 'black',   
                  },
                }}
              >
                Register
              </Button>
              <Link to="/login" onClick={logout} sx={{color: 'white'}}>
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
