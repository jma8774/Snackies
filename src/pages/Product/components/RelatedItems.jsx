import React, { useState, useEffect } from 'react'
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
import ErrorIcon from '@mui/icons-material/Error';
import Link from '@mui/material/Link';

const RelatedItems = (props) => {
  const { relatedItems } = props

  return (
    <Grid container sx={{mt: 3}} spacing={4} justifyContent="center" alignItems="center">
      {relatedItems.length === 0
      ? <Grid item xs={12}>
          <Paper variant="outlined" sx={{mt: 3, py: 7, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <ErrorIcon color="error" sx={{fontSize: 50}}/>
            <Typography sx={{mt: 1, textAlign: "center"}}> No related items found </Typography>
          </Paper>
        </Grid>
      :
        relatedItems.map((item, i) => 
          <Grid item key={item.name} xs={12} md={4} >
            <Paper variant="outlined" sx={{px: 2, py: 2}}>
              <Box sx={{my: 1, display: "flex", justifyContent: "center"}}>
                <Link component={RouterLink} to={{ pathname: `/product/${item._id}`}} underline="none">
                  <Box component="img" src={`/snacks${item.image}`} sx={{height: "200px", width: "auto"}}/>
                </Link>
              </Box>
              <Typography> {item.name}</Typography>
              <Rating name="read-only" value={item.rating} precision={0.5} readOnly sx={{mt: 0.5}}/> 
            </Paper>
          </Grid>
        )
      }
    </Grid>
  )
}

export default RelatedItems
