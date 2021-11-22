import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useHistory, useParams, Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux'
import { keyframes } from '@mui/system';
import axios from 'axios';


const animateHeart = keyframes`
  0%{transform:scale(.2);}
  40%{transform:scale(1.2);}
  100%{transform:scale(1);}
`;

const animateHeartOut = keyframes`
  0%{transform:scale(1.4);}
  100%{transform:scale(1);}
`;


const ItemCard = (props) => {
  const history = useHistory()
  const { item, isWish, setUserWishlist} = props
  const user = useSelector((state) => state.user)

  const handleWishClick = async () => {
    if(user.email === '') return history.push({ pathname: '/login', goLogin: true })
    try{
      let res;
      if(isWish)
        // Remove item
        res = await axios.post('/api/user/wishlist/remove', {email: user.email, itemId: item._id })
      else
      // Add item
        res = await axios.post('/api/user/wishlist/add', {email: user.email, itemId: item._id })
      setUserWishlist(res.data)
    } catch(err) {
      setUserWishlist([])
      console.log("Handle Heart Click Error:\n", err.response ? err.response.data : err)
    }
  }

  return (
    <Paper elevation={0} sx={{
      transition: "transform 0.25s ease",
      ":hover": {
        transform: "scale(1.1,1.1 )",
        boxShadow: 2,
      },
      width: {
        xs: "300px",
        sm: "250px",
        md: "265px",
        lg: "350px"
      },
      mx: "auto",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton color="error" onClick={handleWishClick}> 
          {isWish 
          ? <FavoriteIcon sx={{ animation: `${animateHeart} 0.3s 1 linear`}}/> 
          : <FavoriteBorderIcon sx={{ animation: `${animateHeartOut} 0.3s 1 linear` }}/>}
        </IconButton>
      </Box>
      <Box sx={{
        textAlign: "center",
        my: 2,
        height: "200px"
      }}>
        <Link component={RouterLink} to={`/product/${item._id}`} underline="none">
          <Box component="img" src={`/snacks${item.image}`} sx={{ height: "100%", maxWidth: "100%"}}/>
        </Link>
      </Box>
      {/* Labels */}
        <Box sx={{ml: 4, pb: 3}}>
          <Link component={RouterLink} to={`/product/${item._id}`} underline="none" color="inherit" > 
            <Typography variant="h6"> {item.name} </Typography> 
          </Link>
          <Typography variant="body1" color="text.secondary"> ${parseFloat(item.basePrice).toFixed(2)} </Typography>
          <Box display="flex" alignItems="center" sx={{mt: 2}}>
            <Rating name="read-only" value={item.rating} precision={0.5} readOnly /> 
            <Box component={Typography} variant="body1" color="text.secondary" sx={{ ml: 1}}> ({item.reviews.length}) </Box>
          </Box>
        </Box>
    </Paper>
  )
}

export default ItemCard
