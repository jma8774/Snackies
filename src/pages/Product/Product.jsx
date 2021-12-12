import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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
import { setCartCount } from '../../redux/features/userSlice'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import SortReviews from './components/SortReviews'
import RelatedItems from './components/RelatedItems'
import QuantitySelect from './components/QuantitySelect'
import ProductBreadcrumbs from './components/ProductBreadcrumbs'
import SizeButton from './components/SizeButton'
import ProductSkeleton from './components/ProductSkeleton'
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { keyframes } from '@mui/system';

const reviewsPerPage = 5
const animateHeart = keyframes`
  0%{transform:scale(.2);}
  40%{transform:scale(1.2);}
  100%{transform:scale(1);}
`;
const animateHeartOut = keyframes`
  0%{transform:scale(1.4);}
  100%{transform:scale(1);}
`;

const Product = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [userWishlist, setUserWishlist] = useState([])
  const [wishLoading, setWishLoading] = useState(false)
  const [error, setError] = useState({error: false, message: ''})
  const { itemId } = useParams()
  const [item, setItem] = useState({})
  const [relatedItems, setRelatedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [sizeSelected, setSizeSelected] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addLoading, setAddLoading] = useState(false)
  const [successCart, setSuccessCart] = useState(false)
  const [sortReview, setSortReview] = useState(0)
  const [reviews, setReviews] = useState([])
  const [curPage, setCurPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [writeReview, setWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({rating: 1, message: '', created: null, noComment: false})
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const handleSortViewChange = async (e) => {
    setSortReview(e.target.value)
    setCurPage(1)
  }

  const handlePageChange = async (e, newPage) => {
    if(newPage === curPage) return
    setCurPage(newPage)
  }
  
  // User clicks "Write a Review" button
  const handleWriteAReview = async () => {
    setWriteReview(!writeReview)
    // User closes the review tab/section
    if(writeReview || user.id === '') return

    try {
      const params = { itemId: itemId, userId: user.id }
      const { data } = await axios.get(`/api/review/`, { params: params });
      data.noComment = false
      data.created = data.created ? new Date(data.created) : null
      setNewReview(data)
      // console.log("Previous Review", data)  
    } catch(err) {
      console.log("Get Previous Review Error:\n", err.response ? err.response.data : err)
    }
  }

  // User submits their review
  const handleSubmitReview = async () => {
    // Make sure logged in (Maybe error snackbar if not logged in)
    if(user.id === '') {
      setError({error: true, message: "You must login to leave a review."})
      return
    }
    if(newReview.noComment) newReview.message = ''
    try {
      await axios.post(`/api/review/`, { itemId: itemId, userId: user.id, rating: newReview.rating, message: newReview.message });
      setWriteReview(false)
      fetchReviews()
      fetchProduct()
      setCurPage(1)
      setReviewSubmitted(true)
      // console.log("New Review", newReview)
    } catch(err) {
      console.log("Post Review Error:\n", err.response ? err.response.data : err)
    }
  }

  const handleAddToCart = async () => {
    if(user.id === '') {
      setError({error: true, message: "You must login to add to cart."})
      return
    }
    try {
      setAddLoading(true)
      const { data } = await axios.post(`/api/cart/add`, { userId: user.id, itemId: item._id, size: item.prices[sizeSelected].size, quantity: quantity, price: item.prices[sizeSelected].price  });
      dispatch(setCartCount(data))
      setAddLoading(false)
      setSuccessCart(true)
    } catch(err) {
      console.log("Add Cart Item Error:\n", err.response ? err.response.data : err)
    }
  }

  // Add/Remove to wishlist
  const handleWishClick = async () => {
    if(user.id === '') {
      setError({error: true, message: "You must login to add an item to your wishlist."})
      return
    }

    try{
      setWishLoading(true)
      let res;
      if(userWishlist.includes(itemId))
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
    setWishLoading(false)
  }

  const fetchReviews = async () => {
    try {
      const params = { itemId: itemId, reviewsPerPage: reviewsPerPage, page: curPage-1, sort: sortReview }
      const { data } = await axios.get(`/api/review/getAll`, { params: params });
      setReviews(data.reviews)
      setMaxPage(data.numPages)
      // console.log("Reviews", data)
    } catch(err) {
      console.log("Fetch Reviews Error:\n", err.response ? err.response.data : err)
    }
  }

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/item/getById`, { params: {itemId: itemId} });
      // console.log("Item", data)
      setItem(data.item)
      setRelatedItems(data.related)
      setLoading(false)
    } catch(err) {
      console.log("Fetch Product Error:\n", err.response ? err.response.data : err)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchProduct()
    // These are here to that if we click on a related product, it'll reset everything
    window.scrollTo({
      top: 0,
    });
    setCurPage(1)
    setWriteReview(false)
    setQuantity(1)
    setSortReview(0)
    // When ItemId changes, we want to fetch product, set everything to default
    // Also runs when the page loads
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId])

  useEffect(() => {
    fetchReviews()
    // When viewing new item, changing the page of review or sorting the review, we fetch new reviews with the new params
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, curPage, sortReview])

  useEffect(() => {
    const fetchWishlist = async () => {
      if(user.id === '') return setUserWishlist([])
      try {
        const params = { email: user.email, populated: false }
        const { data } = await axios.get(`/api/user/wishlist`, { params: params });
        // console.log(data)
        setUserWishlist(data)
      } catch(err) {
        console.log("Fetch Wishlist Error:\n", err.response ? err.response.data : err)
      }
    }
    fetchWishlist()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  return (
    <Box sx={{pb: "50px"}}>
      <Snackbar
        open={successCart}
        autoHideDuration={2000}
        onClose={() => {setSuccessCart(false)}}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> Item added to cart! </Alert>
      </Snackbar>
      <Snackbar
        open={error.error}
        autoHideDuration={3000}
        onClose={ () => {setError(prevState => ({...prevState, error: false}))} } 
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}> {error.message} </Alert>
      </Snackbar>
      <Snackbar
        open={reviewSubmitted}
        autoHideDuration={3000}
        onClose={() => {setReviewSubmitted(false)}}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> Review submitted! </Alert>
      </Snackbar>
      {!loading 
          ?
          <Box>
            {/* Product information */}
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
                <Box display="flex">
                  <Typography variant="h4" flexGrow={1}>  
                    {item.name}
                  </Typography>
                  <Box flexBasis="auto">
                    <IconButton color="error" disabled={wishLoading} onClick={handleWishClick}> 
                      {userWishlist.includes(itemId) 
                      ? <FavoriteIcon sx={{ animation: `${animateHeart} 0.3s 1 linear`}}/> 
                      : <FavoriteBorderIcon sx={{ animation: `${animateHeartOut} 0.3s 1 linear` }}/>}
                    </IconButton>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={1}>
                  <Rating name="read-only" value={item.rating} precision={0.5} readOnly /> 
                  <Tooltip title={`${parseFloat(item.rating).toFixed(2)} stars`}>
                    <Box component={Typography} variant="body1" color="text.secondary" sx={{ ml: 1}}> ({item.reviews.length} {item.reviews.length === 0 ? "Rating" : "Ratings"}) </Box>
                  </Tooltip>
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
            {/* Related Products */}
            <Box display="flex" >
              <Typography variant="h4" flexGrow={1}> Related Products </Typography>
            </Box>
            <RelatedItems relatedItems={relatedItems} />
            <Divider sx={{mt: 10, mb: 2}} />
            <Box>
              <Typography variant="h4"> Community Reviews </Typography>
              <Box display="flex" flexWrap="wrap" alignItems="center" sx={{mt: 5}}> 
                  <Box flexGrow={1} sx={{mb: 2}}> 
                    <Button variant="contained" color="secondary" size="large" onClick={handleWriteAReview}> <Typography variant="inherit" noWrap> Write a review </Typography> </Button> 
                  </Box>
                  <SortReviews sort={sortReview} handleSortChange={handleSortViewChange} />
              </Box>
            </Box>
            {/* Write a review */}
            { writeReview &&
              <Box sx={{mt: 3}}>
                <Box display="flex" alignItems="center">
                  <Box component={Typography} variant="body1" color="text.secondary" sx={{ mr: 1}}> Rating </Box>
                  <Box flexGrow={1}>
                    <Rating
                      value={newReview.rating} 
                      onChange={ (e, newRating) => setNewReview(prevState => ({...prevState, rating: newRating})) }
                    /> 
                  </Box>
                  <Typography display="flex" alignItems="center" variant="subtitle1" color="text.secondary" > 
                    <EditIcon sx={{mr: 1}}/>
                    {newReview.created ? `${newReview.created.toDateString().slice(4)}` : 'N/A'}
                  </Typography>
                </Box>
                <TextField
                  label="Comment here"
                  placeholder="Write something that you like or don't like about about this product!"
                  multiline
                  value={newReview.message}
                  disabled={newReview.noComment}
                  minRows={5}
                  maxRows={7}
                  onChange={(e) => setNewReview(prevState => ({...prevState, message: e.target.value}))}
                  sx={{mt: 2.5, width: "100%"}}
                />
                <Box display="flex" alignItems="center">
                  <Box flexGrow={1}>
                    <FormControlLabel 
                      control={
                        <Checkbox 
                          checked={newReview.noComment} 
                          onChange={(e) => setNewReview(prevState => ({...prevState, noComment: e.target.checked}))} 
                        /> 
                      }
                      label="No comment" 
                    />
                  </Box>
                  <Button variant="contained" sx={{mt: 2}} onClick={handleSubmitReview}> {newReview.created ? "Update Review" : "Submit Review"} </Button>
                </Box>
              </Box>
            }
            {/* Reviews */}
            <Box sx={{minHeight: 300, mt: 4}}>
              {reviews.length === 0 && 
                <Typography variant="body1" display="flex" alignItems="center" justifyContent="center" mt={5}> <CommentIcon sx={{mr:1}}/> No reviews yet, be the first to review this item! </Typography>
              }
              {reviews.map((review, i) => {
                return <Paper variant="outlined" key={i} display="flex" sx={{px: 2, py: 2, mt: 2}}> 
                  <Box display="flex">
                    <Typography flexGrow={1} variant="body1"> {review.user ? `${review.user.first_name} ${review.user.last_name ? review.user.last_name.slice(0, 1)+'.' : ''}` : "Anon"} </Typography>
                    <Typography variant="body1" color="text.secondary"> {new Date(review.created).toDateString().slice(4)} </Typography> 
                  </Box>
                  <Rating name="read-only" value={review.rating} precision={0.5} size="small" readOnly sx={{mt:1}}/> 
                  <Typography variant="body2" sx={{mt:2}}> {review.message} </Typography>
                </Paper>
              })}
            </Box>
            <Box sx={{mt: 5, display: "flex", justifyContent: "center"}}>
              <Pagination color="secondary" page={curPage} onChange={handlePageChange} count={maxPage} />
            </Box>
          </Box>
          : <ProductSkeleton />
      }
    </Box>
  )
}

export default Product
