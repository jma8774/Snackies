import React, { useState, useEffect }from 'react';
import { lightTheme, darkTheme } from './theme'
import ThemeSwitch from './components/ThemeSwitch';
import PrivateRoute from './components/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Route, Switch, Link } from 'react-router-dom';
import axios from "axios"
import Login from './pages/Login';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Cookies from 'universal-cookie';
import { initialize, setLoading, reset} from './redux/features/userSlice'


const App = () => {
  const cookies = new Cookies();
  const theme = useSelector((state) => state.theme.value)
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  const logout = async () => {
    cookies.remove("token")
    console.log("Token cookie now:", cookies.getAll().token)
    dispatch(reset())
  }

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
    } catch(err) {
      console.log(err)
    }
    dispatch(setLoading(false))
    console.log("User data loaded (if provided with a valid JWT token)")
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      <ThemeSwitch />
      <Button onClick={() => logout()}> Logout </Button>
      <Button onClick={() => getUserInfo()}> Get User Info </Button>
      <Button component={Link} to="/login"> Login Page </Button>
      <Button component={Link} to="/cart"> Cart </Button>
      <Button component={Link} to="/wishlist"> Wishlist </Button>
      <Button component={Link} to="/orders"> Order </Button>

      <Switch>
          <Route path="/login" component={Login} exact/>
          <PrivateRoute path="/cart" component={Cart} exact/>
          <PrivateRoute path="/orders" component={OrderHistory} exact/>
          <PrivateRoute path="/wishlist" component={Wishlist} exact/>
      </Switch>
    </ThemeProvider>
  )
}

export default App
