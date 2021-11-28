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


const Particles = (props) => {
  const randomDir = Math.floor(Math.random() * 2)
  const randomPos = Math.floor(Math.random() * 100).toString()
  const randomTime = (15 + Math.floor(Math.random() * 15)).toString() + 's'
  const randomSize = (100 + Math.floor(Math.random() * 150)).toString() + 'px'
  const randomParticleSize = (6 + Math.floor(Math.random() * 4)).toString() + 'px'
  const {left, top, color} = props
  return (
    <Box sx={{
      position: "absolute",
      width: randomSize,
      height: randomSize,
      left: left,
      top: top,
      zIndex: -1,
      animation: `${randomDir === 0 ? circle : circle_reverse} ${randomTime} infinite linear`
    }}>
      <Box height={randomParticleSize} width={randomParticleSize} backgroundColor={color} marginRight={`${randomPos}%`} marginLeft={`${randomPos}%`} borderRadius="50%" sx={{opacity: 0.6}} />
    </Box>
  )
}

const float = keyframes`
  0% { transform: translatey(0px); }
  50% { transform: translatey(-20px); }
  100% { transform: translatey(0px); }
`;

const circle = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const circle_reverse = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
`;



const Banner = (props) => {
  const history = useHistory()
  const { executeScroll } = props

  return (
    <Box position="relative" sx={{mx: 3, pb: 5}}>
      {/* Particles floating */}
      <Particles left="-10%" top="20%" color="#ffd15c"/>
      <Particles left="-5%" top="80%" color="#699772"/>
      <Particles left="40%" top="-10%" color="#ff7058"/>
      <Particles left="50%" top="30%" color="#ce93d8"/>
      <Particles left="80%" top="80%" color="#dd9a7d"/>
      <Particles left="60%" top="40%" color="#629cd2"/>
      <Particles left="30%" top="60%" color="#ffffff"/>

      <Grid container >
        <Grid item xs={12} md={6} >
            <Typography variant="h3" sx={{fontWeight: "500"}}>
              Enjoy a wide variety of snacks from your favorite brands
            </Typography>
          <Box component={Typography} variant="body1" sx={{fontSize: 22, mt: 2}}>
            Try out new snacks that you've never had before!
          </Box>
          <Grid container sx={{mt: 2}} spacing={2}>
            <Grid item xs={12} sm="auto"> 
              <Button size="large" variant="contained" color="secondary" onClick={() => history.push('/login')}>
                Create an Account
              </Button>
            </Grid>
            <Grid item xs={12} sm> 
              <Button size="large" variant="outlined" color="secondary" onClick={executeScroll}>
                Start browsing
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} position="relative" sx={{minHeight: "300px", mt: {xs: 5, md: 0}}}>
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
