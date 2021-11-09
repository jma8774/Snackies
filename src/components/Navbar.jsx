import React, { useState } from 'react'
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
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import BuildIcon from '@mui/icons-material/Build';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';


const NavList = ({setDrawerOpen, logout}) => {
  const user = useSelector((state) => state.user)
  const history = useHistory()
  return(
    <Box component={List} 
      sx={{ width: 300 }} 
      subheader={
        <ListSubheader component={Typography} sx={{ bgcolor: "primary.dark", fontSize: 16, color: "#fff"}}>
          {"Hello " + (user.id ? user.first_name : "Guest")}
        </ListSubheader>
      }
    >
      {/* Home */}
      <ListItem button onClick={() => {
        history.push('/')
        setDrawerOpen(false)
      }}>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary={"Home"} />
      </ListItem>

      {/* Order History */}
      <ListItem button onClick={() => {
        history.push('/orders')
        setDrawerOpen(false)
      }}>
        <ListItemIcon>
          <HistoryIcon/>
        </ListItemIcon>
        <ListItemText primary={"Order History"} />
      </ListItem>

      {/* Wishlist */}
      <ListItem button onClick={() => {
        history.push('/wishlist')
        setDrawerOpen(false)
      }}>
        <ListItemIcon>
          <StarIcon/>
        </ListItemIcon>
        <ListItemText primary={"Wishlist"} />
      </ListItem>
      <Divider />

      {/* Reset Password */}
      <ListItem button onClick={() => {
        history.push('/reset')
        setDrawerOpen(false)
      }}>
        <ListItemIcon>
          <BuildIcon/>
        </ListItemIcon>
        <ListItemText primary={"Reset Password"} />
      </ListItem>
      
      {/* Sign Out / Sign Up and Sign In */}
      { user.id
      ? <ListItem button onClick={() => {
          logout()
          history.push('/')
          setDrawerOpen(false)
        }}>
          <ListItemIcon>
            <ExitToAppIcon/>
          </ListItemIcon>
          <ListItemText primary={"Sign Out"} />
        </ListItem>
      : <React.Fragment>
          <ListItem button onClick={() => {
            history.push('/signup')
            setDrawerOpen(false)
          }}>
            <ListItemIcon>
              <AddIcon/>
            </ListItemIcon>
            <ListItemText primary={"Sign up"} />
          </ListItem>
          <ListItem button onClick={() => {
            history.push('/login')
            setDrawerOpen(false)
          }}>
            <ListItemIcon>
              <LoginIcon/>
            </ListItemIcon>
            <ListItemText primary={"Sign In"} />
          </ListItem>
        </React.Fragment>
      }
    </Box>
  )
}
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const cart = useSelector((state) => state.user.cart_count)
  const history = useHistory()
  const dispatch = useDispatch()
  const cookies = new Cookies();

  const logout = async () => {
    cookies.remove("token", { path: '/' })
    console.log("Token cookie:", cookies.getAll().token)
    dispatch(reset())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* App Icon */}
          <Box component={Link} to="/" sx={{mr: 1.5}}>
            <img src="icon.png" height="40  px"/>
          </Box>  
          {/* Snackies Name */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}> Snackies </Typography>
          {/* Dark/Light Mode Switch */}
          <ThemeSwitch />
          {/* Cart */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ ml: 1}}
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
            color="inherit"
            sx={{ ml: 1}}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <NavList setDrawerOpen={setDrawerOpen} logout={logout}/>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar