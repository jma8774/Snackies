import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const CartSkeleton = () => {
  return (
    <Box>
      <Grid container sx={{mt: 3}} rowSpacing={3}>
        <Grid item xs={12} md={7} >
          <Paper variant="outlined" sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: 600, width: "100%"}}>
            <Box sx={{mx: "auto"}}>
              <CircularProgress />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: 300, width: { md: "80%" }, mx: "auto"}}>
              <Box sx={{mx: "auto"}}>
                <CircularProgress />
              </Box>
            </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CartSkeleton
