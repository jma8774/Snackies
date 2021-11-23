import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import BuildIcon from '@mui/icons-material/Build';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import ListSubheader from '@mui/material/ListSubheader';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const ListItemHoverIconFloat = styled(ListItem)(({ theme }) => ({
  '.MuiListItemIcon-root': {
    transition: 'transform 0.2s ease-in-out'
  },
  '&:hover .MuiListItemIcon-root': {
    transform: 'translate(0px, -4px)'
  },
}));

const DrawerList = ({setDrawerOpen, logout}) => {
  const theme = useSelector((state) => state.theme)
  const user = useSelector((state) => state.user)
  const history = useHistory()
  return(
    <Box component={List} 
      sx={{ width: {xs: 225, md: 300}, height: "100%" }}
      subheader={
        <ListSubheader component={Typography} sx={{ 
          bgcolor: "Background.default", 
          fontSize: 16, 
          color: theme ? "#fff" : "#000"
        }}>
          {"Hello " + (user.id ? user.first_name : "Guest")}
        </ListSubheader>
      }
      display="flex"
      flexDirection="column"
    >
      {/* Home */}
      <ListItemHoverIconFloat 
        button 
        onClick={() => {
          history.push('/')
          setDrawerOpen(false)
      }}>
        <ListItemIcon >
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary={"Home"} />
      </ListItemHoverIconFloat>

      {/* Order History */}
      <ListItemHoverIconFloat button onClick={() => {
        history.push('/orders')
        setDrawerOpen(false)
      }}>
        <ListItemIcon>
          <HistoryIcon/>
        </ListItemIcon>
        <ListItemText primary={"Order History"} />
      </ListItemHoverIconFloat>

      {/* Wishlist */}
      <ListItemHoverIconFloat button onClick={() => {
        history.push('/wishlist')
        setDrawerOpen(false)
      }}>
        <ListItemIcon>
          <StarIcon/>
        </ListItemIcon>
        <ListItemText primary={"Wishlist"} />
      </ListItemHoverIconFloat>
      <Divider />

      {/* Reset Password */}
      <ListItemHoverIconFloat button onClick={() => {
        history.push('/reset')
        setDrawerOpen(false)
      }}>
        <ListItemIcon>
          <BuildIcon/>
        </ListItemIcon>
        <ListItemText primary={"Reset Password"} />
      </ListItemHoverIconFloat>
      
      {/* Sign Out / Sign Up and Sign In */}
      { user.id
      ? <ListItemHoverIconFloat button onClick={() => {
          logout()
          history.push('/')
          setDrawerOpen(false)
        }}>
          <ListItemIcon>
            <ExitToAppIcon/>
          </ListItemIcon>
          <ListItemText primary={"Sign Out"} />
        </ListItemHoverIconFloat>
      : <React.Fragment>
          {/* <ListItem button onClick={() => {
            history.push('/signup')
            setDrawerOpen(false)
          }}>
            <ListItemIcon>
              <AddIcon/>
            </ListItemIcon>
            <ListItemText primary={"Sign up"} />
          </ListItem> */}
          <ListItemHoverIconFloat button onClick={() => {
            history.push('/login')
            setDrawerOpen(false)
          }}>
            <ListItemIcon>
              <LoginIcon/>
            </ListItemIcon>
            <ListItemText primary={"Sign In"} />
          </ListItemHoverIconFloat>
        </React.Fragment>
      }

    <Box sx={{flexGrow: 1}}/>
    <Typography variant="body1" textAlign="center" sx={{ my: 1 }}>
      Created by <Link href="https://github.com/jma8774" underline="hover" target="_blank" rel="noopener">Jia Ming</Link> © 2021
    </Typography>
    </Box>
  )
}

export default DrawerList
