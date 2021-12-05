import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WishCard from './components/WishCard';

const Wishlist = () => {
  const user = useSelector((state) => state.user)
  const [userWishlist, setUserWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  
  const fetchWishlist = async () => {
    if(user.id === '') return setUserWishlist([])
    try {
      setLoading(true)
      const params = { email: user.email, populated: true }
      const { data } = await axios.get(`/api/user/wishlist`, { params: params });
      // console.log(data)
      setUserWishlist(data)
      setLoading(false)
    } catch(err) {
      console.log("Fetch Wishlist Error:\n", err.response ? err.response.data : err)
    }
  }

  useEffect(() => {
    fetchWishlist()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemove = async (itemId) => {
    if(user.id === '') return
    try {
      axios.post('/api/user/wishlist/remove', {email: user.email, itemId: itemId })
      setUserWishlist(prevState => prevState.filter(x => x._id !== itemId))
    } catch(err) {
      console.log("Remove Item Error:\n", err.response ? err.response.data : err)
    }
  }

  return (
    user.id !== ''|| loading
    ?
      <Box>
        <Box textAlign="center" sx={{mb: 5}}>
          <FavoriteIcon color="error" sx={{fontSize: 50}} />
          <Typography variant="h2"> My Wishlist</Typography>
        </Box>
        { userWishlist.length === 0 && <Typography color="text.secondary" textAlign="center" variant="h5"> You don't have any items in your wishlist 😔 </Typography>}
        { userWishlist.map((item) => {
            return <WishCard key={item.name} item={item} loading={loading} handleRemove={handleRemove}  />
        })
        }
      </Box>
    :
      <Typography variant="h4"> {loading ? "Loading" : "How did you get here? You're not even logged in 😂😂"} </Typography>

  )
}

export default Wishlist
