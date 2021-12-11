import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const OrderHistorySkeleton = () => {
  return (
    <Box sx={{mt: 3}}>
      <Paper variant="outlined" sx={{height: 300, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress />
      </Paper>
      <Paper variant="outlined" sx={{height: 300, display: "flex", justifyContent: "center", alignItems: "center", mt: 3}}>
        <CircularProgress />
      </Paper>
      <Paper variant="outlined" sx={{height: 300, display: "flex", justifyContent: "center", alignItems: "center", mt: 3}}>
        <CircularProgress />
      </Paper>
    </Box>
  )
}

export default OrderHistorySkeleton
