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

const Banner = () => {
  return (
    <Box sx={{ width: "100%", height: 400, backgroundColor: "background.paper2"}}>
    </Box>
  )
}

export default Banner
