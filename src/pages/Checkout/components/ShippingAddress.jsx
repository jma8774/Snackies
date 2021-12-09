import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ship from "../../../assets/ship.svg"
import { keyframes } from '@mui/system';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const float = keyframes`
  0% { transform: translatey(0px); }
  50% { transform: translatey(-10px); }
  100% { transform: translatey(0px); }
`;

const ShippingAddress = (props) => {
  const { address, setAddress, handleShippingAddress } = props
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    street: false,
    city: false,
    state: false,
    zip: false
  })

  return (
    <Box>
      <Typography variant="h6"> Shipping Address </Typography>
      <Typography variant="body1" color="text.secondary" mt={1}>  Please enter your shipping address (previous shipping address will be loaded) </Typography>
      <Divider sx={{mt: 2}} />
      <Grid container component="form" onSubmit={(e) => handleShippingAddress(e, setError)} spacing={2} mt={2}>
        <Grid item xs={6}>
          <TextField label="First Name" value={address.firstName} error={error.firstName} helperText={error.firstName ? "First name cannot be empty" : ""}
            onChange={(e) => setAddress(prevState => ({ ...prevState, firstName: e.target.value }))}
            sx={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Last Name" value={address.lastName} error={error.lastName} helperText={error.lastName ? "Last name cannot be empty" : ""}
            onChange={(e) => setAddress(prevState => ({ ...prevState, lastName: e.target.value }))}
            sx={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField label="Street Address" value={address.street} error={error.street} helperText={error.street ? "Street address cannot be empty" : ""}
            onChange={(e) => setAddress(prevState => ({ ...prevState, street: e.target.value }))}
            sx={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Apt #, suite, floor, etc." value={address.apt}
            onChange={(e) => setAddress(prevState => ({ ...prevState, apt: e.target.value }))}
            sx={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField label="City" value={address.city} error={error.city} helperText={error.city ? "City cannot be empty" : ""}
            onChange={(e) => setAddress(prevState => ({ ...prevState, city: e.target.value }))}
            sx={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField label="State (NY, NJ, etc.)" value={address.state} error={error.state} helperText={error.state ? "Please enter the abbreviated US state" : ""}
            onChange={(e) => setAddress(prevState => ({ ...prevState, state: e.target.value }))}
            sx={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField label="ZIP code" error={error.zip} value={address.zip} helperText={error.zip ? "Please enter a valid zip code" : ""}
            onChange={(e) => setAddress(prevState => ({ ...prevState, zip: e.target.value }))}
            sx={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" endIcon={<NavigateNextIcon />} type="submit" sx={{mt: 2}}> Next </Button>
          </Box>
        </Grid>
      </Grid>
      <Box component="img" src={ship} sx={{ width: {xs: "80%", sm: "50%", lg: "40%"}, ml: 5, mt: 2, animation: `${float} 4s infinite ease-in-out`}}/>
    </Box>
  )
}

export default ShippingAddress
