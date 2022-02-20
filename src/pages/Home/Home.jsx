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
import ItemSkeleton from './components/ItemSkeleton'
import BrandChips from './components/BrandChips'
import SortItemsSelect from './components/SortItemsSelect'
import Banner from './components/Banner';
import Brands from './components/Brands';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchField from './components/SearchField'
import ErrorIcon from '@mui/icons-material/Error';



const itemsPerPage = window.innerWidth <= 1536 ? 6 : 8
const sortObjects = [{ rating: -1}, {rating: 1}, {basePrice: -1}, {basePrice: 1}, {name: 1}, {name: -1}]

const Home = () => {
  const history = useHistory()
  const startBrowsingRef = useRef(null)
  const user = useSelector((state) => state.user)
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  
  const [userWishlist, setUserWishlist] = useState([])
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(50)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(0)
  const [filterBrand, setFilterBrand] = useState("All")
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(history.location.loggedIn)
  
  const executeScroll = () => {
    const top = startBrowsingRef.current.offsetTop - 150
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target[0].value)
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
    const fetchWishlist = async () => {
      if(user.email === '') return setUserWishlist([])
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
  }, [user.email])

  // When they change filter, we fetch new items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const params = { itemsPerPage: itemsPerPage, page: page, search: search, sort: sortObjects[sort], filter: filterBrand }
        const { data } = await axios.get(`/api/item/`, { params: params });
        // console.log(data)
        if(search) 
          setPage(1)
        setItems(data.items)
        setTotalItems(data.totalItems)
      } catch(err) {
        console.log("Fetch Items Error:\n", err.response ? err.response.data : err)
      }
      setLoading(false)
    }
    fetchItems()
  }, [page, search, sort, filterBrand]);

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
      <Grid ref={ startBrowsingRef } container width="100%" spacing={2} alignItems="center" sx={{mt: 15}}>
        <Grid item xs={12} md>
          <SearchField handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} md sx={{ display: "flex", justifyContent: {xs: "flex-start", md: "flex-end"} }}>
          <SortItemsSelect sort={sort} handleSortChange={handleSortChange} />
        </Grid>
        {/* {downSm && <Typography ml={2} textAlign="center"> Scroll horizontally to view more brands </Typography>} */}
        <Grid item xs={12}  sx={{overflowX: 'auto', pb: { xs: 2, md: 0}}}>
          <Box mt={0.5}>
            <BrandChips filterBrand={filterBrand} handleFilterChange={handleFilterChange} />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{display: "flex", flexDirection: "column", mt: 4, minHeight: 600}}>
        {(items.length === 0 && !loading) &&
          <Box sx={{ flex: 1, py: 7, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <ErrorIcon color="error" sx={{fontSize: 50}}/>
            <Typography sx={{mt: 1, textAlign: "center"}}> No items found for this search 😮 </Typography>
          </Box>
        }   
        <Grid container rowSpacing={3} justifyContent="flex-start" sx={{mx: "auto"}} >
          {loading 
            ? [...Array(itemsPerPage)].map((x, i) => <ItemSkeleton key={i} /> )
            : items.map((item) => 
                <Grid key={item._id} item xs={12} sm={6} md={4} xl={3} > 
                  <ItemCard item={item} isWish={userWishlist.includes(item._id)} setUserWishlist={setUserWishlist} />
                </Grid>
              )
          }   
        </Grid>
      </Box>
      <Box sx={{mt: 7, pb: 10, display: "flex", justifyContent: "center"}}>
        <Pagination color="secondary"page={page} onChange={handlePageChange} count={Math.ceil(totalItems/itemsPerPage)} size={downSm ? "small" : "large"} />
      </Box>
    </Box>
  )
}

export default Home
