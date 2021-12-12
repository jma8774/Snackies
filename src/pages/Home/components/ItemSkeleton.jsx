import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { keyframes } from '@mui/system';

const animateHeart = keyframes`
  0%{transform:scale(.2);}
  40%{transform:scale(1.2);}
  100%{transform:scale(1);}
`;

const animateHeartOut = keyframes`
  0%{transform:scale(1.4);}
  100%{transform:scale(1);}
`;

const ItemSkeleton = (props) => {
  const [isWish, setIsWish] = useState(false)
  return (
    <Grid item xs={12} sm={6} md={4} xl={3} display="flex" justifyContent="center"> 
      <Paper elevation={0} sx={{
        height: 425, 
        width: {
          xs: "300px",
          sm: "250px",
          md: "265px",
          lg: "350px"
        }}}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton color="error" onClick={() => setIsWish(!isWish)}> 
            {isWish 
            ? <FavoriteIcon sx={{ animation: `${animateHeart} 0.3s 1 linear`}}/> 
            : <FavoriteBorderIcon sx={{ animation: `${animateHeartOut} 0.3s 1 linear` }}/>}
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" mt={5} >
          <Skeleton variant="rectangular" height={175} width="75%" />
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", mt: 1, mx: 4, pb: 3, flexGrow: 1 }}>
          <Skeleton height={50} />
          <Skeleton height={25} width={60} />
          <Skeleton height={35} width={150} />
        </Box>
      </Paper>
    </Grid>
  )
}

export default ItemSkeleton
