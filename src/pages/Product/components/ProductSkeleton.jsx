import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const ProductSkeleton = () => {
  return (
    <Box>
      <Grid container sx={{mt: 3}} rowSpacing={3}>
        <Grid item xs={12} md={7} >
          <Skeleton />
        </Grid>
        <Grid item xs={12} md={5} >
          <Skeleton />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductSkeleton
