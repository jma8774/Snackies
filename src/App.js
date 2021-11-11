import React, { useEffect }from 'react';
import { lightTheme, darkTheme } from './themes/theme'
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Route, Switch, Link } from 'react-router-dom';
import axios from "axios"
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reset from './pages/Reset';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Cookies from 'universal-cookie';
import { initialize, setLoading, reset} from './redux/features/userSlice'
import stars from "./assets/stars.svg"

const App = () => {
  const cookies = new Cookies();
  const theme = useSelector((state) => state.theme)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
    } catch(err) {
      console.log("Get User Info Error:\n", err.response ? err.response.data : err)
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Navbar/>
      <Container maxWidth="xl" sx={{ mt: 5}}>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" exact>
              <Box sx={{ 
                zIndex: -1,
                height: "100%",
                width: "100%",
                backgroundSize: {
                  xs: "0px 0px",
                  sm: "450px 450px",
                  md: "600px 600px",
                  lg: "700px 700px",
                  xl: "700px 700px"
                },
                backgroundImage: `url(${stars})`,
                backgroundRepeat: 'no-repeat',
                textAlign: "center",
              }}>
                <Login />
              </Box>
            </Route>
            <Route path="/signup" component={Signup} exact/>
            <Route path="/reset" component={Reset} exact/>
            <Route path="/reset/:token" component={Reset} />
            <PrivateRoute path="/cart" component={Cart} exact/>
            <PrivateRoute path="/orders" component={OrderHistory} exact/>
            <PrivateRoute path="/wishlist" component={Wishlist} exact/>
        </Switch>
      </Container>
    </ThemeProvider>
  )
}

export default App
