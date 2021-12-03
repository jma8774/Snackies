import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'
import axios from "axios"
import ItemCard from './components/ItemCard'
import BrandChips from './components/BrandChips'
import SortItemsSelect from './components/SortItemsSelect'
import Banner from './components/Banner';
import Brands from './components/Brands';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';




const sortObjects = [{ rating: -1}, {rating: 1}, {basePrice: -1}, {basePrice: 1}, {name: 1}, {name: -1}]

const Home = () => {
  const history = useHistory()
  const startBrowsingRef = useRef(null)
  const user = useSelector((state) => state.user)
  const [userWishlist, setUserWishlist] = useState([])
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [totalItems, setTotalItems] = useState(50)
  const [sort, setSort] = useState(0)
  const [filterBrand, setFilterBrand] = useState("All")
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(history.location.loggedIn)
  
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const downXl = useMediaQuery((theme) => theme.breakpoints.down('xl'));
  
  const executeScroll = () => {
    const top = startBrowsingRef.current.offsetTop - 150
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  }
  
  const handlePageChange = (e, newPage) => {
    if(newPage === page) return
    setPage(newPage)
    executeScroll()
  }

  const handleSortChange = (e) => {
    setPage(1)
    setSort(e.target.value)
  }

  const handleFilterChange = (e, brand) => {
    setPage(1)
    executeScroll()
    if(brand) {
      setFilterBrand(brand)
      return
    }
    if(e.target.alt === filterBrand || e.target.textContent === filterBrand) return
    setFilterBrand(e.target.alt || e.target.textContent)
  }
    
  useEffect(() => {
    const toBrandFilter = history.location.toBrandFilter
    if(toBrandFilter) 
      handleFilterChange(null, toBrandFilter)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location])

  useEffect(() => {
    setItemsPerPage(downXl ? 6 : 8)
  }, [downXl])

  useEffect(() => {
    const fetchWishlist = async () => {
      if(user.email === '') return setUserWishlist([])
      try {
        const params = { email: user.email }
        const { data } = await axios.get(`/api/user/wishlist`, { params: params });
        // console.log(data)
        setUserWishlist(data)
      } catch(err) {
        console.log("Fetch Wishlist Error:\n", err.response ? err.response.data : err)
      }
    }
    fetchWishlist()
  }, [user.email])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const params = { itemsPerPage: itemsPerPage, page: page, sort: sortObjects[sort], filter: filterBrand }
        const { data } = await axios.get(`/api/item/`, { params: params });
        // console.log(data)
        setItems(data)
      } catch(err) {
        console.log("Fetch Items Error:\n", err.response ? err.response.data : err)
      }
    }
    setLoading(true)
    fetchItems()
    setLoading(false)
  }, [itemsPerPage, page, sort, filterBrand]);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const params = { filter: filterBrand }
        const { data } = await axios.get(`/api/item/length`, { params: params });
        // console.log(data)
        setTotalItems(data)
      } catch(err) {
        console.log("Fetch Total Items Error:\n", err.response ? err.response.data : err)
      }
    }
    fetchTotal()
  }, [filterBrand]);

  return (
    <Box>
      {/* Close successful login message box after x seconds */}
      <Snackbar
        open={showLogin}
        autoHideDuration={4000}
        onClose={() => {setShowLogin(false)}}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> Hello {user.first_name}! </Alert>
      </Snackbar>
      <Banner executeScroll={executeScroll} />
      <Brands handleFilterChange={handleFilterChange} />
      <Box sx={{mt: 5}}/>
      <Grid ref={ startBrowsingRef } container width="100%" spacing={2} alignItems="center" >
        {downSm && <Typography ml={2}> Scroll horizontally to view more brands </Typography>}
        <Grid item xs={12} lg={9} sx={{overflowX: 'auto', pb: { xs: 2, md: 0}}}>
          <Box mt={0.5}>
            <BrandChips filterBrand={filterBrand} handleFilterChange={handleFilterChange} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={3} display="flex" justifyContent="flex-end">
          <SortItemsSelect sort={sort} handleSortChange={handleSortChange} />
        </Grid>
      </Grid>
      <Box sx={{mt: 4, minHeight: 500}}>
        {items.length > 0
        ? <Grid container rowSpacing={3} justifyContent="flex-start" sx={{mx: "auto"}}>
            {items.map((item) => {
              return(
                <Grid key={item._id} item xs={12} sm={6} md={4} xl={3} > 
                    <ItemCard item={item} isWish={userWishlist.includes(item._id)} setUserWishlist={setUserWishlist} />
                </Grid>
              )
            })}
          </Grid>
        : <Typography variant="h6" textAlign="left" mt={3}> No items found</Typography>
        }
      </Box>
      <Box sx={{mt: 5, pb: 15, display: "flex", justifyContent: "center"}}>
        <Pagination color="secondary"page={page} onChange={handlePageChange} count={Math.ceil(totalItems/itemsPerPage)} size={downSm ? "small" : "large"} />
      </Box>
    </Box>
  )
}

export default Home
