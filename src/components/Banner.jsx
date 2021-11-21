import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import Cookies from 'universal-cookie';
import ItemCard from '../components/ItemCard'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import chip from '../assets/chip.svg'
import chip_bag from '../assets/chip_bag.svg'
import chocolate from '../assets/chocolate.svg'
import pocky from '../assets/pocky.svg'
import { keyframes } from '@mui/system';


const float = keyframes`
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0px);
  }
`;

const Banner = (props) => {
  const history = useHistory()
  const { executeScroll } = props

  return (
    <Box sx={{ml: 3, pb: 5}}>
      <Grid container >
        <Grid item xs={12} md={5} >
          <Typography variant="h3" sx={{fontWeight: "500"}}>
            Enjoy a wide variety of snacks from your favorite brands
          </Typography>
          <Box component={Typography} variant="body1" sx={{fontSize: 22, mt: 2}}>
            Try out new snacks that you've never had before!
          </Box>
          <Button size="large" variant="contained" color="secondary" sx={{mt: 4, mr: 3}} onClick={() => history.push('/login')}>
            Create an Account
          </Button>
          <Button size="large" variant="outlined" color="secondary" sx={{mt: 4}} onClick={executeScroll}>
            Start browsing
          </Button>
        </Grid>
        <Grid item xs={12} md={7} position="relative" sx={{minHeight: "300px", mt: {xs: 5, md: 0}}}>
          <Box component="img" src={chip} sx={{
            position: "absolute",
            height: 50,
            left: "20%",
            top: "10%",
            animation: `${float} 4s infinite ease-in-out`
          }}/>
          <Box sx={{
            position: "absolute",
            height: 100,
            left: "40%",
            top: "10%",
            animation: `${float} 5.5s infinite ease-in-out`,
          }}>
            <img src={chip_bag} height="100%" style={{ transform: "rotate(-30deg)" }}/>
          </Box>
          <Box component="img" src={chocolate} sx={{
            position: "absolute",
            height: 100,
            left: "70%",
            top: "40%",
            animation: `${float} 6s infinite ease-in-out`
          }}/>
          <Box component="img" src={pocky} sx={{
            position: "absolute",
            height: 80,
            left: "10%",
            top: "70%",
            animation: `${float} 5s infinite ease-in-out`
          }}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Banner
