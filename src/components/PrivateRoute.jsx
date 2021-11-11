import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useSelector} from 'react-redux'


const PrivateRoute = ({ component: Component, ...rest }) => {
  const cookies = new Cookies();
  const user = useSelector((state) => state.user)
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
