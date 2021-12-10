import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
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
import { setCartCount } from '../redux/features/userSlice'

const OrderSummary = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  
  useEffect(() => {
    const completeOrder = async () => {
      try{
        const session_id = new URLSearchParams(history.location.search).get('session_id')
        await axios.post("/api/payment/complete", {session_id})
        dispatch(setCartCount(0))
      } catch(err) {
        setError(true)
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
