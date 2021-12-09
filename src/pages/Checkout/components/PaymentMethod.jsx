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
import { keyframes } from '@mui/system';
import creditCard from "../../../assets/credit_card.svg"
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {PaymentElement} from '@stripe/react-stripe-js';

const swipeCard = keyframes`
  0% { transform: translatex(0px); }
  50% { transform: translatex(-20px); }
  100% { transform: translatex(0px); }
`;

const PaymentMethod = (props) => {
  const { setStep, handlePaymentMethod } = props
  const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Box position="relative" pb={50}>
      {upMd &&
        <Box position="absolute" sx={{
          width: "100%",
          height: "100%",
          zIndex: -1,
          left: -300,
          top: 100,
          animation: `${swipeCard} 4s infinite ease`,
        }}>
          <img alt="Credit Card" height="150px" width="auto" src={creditCard}/>
        </Box>
      }
      <Typography variant="h6"> Payment Method </Typography>
      <Typography variant="body1" color="text.secondary" mt={1}>  
        Use <Link href="https://stripe.com/docs/testing#cards" target="_blank" rel="noreferrer" color="inherit">Stripe's test card</Link> number 4242 4242 4242 4242 with Visa  
      </Typography>
      <Divider sx={{mt: 2}} />
      <Box component="form" onSubmit={handlePaymentMethod} display='flex' mt={2}>
        <PaymentElement />
        <Box flexGrow={1} >
          <Button variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={() => setStep(0)}> Previous </Button>
        </Box>
        <Button variant="contained" type="submit" endIcon={<NavigateNextIcon />} > Next </Button>
      </Box>
    </Box>
  )
}

export default PaymentMethod
