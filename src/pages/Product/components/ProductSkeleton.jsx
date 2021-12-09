import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const ProductSkeleton = () => {
  return (
    <Box>
      <Skeleton width={250} height={35} />
      <Box mb={5} />
      <Grid container rowSpacing={5}>
        <Grid item xs={12} md={5} >
          <Skeleton sx={{height: 500, width: "90%", mx: "auto"}} />
        </Grid>
        <Grid item xs={12} md={7} display="flex" flexDirection="column">
          <Typography variant="h3">  
            <Skeleton />
          </Typography>
          <Box mt={1}>
            <Skeleton width={100} height={35} />
          </Box>
          <Box sx={{mt: 3}}>
            <Typography variant="h6" sx={{ mb: 1}}> <Skeleton width={50} /> </Typography>
            <Skeleton />
          </Box>
          <Typography variant="body1" flexGrow={1} sx={{fontSize: 17, mt: 4}}>  
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="flex-end" sx={{mt: 7}}>
            <Skeleton height={75} width={150} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductSkeleton
