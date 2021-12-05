import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CartSkeleton from './components/CartSkeleton';
import ItemCard from './components/ItemCard';

const Cart = () => {
  const user = useSelector((state) => state.user)
  const [cart, setCart] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCart = async () => {
      if(user.id === '') return
      try {
        setLoading(true)
        const params = { userId: user.id }
        const { data } = await axios.get("api/cart", {params: params})
        // console.log(data)
        setCart(data)
        setLoading(false)
      } catch(err) {
        console.log("Fetch Cart Error:\n", err.response ? err.response.data : err)
      }
    }
    fetchCart()
  }, [])

  useEffect(() => {
    const getSubtotal = (cart) => {
      cart.map((el) => 
        el.quantity.map((size) => 
          setSubtotal(prevState => Math.round((prevState + size.qty*size.price) * 100) / 100)
        )
      )
    }
    getSubtotal(cart)
  }, [cart])

  // useEffect(() => {
  //   console.log("SUBTOTAL", subtotal)
  // }, [subtotal])

  return (
    !loading
    ? <Box>
        <Grid container sx={{mt: 3}} rowSpacing={3}>
          {/* Items */}
          <Grid item xs={12} md={7} >
            <Paper variant="outlined" sx={{px: 3, py: 2}}>
              <Typography variant="h4"> Shopping   Cart </Typography>
              <Typography variant="body1" color="text.secondary" mt={1} mb={2.5}> Here you can view all the items in your cart </Typography>
              { cart.length === 0 && 
                <Box>
                  <Divider/>
                  <Typography sx={{mt: 3}}> You don't have any items in your cart 😵 </Typography>
                </Box>
              }
              { cart.map((el) => {
                  const item = el.itemId
                  return el.quantity.map((size) => 
                    <ItemCard key={item._id+size.size} item={item} size={size} setSubtotal={setSubtotal} />
                  )
                })
              }
            </Paper>
          </Grid>
          {/* Checkout */}
          <Grid item xs={12} md={5} >
            <Box sx={{ mx: "auto", width: {md: "80%"} }}>
              <Paper variant="outlined" sx={{px: 2, py: 2}}> 
                <Typography variant="h4"> Order Summary </Typography>
                <Typography variant="body1" color="text.secondary" mt={1} mb={2.5}> Here you can view the total cost of your order </Typography>
                <Divider sx={{mt: 2}} />
                <Box display="flex" sx={{mt: 2}}>
                  <Typography variant="body1" flexGrow={1}> Sub-total </Typography>
                  <Typography variant="body1"> ${subtotal} </Typography>
                </Box>
                <Box display="flex" sx={{mt: 2}}>
                  <Typography variant="body1" flexGrow={1}> Shipping </Typography>
                  <Typography variant="body1"> FREE </Typography>
                </Box>
                <Box display="flex" sx={{mt: 2}}>
                  <Typography variant="body1" flexGrow={1}> Estimated Tax </Typography>
                  <Typography variant="body1"> ${parseFloat(subtotal * 0.09).toFixed(2)} </Typography>
                </Box>
                <Divider sx={{mt: 2}} />
                <Box display="flex" sx={{mt: 2}}>
                  <Typography variant="body1" flexGrow={1}> Total </Typography>
                  <Typography variant="body1"> ${parseFloat(subtotal * 1.09).toFixed(2)} </Typography>
                </Box>
                <Button variant="contained" color="success" sx={{width: "100%", mt: 3}}>
                  Checkout
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    : <Box>
        <CartSkeleton />
      </Box>
  )
}

export default Cart
