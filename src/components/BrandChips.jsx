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
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const brands = ["All", "Lays", "Pringle", "Kitkat", "Nature Valley", "Doritos", "Pocky", "Cheetos", "Snickers", "Oreo", "Hershey"]

const BrandChips = (props) => {
  const {filterBrand, handleFilterChange} = props
  return (
    <Box>
      <Stack direction="row" spacing={1}>
        {brands.map((brand, i) => {
          return (
            <Chip key={i} label={brand} color={filterBrand === brand ? "success" : "secondary"} onClick={handleFilterChange}/>
          )
        })}
      </Stack>
    </Box>
  )
}

export default BrandChips
