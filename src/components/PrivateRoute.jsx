import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux'
import { initialize, setLoading} from '../redux/features/userSlice'



const PrivateRoute = ({ component: Component, ...rest }) => {
  const cookies = new Cookies();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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

  useEffect(() => {
    if(cookies.get('token') && user.loading)
      getUserInfo()
  }, []);

  // console.log(cookies.get('token'))
  // console.log("Authorization Loading", user.loading)
  // console.log("Authorization User Id", user.id)
  return (
    cookies.get('token') !== undefined && user.loading
      ? <div>LOADING</div>
      : <Route {...rest} render={props => (
          user.id !== ""
            ? <Component {...props} />
            : <Redirect to={{
              pathname: '/login',
              goLogin: true
            }}/>
        )} />
  )
}

export default PrivateRoute
