import React, { useState } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';



const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory()
  const [verifyCheckout, setVerifyCheckout] = useState(history.location.verifyCheckout)

  return (
    <Route {...rest} render={props => (
      verifyCheckout
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/',
        }}/>
    )} />
  )
}

export default PrivateRoute
