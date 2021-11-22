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

const brands = new Map([
  ["Lays", lays],
  ["Pringles", pringles],
  ["KitKat", kitkats], 
  ["Doritos", doritos],
  ["Pocky", pocky], 
  ["Nature Valley", nature], 
  ["Cheetos", cheetos], 
  ["Snickers", snickers], 
  ["Oreo", oreos], 
  ["Hershey", hershey]
])

const Brands = (props) => {
  const { handleFilterChange, setShowBrands} = props
  return (
    // SVG generated at https://doodad.dev/pattern-generator/ #5d4037 #3e2723 #795548
    <Paper elevation={3} sx={{
      py: 3,
      my: 12, 
      background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='66' height='66' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='%235D4037'/%3E%3Ccircle cx='20' cy='20' r='0' fill='%233E2723'/%3E%3Ccircle cx='20' cy='40' r='3' fill='%23795548'/%3E%3Ccircle cx='60' cy='0' r='3' fill='%23795548'/%3E%3Ccircle cx='20' cy='0' r='3' fill='%23795548'/%3E%3Ccircle cx='60' cy='40' r='3' fill='%23795548'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ")`,
    }}>
      {/* <Typography variant="body1" sx={{fontWeight: 500, fontFamily: 'GFS Didot , serif', textAlign: "center", mb: 5, mx: 3}}> 
        WE OFFER SOME OF THE MOST POPULAR BRANDS 
      </Typography> */}
      <Grid container justifyContent="center" rowSpacing={3} textAlign="center" width="80%" mx="auto">
        {Array.from(brands.keys()).map((brand, i) => {
          return (
          <Grid item key={i} xs={6} sm={4} md={3} lg={2} sx={{
            transition: "transform 0.2s linear",
            ":hover": {
              cursor: "pointer",
              transform: "scale(1.2, 1.2)"
            }
          }}>
            <img alt={brand} src={brands.get(brand)} height={70} onClick={handleFilterChange}/>
          </Grid>
        )})}
      </Grid>
    </Paper>
  )
}

export default Brands
