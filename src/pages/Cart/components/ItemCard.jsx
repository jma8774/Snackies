import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import QuantitySelect from './QuantitySelect';
import Chip from '@mui/material/Chip';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const ItemCard = (props) => {
  const { item, size, setSubtotal } = props
  return (
    <Box>
      <Divider/>
      <Box sx={{mt: 2, mb: 2}}>
        <Grid container columnSpacing={3} rowSpacing={2}>
          <Grid item xs={12} sm={4} lg={3} >
            <Paper elevation={0} sx={{backgroundColor: "transparent", display: "flex", justifyContent: "center", px: 1, py: 2, height: "200px"}}>
              <Link component={RouterLink} to={{ pathname: `/product/${item._id}`}} underline="none">
                <Box component="img" src={`/snacks${item.image}`} sx={{height: "100%", maxWidth: "100%"}} />
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} lg={9} display="flex" flexDirection="column">
            <Box flexGrow={1}>
              <Link component={RouterLink} to={{ pathname: `/product/${item._id}`}} flexGrow={1} underline="none" color="inherit" >
                <Typography variant="body1" fontSize="16px"> {item.name} </Typography>
              </Link>
              <Typography component="span" display="flex" alignItems="center" variant="body1" fontWeight="bold" mt={1}> ${parseFloat(size.price).toFixed(2)}  <Box mr={1} /> <Chip size="small" label={size.size} /> </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <QuantitySelect itemId={item._id} size={size.size} quantity={size.qty} price={size.price} setSubtotal={setSubtotal}  />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ItemCard
