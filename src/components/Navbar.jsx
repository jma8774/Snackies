import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../redux/features/userSlice'
import ThemeSwitch from '../components/ThemeSwitch';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import { useHistory } from 'react-router-dom';
import { keyframes } from '@mui/system';
import logo from '../assets/icon.png';
import DrawerList from './DrawerList'
import useScrollTrigger from '@mui/material/useScrollTrigger';

const shakeBag = keyframes`
  0% { transform: translate(1px, 1px) rotate(-3deg); }
  2% { transform: translate(-1px, -1px) rotate(-10deg); }
  4% { transform: translate(-1px, 1px) rotate(5deg); }
  6% { transform: translate(0px, 0px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`;

const shakeCart = keyframes`
  0% { transform: rotate(0deg); }
  33% { transform: rotate(-5deg); }
  66% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const Navbar = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const cart = useSelector((state) => state.user.cart_count)
  const history = useHistory()
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const theme = useSelector((state) => state.theme)
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const logout = async () => {
    cookies.remove("token", { path: '/' })
    console.log("Token cookie:", cookies.getAll().token)
    dispatch(reset())
  }

  return (
    <Box sx={{ flexGrow: 1, mb: "200px"}} >
      <AppBar position="fixed" sx={{ 
        ".MuiToolbar-root": {
          backgroundColor: "background.default", 
        },
        transition: "boxShadow 1s ease",
        boxShadow: trigger ? 2 : 0,
        height: 100
      }}>
        <Box component={Toolbar} height="500px" sx={{display: "flex", alignItems: "center"}}>
          {/* App Icon */}
          <Box component={Link} to="/" sx={{mr: 1.5, animation: `${shakeBag} 10s infinite ease`}}>
            <img alt="Snack Icon" src={logo} height="40 px" />
          </Box>  
          {/* Snackies Name */}
          <Typography variant="h5" color="text.primary" sx={{fontWeight: 500, fontFamily: 'GFS Didot , serif', flexGrow: 1}}>
            Snackies
          </Typography>
          {/* Dark/Light Mode Switch */}
          <ThemeSwitch />
          {/* Cart */}
          <IconButton
            size="large"
            edge="start"
            sx={{ 
              ml: 1, 
              animation: `${shakeCart} 0.5s 1 ease`,
              '&:hover': { animation: `${shakeCart} 0.5s 1 ease`}}
            }
            onClick={() => history.push('/cart')}
          >
            <Badge badgeContent={cart} color="error">
                <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {/* Menu */}
          <IconButton
            size="large"
            edge="start"
            sx={{ ml: 1}}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              "& .MuiPaper-root":  {
                backgroundColor: theme ? "background.default" : "#fff"
              },
            }}
          >
            <DrawerList setDrawerOpen={setDrawerOpen} logout={logout}/>
          </Drawer>
        </Box>
      </AppBar>
    </Box>
  )
}

export default Navbar
