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
import { keyframes } from '@mui/system';
import Paper from '@mui/material/Paper';
import cheetos from '../assets/brands/cheetos.png'
import kitkats from '../assets/brands/kitkat.png'
import lays from '../assets/brands/lays.png'
import nature from '../assets/brands/nature-valley.png'
import pringles from '../assets/brands/pringles.png'
import doritos from '../assets/brands/doritos.png'
import pocky from '../assets/brands/pocky.png'
import snickers from '../assets/brands/snickers.png'
import oreos from '../assets/brands/oreos.png'
import hershey from '../assets/brands/hershey.png'

const brands = [lays, pringles, kitkats, nature, doritos, pocky, cheetos, snickers, oreos, hershey]

const Brands = () => {
  return (
    <Paper elevation={0} sx={{backgroundColor: "background.paper2", color: "white", py: 3, my: 12}}>
      <Typography variant="body1" sx={{fontWeight: 500, fontFamily: 'GFS Didot , serif', textAlign: "center", mb: 5, mx: 3}}> 
        WE OFFER THE MOST POPULAR BRANDS 
      </Typography>
      <Grid container justifyContent="center" rowSpacing={3} textAlign="center" width="80%" mx="auto">
        {brands.map((brand, i) => {
          return (
          <Grid item key={i} xs={6} sm={4} md={3} lg={2} sx={{
            transition: "transform 0.2s linear",
            ":hover": {
              transform: "scale(1.2, 1.2)"
            }
          }}>
            <img src={brand} height={80} />
          </Grid>
        )})}
      </Grid>
    </Paper>
  )
}

export default Brands
