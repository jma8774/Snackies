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
            return <MenuItem value={option}> {option} </MenuItem>
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
  const user = useSelector((state) => state.user)
  const { itemId } = useParams()
  const [item, setItem] = useState({})
  const [loading, setLoading] = useState(true)
  const [sizeSelected, setSizeSelected] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showLogin, setShowLogin] = useState(history.location.loggedIn)

  const handleAddToCart = (e) => {
    if(user.email === '') return history.push({ pathname: '/login', goLogin: true })
    // TODO Handle Add Cart
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
  }, [])

  return (
    <Box>
    {!loading 
        ?
        <Box>
          <ProductBreadcrumbs item={item} />
          <Box mb={5  } />
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
              <Box display="flex" justifyContent="flex-end" sx={{mt: 7}}>
                  <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
                  <Button variant="contained" sx={{ml: 2}} onClick={handleAddToCart}> Add to Cart </Button>
              </Box>
            </Grid>
          </Grid>
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
        <Typography> Loading </Typography>
    }
    </Box>
  )
}

export default Product
