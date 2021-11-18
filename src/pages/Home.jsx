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
import Banner from '../components/Banner';
import Brands from '../components/Brands';


const Home = () => {
  const history = useHistory()
  const cookies = new Cookies()
  const startBrowsingRef = useRef(null)
  const user = useSelector((state) => state.user)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(history.location.loggedIn)

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
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> Hi {user.first_name}, login successful!</Alert>
      </Snackbar>
      <Banner startBrowsingRef={startBrowsingRef} />
      <Brands/>
      <Box sx={{mt: 5}}/>
      <Box ref={ startBrowsingRef }>
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
    </React.Fragment>
  )
}

export default Home
