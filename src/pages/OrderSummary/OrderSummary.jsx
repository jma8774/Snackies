import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { setCartCount } from '../../redux/features/userSlice'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CircularProgress from '@mui/material/CircularProgress';
import OrderDetail from './components/OrderDetail'
import ErrorDetail from './components/ErrorDetail'

const steps = [
  'Shipping Address',
  'Payment Method',
  'Order Summary',
];

const OrderSummary = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    const completeOrder = async () => {
      try{
        setLoading(true)
        const session_id = new URLSearchParams(history.location.search).get('session_id')
        const {data} = await axios.post("/api/payment/complete", {session_id})
        console.log(data)
        setOrder(data)
        dispatch(setCartCount(0))
      } catch(err) {
        setError(true)
        console.log("Complete Order Error", err.response ? err.response.data : err)
      }
      setLoading(false)
    }
    completeOrder()
    // eslint-disable-next-line
  }, [])

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" sx={{mx: "auto", width: {xs: "100%", md: "70%", lg: "45%"}}}>
      <Stepper activeStep={3} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography variant="h3" textAlign="center" sx={{mt: 4}}> Order Summary </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center" sx={{mt: 1, mb: 3}}> Below contain details of your recent order </Typography>
      { !loading
      ? error ? <ErrorDetail /> : <OrderDetail order={order}/>
      : <Paper variant="outlined" sx={{height: 600, display: "flex", justifyContent: "center", alignItems: "center"}}>
          <CircularProgress />
        </Paper>
      }
    </Box>
  )
}

export default OrderSummary
