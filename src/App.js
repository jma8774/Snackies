import React, { useEffect }from 'react';
import { lightTheme, darkTheme } from './themes/theme'
import PrivateRoute from './components/PrivateRoute';
import CheckoutRoute from './components/CheckoutRoute';
import Navbar from './components/Navbar';
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Route, Switch } from 'react-router-dom';
import axios from "axios"
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reset from './pages/Reset/Reset';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist/Wishlist';
import Cookies from 'universal-cookie';
import { initialize, setLoading} from './redux/features/userSlice'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51K4fV3A8ML82j4L3xjuinxFGtkw5B3J2zed7SXvnCF1BUVXZXo9fkr4zxh9bnmh6N4Ax1EWWSWbz1rUjkpg4LqNy00zhdgEE2f');

const App = () => {
  const cookies = new Cookies();
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Elements stripe={stripePromise} >
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
              <CheckoutRoute path="/checkout" component={Checkout} exact/>
          </Switch>
        </Container>
      </Box>
    </ThemeProvider>
    </Elements>

  )
}

export default App
