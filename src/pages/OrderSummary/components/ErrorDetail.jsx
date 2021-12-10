import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorDetail = () => {
  return (
    <Paper variant="outlined" sx={{px: 2, py: 10, textAlign: "center"}}>
      <ErrorIcon color="error" sx={{fontSize: 50}}/>
      <Typography> Error has occured: Either the order has not been paid for yet or it has already been processed. </Typography>
    </Paper>
  )
}

export default ErrorDetail
