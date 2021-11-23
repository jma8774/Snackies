import React, { useEffect }from 'react';
import { lightTheme, darkTheme } from './themes/theme'
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Route, Switch } from 'react-router-dom';
import axios from "axios"
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reset from './pages/Reset';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Cookies from 'universal-cookie';
import { initialize, setLoading} from './redux/features/userSlice'

const App = () => {
  const cookies = new Cookies();
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserInfo = async () => {
      if(!cookies.get("token")) return
      try {
        const { data } = await axios.get(`/api/user/`);
        dispatch(initialize(data))
      } catch(err) {
        console.log("Get User Info Error:\n", err.response ? err.response.data : err)
      }
      dispatch(setLoading(false))
    }

    getUserInfo()
  }, []);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{overflow: "hidden"}}>
        <Navbar/>
        <Container maxWidth="xl" sx={{ mt: { md: 5}, pb: 8 }}>
          <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/product/:itemId" component={Product} />
              <Route path="/login" component={Login} exact/>
              <Route path="/signup" component={Signup} exact/>
              <Route path="/reset" component={Reset} exact/>
              <Route path="/reset/:token" component={Reset} />
              <PrivateRoute path="/cart" component={Cart} exact/>
              <PrivateRoute path="/orders" component={OrderHistory} exact/>
              <PrivateRoute path="/wishlist" component={Wishlist} exact/>
          </Switch>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
