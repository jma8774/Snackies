import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const OrderDetail = (props) => {
  const { order } = props
  return (
    <Paper variant="outlined" sx={{px: 2, py: 2}}> 
      <Typography variant="body1"> Hi {order.address.firstName},</Typography>
      <Typography variant="body1"> Your order has been confirmed and will be shipped soon. </Typography>
      <Divider sx={{mt: 2}}/>
      <Stack spacing={1} mt={2}>
        <Box display="flex">
          <Typography color="text.secondary" sx={{flexGrow: 1}}> Order Date </Typography>
          <Typography > {new Date(order.arrivalDate).toDateString().slice(4)} </Typography>
        </Box>
        <Box display="flex">
          <Typography color="text.secondary" sx={{flexGrow: 1}}> Order ID </Typography>
          <Typography > {order._id} </Typography>
        </Box>
        <Box display="flex">
          <Typography color="text.secondary" sx={{flexGrow: 1}}> Address </Typography>
          <Typography > {`${order.address.street} ${order.address.apt}`.toUpperCase()} </Typography>
        </Box>
      </Stack>
      <Divider sx={{mt: 2}}/>
      <Grid container mt={2} rowSpacing={2}>
        { order.items.map((item) =>
          <React.Fragment key={item.name+item.size}>
            <Grid item xs={4} md={3} sx={{display: "flex"}}>
              <Link component={RouterLink} to={{ pathname: `/product/${item.itemId}`}} underline="none" color="inherit" sx={{mx: "auto"}}>
                <Box component="img" src={`/snacks${item.image}`} sx={{height: "100px", width: "auto"}} />
              </Link>
            </Grid>
            <Grid item xs={8} md={9} sx={{display: "flex"}}>
              <Box display="flex" flexDirection="column" ml={3}>
                <Typography>
                  {item.name}
                </Typography>
                <Box sx={{mt: 0.5}}>
                  <Chip size="small" label={item.size} />
                </Box>
                <Typography sx={{mt: 2.5}}>
                  {`$${parseFloat(item.price).toFixed(2)} × ${item.quantity}`}
                </Typography>
              </Box>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
      <Divider sx={{mt: 2}}/>
        <Stack spacing={1} mt={2}>
          <Box display="flex">
            <Typography color="text.secondary" sx={{flexGrow: 1}}> Subtotal </Typography>
            <Typography > {`$${parseFloat(order.subTotal).toFixed(2)}`} </Typography>
          </Box>
          <Box display="flex">
            <Typography color="text.secondary" sx={{flexGrow: 1}}> Shipping </Typography>
            <Typography > FREE </Typography>
          </Box>
          <Box display="flex">
            <Typography color="text.secondary" sx={{flexGrow: 1}}> Taxes </Typography>
            <Typography > {`$${parseFloat(order.tax).toFixed(2)}`} </Typography>
          </Box>
        </Stack>
      <Divider sx={{mt: 2}}/>
        <Box display="flex" sx={{mt: 2}}>
          <Typography color="text.secondary" sx={{flexGrow: 1}}> Total </Typography>
          <Typography > {`$${parseFloat(order.totalPrice).toFixed(2)}`} </Typography>
        </Box>
      <Divider sx={{mt: 2}}/>
        <Box sx={{mt: 2}}>
          <Typography > Your order should arrive in approximately 5 minutes, thanks to our super fast Snackers™ (😂) delivery system. </Typography>
          <Typography sx={{mt: 2}}> Thank you! </Typography>
          <Typography sx={{mt: 0.5}}> Snackies </Typography>
        </Box>
    </Paper>
  )
}

export default OrderDetail
