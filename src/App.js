import React, { useEffect }from 'react';
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
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Cookies from 'universal-cookie';
import { initialize, setLoading, reset} from './redux/features/userSlice'


const App = () => {
  const cookies = new Cookies();
  const theme = useSelector((state) => state.theme)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = async () => {
    cookies.remove("token")
    console.log("Token cookie:", cookies.getAll().token)
    dispatch(reset())
  }

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
      <ThemeSwitch />
      <Button onClick={() => logout()}> Logout </Button>
      <Button onClick={() => getUserInfo()}> Get User Info </Button>
      <Button component={Link} to="/login"> Login Page </Button>
      <Button component={Link} to="/signup"> Sign up Page </Button>
      <Button component={Link} to="/cart"> Cart </Button>
      <Button component={Link} to="/wishlist"> Wishlist </Button>
      <Button component={Link} to="/orders"> Order </Button>
      <div>{user.first_name ? "Hello " + user.first_name : "No one is logged in"}</div>
      <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/signup" component={Signup} exact/>
          <PrivateRoute path="/cart" component={Cart} exact/>
          <PrivateRoute path="/orders" component={OrderHistory} exact/>
          <PrivateRoute path="/wishlist" component={Wishlist} exact/>
      </Switch>
    </ThemeProvider>
  )
}

export default App
