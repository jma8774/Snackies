import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import defaultImage from '../../assets/icon.png';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import WishCard from './components/WishCard';
import { keyframes } from '@mui/system';

const Wishlist = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [userWishlist, setUserWishlist] = useState([])
  
  useEffect(() => {
    const fetchWishlist = async () => {
      if(user.id === '') return setUserWishlist([])
      try {
        const params = { email: user.email, populated: true }
        const { data } = await axios.get(`/api/user/wishlist`, { params: params });
        console.log(data)
        setUserWishlist(data)
      } catch(err) {
        console.log("Fetch Wishlist Error:\n", err.response ? err.response.data : err)
      }
    }
    fetchWishlist()
  }, [])

  return (
    user.id !== ''
    ?
      <Box>
        <Box textAlign="center" sx={{mb: 5}}>
          <FavoriteIcon color="error" sx={{fontSize: 50}} />
          <Typography variant="h2"> My Wishlist</Typography>
        </Box>
        { 
          userWishlist.map((item) => {
            return <Paper variant="outlined" key={item.name} sx={{ px: 2, py: 2, mt: 2, mx: "auto", width: {xs: "100%", sm: "75%"}}}>
              {item.name} Rating: {item.rating}
            </Paper>
          })
        }
      </Box>
    :
      <Typography variant="h4"> How did you get here? You're not even logged in 😂😂 </Typography>

  )
}

export default Wishlist
