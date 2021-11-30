import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link as RouterLink } from 'react-router-dom';
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import defaultImage from '../assets/icon.png';
import Rating from '@mui/material/Rating';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { setCartCount } from '../redux/features/userSlice'
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';



const SortReviews = (props) => {
  const { sort, handleSortChange } = props
  return (
    <Box sx={{ width: 200}} >
      <FormControl fullWidth>
        <InputLabel variant="filled" color="secondary">Sort By</InputLabel>
        <Select
          value={sort}
          label="Sort By"
          onChange={handleSortChange}
          variant="filled"
          color="secondary"
        >
          <MenuItem value={0}>Date: New to Old </MenuItem>
          <MenuItem value={1}>Rating: High to Low </MenuItem>
          <MenuItem value={2}>Rating: Low to High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

const QuantitySelect = (props) => {
  const { quantity, setQuantity } = props
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <Box sx={{ width: 100}} >
      <FormControl fullWidth>
        <InputLabel variant="outlined" color="primary"> Quantity </InputLabel>
        <Select
          value={quantity}
          label="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          variant="outlined"
          color="primary"
        >
          { options.map((option) => {
            return <MenuItem key={option} value={option}> {option} </MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

function ProductBreadcrumbs(props) {
  const { item } = props
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link component={RouterLink} 
        to={{ pathname: `/` }} 
        underline="hover" 
        color="inherit" 
      >
        Home
      </Link>
      <Link
        component={RouterLink}
        to={{ pathname: `/`, toBrandFilter: item.brand }} 
        underline="hover"
        color="inherit"
      >
        { item.brand }
      </Link>
      <Typography color="text.primary"> {item.name} </Typography>
    </Breadcrumbs>
  )
}

function SizeButton(props) {
  const { size, sizeSelected, setSizeSelected, index } = props
  return (
    <Button 
      variant={sizeSelected === index ? "contained" : "outlined"} 
      onClick={() => setSizeSelected(index)}
      color="secondary" 
      sx={{mr: 2, textTransform: "lowercase" }}
    > 
      {size.size} 
    </Button>
  )
}

const Product = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { itemId } = useParams()
  const [item, setItem] = useState({})
  const [loading, setLoading] = useState(true)
  const [sizeSelected, setSizeSelected] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addLoading, setAddLoading] = useState(false)
  const [successCart, setSuccessCart] = useState(false)
  const [sortReview, setSortReview] = useState(0)

  const handleSortViewChange = async (e) => {
    setSortReview(e.target.value)
    console.log(sortReview)
  }

  const handleAddToCart = async () => {
    if(user.email === '') return history.push({ pathname: '/login', goLogin: true })
    try {
      setAddLoading(true)
      const { data } = await axios.post(`/api/cart/add`, { userId: user.id, itemId: item._id, size: item.prices[sizeSelected].size, quantity: quantity });
      dispatch(setCartCount(data))
      setAddLoading(false)
      setSuccessCart(true)
    } catch(err) {
      console.log("Add Cart Item Error:\n", err.response ? err.response.data : err)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/item/getById`, { params: {itemId: itemId} });
        console.log(data)
        setItem(data)
        setLoading(false)
      } catch(err) {
        console.log("Fetch Product Error:\n", err.response ? err.response.data : err)
        setLoading(false)
      }
    }
    fetchProduct()
    window.scrollTo({
      top: 0,
    });
  }, [])

  return (
    <Box sx={{pb: "200px"}}>
      <Snackbar
        open={successCart}
        autoHideDuration={2000}
        onClose={() => {setSuccessCart(false)}}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> Item added to cart! </Alert>
      </Snackbar>
    {!loading 
        ?
        <Box>
          <ProductBreadcrumbs item={item} />
          <Box mb={5} />
          <Grid container rowSpacing={5}>
            <Grid item xs={12} md={5} textAlign="center" >
              <Paper variant="outlined" sx={{ height: "500px", maxWidth: "90%", mx: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box component="img" src={loading ? defaultImage : `/snacks${item.image}`} sx={{ 
                  maxHeight: "90%",
                  maxWidth: "90%", 
                }}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={7} display="flex" flexDirection="column">
              <Typography variant="h4">  
                {item.name}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Rating name="read-only" value={item.rating} precision={0.5} readOnly /> 
                <Box component={Typography} variant="body1" color="text.secondary" sx={{ ml: 1}}> ({item.reviews.length} {item.reviews.length === 0 ? "Rating" : "Ratings"}) </Box>
              </Box>
              <Box sx={{mt: 3}}>
                <Typography variant="h6" sx={{ mb: 1}}> ${ parseFloat(item.prices[sizeSelected].price).toFixed(2) }</Typography>
                { item.prices.map((size, i) => {
                    return <SizeButton key={size.size} size={size} index={i} sizeSelected={sizeSelected} setSizeSelected={setSizeSelected} />
                  })
                }
              </Box>
              <Typography variant="body1" flexGrow={1} sx={{fontSize: 17, mt: 4}}>  
                {item.description}
              </Typography>
              <Box display="flex" flexWrap="wrap" justifyContent="flex-end" sx={{mt: 7}}>
                  <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
                  <Button disabled={addLoading} variant="contained" sx={{ml: 2}} onClick={handleAddToCart}> Add to Cart </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{mt: 10, mb: 2}} />
          <Box>
            <Typography variant="h4"> Community Reviews </Typography>
            <Box display="flex" flexWrap="wrap" alignItems="center" sx={{mt: 5}}> 
                <Box flexGrow={1} sx={{mb: 2}}> 
                  <Button variant="contained" color="secondary" size="large" > <Typography variant="inherit" noWrap> Write a review </Typography> </Button> 
                </Box>
                <SortReviews sort={sortReview} handleSortChange={handleSortViewChange} />
            </Box>
          </Box>
          {/* <TextField
            id="outlined-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            minRows={5}
            maxRows={7}
            onChange={(e) => console.log(e.target.value)}
            sx={{width: "500px"}}
          /> */}
        </Box>
        : 
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
    }
    </Box>
  )
}

export default Product
