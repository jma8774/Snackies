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
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PaymentIcon from '@mui/icons-material/Payment';

const OrderSummary = () => {
  const history = useHistory()
  
  useEffect(() => {
    const completeOrder = async () => {
      try{
        const session_id = new URLSearchParams(history.location.search).get('session_id')
        const { data } = await axios.post("/api/payment/complete", {session_id})
        console.log(data)
      } catch(err) {
        console.log("Complete Order Error", err.response ? err.response.data : err)
      }
    }
    completeOrder()
  }, [])

  return (
    <Box>
      REVIEW ORDER
    </Box>
  )
}

export default OrderSummary
