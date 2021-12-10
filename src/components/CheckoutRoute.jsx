import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';



const CheckoutRoute = ({ component: Component, ...rest }) => {
  const history = useHistory()

  return (
    <Route {...rest} render={props => (
      history.location.verifyCheckout
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/',
        }}/>
    )} />
  )
}

export default CheckoutRoute
