import React, { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ErrorIcon from '@mui/icons-material/Error';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import { Link as RouterLink } from 'react-router-dom';
import DeleteButton from './DeleteButton'

const OrderHistoryBody = (props) => {
  const { orders, setOrders } = props
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const handleDeleteOrder = async (order) => {
    try {
      const { data } = await axios.post("api/orders/deleteOne", {orderId: order._id})
      setOrders(data)
      // console.log(data)
      setSuccess(true)
    } catch(err) {
      setError(true)
      console.log("Delete Order Error", err.response ? err.response.data : err)
    }
  }

  return (
    <Box>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => {setError(false)} }
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}> {`Delete Order failed`} </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => {setSuccess(false)} }
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> {`Order cancelled`} </Alert>
      </Snackbar>
      { orders.length === 0 && 
        <Paper variant="outlined" sx={{mt: 3, py: 7, display: "flex", flexDirection: "column", alignItems: "center"}}>
          <ErrorIcon color="error" sx={{fontSize: 50}}/>
          <Typography sx={{mt: 1, textAlign: "center"}}> No orders found, you haven't purchased any items yet! 😊 </Typography>
        </Paper>
      }
      { orders.map(order => 
        <Paper variant="outlined" key={order._id} sx={{px: 2, py: 2, mt: 3}}>
          <Box display="flex">
            <Box flexDirection="column" flexGrow={1}>
              <Typography color="text.secondary"> ORDER PLACED </Typography>
              <Typography > {new Date(order.created).toDateString().slice(4)}</Typography>
            </Box>
            <Box flexDirection="column" flexGrow={1}>
              <Typography color="text.secondary"> TOTAL </Typography>
              <Typography> ${parseFloat(order.totalPrice).toFixed(2)}</Typography>
            </Box>
            <Box flexDirection="column" flexGrow={1}>
              <Typography color="text.secondary"> SHIP TO </Typography>
              <Box display="flex" alignItems="center">
                <Tooltip title={
                  <Box>
                    <Typography fontWeight="bold"> {`${order.address.firstName} ${order.address.lastName}`} </Typography>
                    <Typography> {`${order.address.street} ${order.address.apt}`}</Typography>
                    <Typography> {`${order.address.city}, ${order.address.state} ${order.address.zip}`}</Typography>
                  </Box>
                }>
                  <Typography sx={{textDecorationLine: "underline"}}>
                    {`${order.address.firstName} ${order.address.lastName}`.length > 11
                    ? `${order.address.firstName} ${order.address.lastName}`.slice(0, 11) + '...'
                    : `${order.address.firstName} ${order.address.lastName}`
                    }
                  </Typography> 
                </Tooltip>
                <KeyboardArrowDownIcon/>
              </Box>
            </Box>
            { upMd &&
              <Box flexDirection="column">
                <Typography color="text.secondary"> ORDER # {order._id} </Typography>
              </Box>
            }
          </Box>
          <Divider sx={{my: 2}} />
          <Typography variant="h5"> Order {order.status} </Typography>
          <Typography color="text.secondary"> 
            {order.status === "Processing" && `This will take a few minutes`}
            {order.status === "Shipped" && 
            `Order will be delivered in approxmately ${Math.ceil(Math.abs(new Date(order.arrivalDate) - new Date()) / (60000))} minute(s)`
            }
            {order.status === "Delivered" && `Item delivered on ${new Date(order.arrivalDate).toLocaleString()}`}
          </Typography>
          <Box mt={3} />
          <Grid container rowSpacing={3}>
          {order.items.map(item => 
            <React.Fragment key={item._id}>
              <Grid item xs={4} md={3} sx={{display: "flex"}}>
                <Link component={RouterLink} to={{ pathname: `/product/${item.itemId}`}} underline="none" color="inherit" sx={{mx: "auto"}}>
                  <Box component="img" src={`/snacks${item.image}`} sx={{height: "100px", width: "auto"}} />
                </Link>
              </Grid>
              <Grid item xs={8} md={9} sx={{display: "flex"}}>
                <Box display="flex" flexDirection="column" ml={3}>
                  <Link component={RouterLink} to={{ pathname: `/product/${item.itemId}`}} underline="none" color="inherit" sx={{mx: "auto"}}>
                    {item.name}
                  </Link>
                  <Box sx={{mt: 0.5}}>
                    <Chip size="small" label={item.size} />
                  </Box>
                  <Typography sx={{mt: 2}}>
                    {`$${parseFloat(item.price).toFixed(2)} × ${item.quantity}`}
                  </Typography>
                </Box>
              </Grid>
            </React.Fragment>
          )}
          </Grid>
          {(order.status === 'Processing' || order.status === "Shipped") &&
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <DeleteButton handleDeleteOrder={handleDeleteOrder} order={order} />
            </Box>
          }
        </Paper>
      )}
    </Box>
  )
}

export default OrderHistoryBody
