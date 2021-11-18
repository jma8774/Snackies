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
  const { item } = props
  const [favorite, setFavorite] = useState(false)

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
        <IconButton color="error" onClick={() => setFavorite(!favorite)}> 
          {favorite 
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
          <Typography variant="body1" color="text.secondary"> ${item.basePrice} </Typography>
          <Box display="flex" alignItems="center" sx={{mt: 2}}>
            <Rating name="read-only" value={item.rating} precision={0.5} readOnly /> 
            <Box component={Typography} variant="body1" color="text.secondary" sx={{ ml: 1}}> ({item.reviews.length}) </Box>
          </Box>
        </Box>
    </Paper>
  )
}

export default ItemCard
