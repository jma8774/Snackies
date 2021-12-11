import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import OrderHistorySkeleton from './components/OrderHistorySkeleton'
import OrderHistoryBody from './components/OrderHistoryBody'

const OrderHistory = () => {
  const user = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchOrders = async () => {
      if(user.id === '') return
      try{
        setLoading(true)
        const { data } = await axios.get("api/orders/getAll")
        setOrders(data)
        // console.log(data)
        setLoading(false)
      } catch(err) {
        console.log("Fetch Orders Error", err.response ? err.response.data : err)
      }
    }
    fetchOrders()
  }, [])

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" sx={{mx: "auto", width: {xs: "100%", md: "70%", lg: "50%"}}}>
      <Typography variant="h3"> Order History </Typography>
      <Typography variant="body1" color="text.secondary" sx={{mt: 1, mb: 3}}> You can view all your orders here </Typography>
      <Divider />
      { !loading
      ? <OrderHistoryBody orders={orders} setOrders={setOrders} />
      : <OrderHistorySkeleton />
      }
    </Box>
  )
}

export default OrderHistory
