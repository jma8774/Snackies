import React from 'react'
import GoogleLogin from 'react-google-login';
import Button from '@mui/material/Button';
import axios from "axios"
import { useDispatch } from 'react-redux'
import { initialize, setLoading} from '../redux/features/userSlice'


const responseGoogle = (response) => {
  console.log("Google auth\n", response);
}

const Login = () => {
  const dispatch = useDispatch()

  const login = async () => {
    try {
      const { token } = await axios.post(`/api/user/login`, {
        email: "jma8774@bths.edu",
        password: 'some password'
      });
      console.log("Token cookie now:", token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
    } catch(err) {
      console.log("Login Error\n", err)
    }
    dispatch(setLoading(false))
    console.log("User data loaded (if provided with a valid JWT token)")
  }

  return (
    <div>
      <Button onClick={() => login()}> Login </Button>
      <GoogleLogin
        clientId="766162828005-efnc6r8ufsla9t4ter3ep7tt1t0q8ulb.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Login
