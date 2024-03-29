import React from 'react'
import { AppBar, Toolbar ,Typography,Stack , Button } from '@mui/material'
import { Link } from 'react-router-dom';  
import '../App.css'
function NavBar() {
  return (
    <AppBar className='custom-app-bar'>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant='h6' component="div">
                    mubn
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Link to='/register' className='nav-link'>Register</Link>
                    <Link to="/login" className='nav-link'>Login</Link>
                </Stack>
            </Toolbar>
        </AppBar>

  )
}

export default NavBar