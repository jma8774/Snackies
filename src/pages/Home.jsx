import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import Cookies from 'universal-cookie';
import ItemCard from '../components/ItemCard'
import BrandChips from '../components/BrandChips'
import SortItemsSelect from '../components/SortItemsSelect'
import Banner from '../components/Banner';
import Brands from '../components/Brands';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';


const Home = () => {
  const history = useHistory()
  const cookies = new Cookies()
  const startBrowsingRef = useRef(null)
  const user = useSelector((state) => state.user)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(50)
  const [sort, setSort] = useState(0)
  const [filterBrand, setFilterBrand] = useState("All")
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(history.location.loggedIn)

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handlePageChange = (e, newPage) => {
    // console.log("page", page)
    // console.log("new page", newPage)
    setPage(newPage)
  }

  const handleSortChange = (e) => {
    // console.log("sort", sort)
    // console.log("new sort", e.target.value)
    setSort(e.target.value)
  }

  const handleFilterChange = (e) => {
  //   console.log("filter", filterBrand)
  //   console.log("new filter", e.target.textContent)
    setFilterBrand(e.target.textContent)
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(`/api/item/`);
        console.log(data)
        setItems(data)
      } catch(err) {
        console.log("Fetch Items Error:\n", err.response ? err.response.data : err)
      }
    }
    fetchItems()
    setLoading(false)
  }, []);

  return (
    <React.Fragment>
      {/* Close successful login message box after x seconds */}
      <Snackbar
        open={showLogin}
        autoHideDuration={4000}
        onClose={() => {setShowLogin(false)}}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> Hello {user.first_name}! </Alert>
      </Snackbar>
      <Banner startBrowsingRef={startBrowsingRef} />
      <Brands/>
      <Box sx={{mt: 5}}/>
      <Grid container width="100%" spacing={2} alignItems="center" >
        <Grid item xs={12} lg={9} sx={{overflowX: 'auto', pb: { xs: 2, md: 0}}}>
          <BrandChips filterBrand={filterBrand} handleFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} lg={3} display="flex" justifyContent="flex-end">
          <SortItemsSelect sort={sort} handleSortChange={handleSortChange} />
        </Grid>
      </Grid>
      <Box ref={ startBrowsingRef } sx={{mt: 4  }}>
        <Grid container rowSpacing={3} justifyContent="flex-start" sx={{mx: "auto"}}>
          {items.map((item, i) => {
            return(
              <Grid key={i} item xs={12} sm={6} md={4} xl={3} > 
                <ItemCard item={item} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
      <Box sx={{mt: 5, display: "flex", justifyContent: "center"}}>
        <Pagination color="secondary"page={page} onChange={handlePageChange} count={Math.ceil(totalItems/12)} size={downSm ? "small" : "large"} />
      </Box>
    </React.Fragment>
  )
}

export default Home
