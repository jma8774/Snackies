import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"
import { useDispatch } from 'react-redux'
import { initialize, setLoading} from '../redux/features/userSlice'
import Cookies from 'universal-cookie';


const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "jma8774@bths.edu",
    password: 'somehash',
    tokenId: ''
  })

  const cookies = new Cookies();
  const dispatch = useDispatch()
  
  const login = async () => {
    try {
      await axios.post(`/api/user/login`, {
        email: loginInfo.email,
        password: loginInfo.password,
      });
      console.log("Token cookie now:", cookies.getAll().token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
    } catch(err) {
      console.log("Login Error\n", err)
    }
    dispatch(setLoading(false))
    console.log("User data loaded (if provided with a valid JWT token)")
  }

  const googleLogin = async (response) => {
    const { tokenId } = response
    try {
      const { token } = await axios.post(`/api/user/googleAuth`, {
        tokenId: tokenId,
      });
      console.log("Token cookie now:", cookies.getAll().token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
    } catch(err) {
      console.log("Login Error\n", err)
    }
    dispatch(setLoading(false))
    console.log("User data loaded (if provided with a valid JWT token)")
  }

  const updateEmail = (e) => {
    setLoginInfo(prevState => ({
      ...prevState,
      email: e.target.value
    }))
    console.log(loginInfo)
  }

  const updatePassword = (e) => {
    setLoginInfo(prevState => ({
      ...prevState,
      password: e.target.value
    }))
    console.log(loginInfo)
  }

  return (
    <div>
      <TextField
        label="Email"
        onChange={updateEmail}
      />
      <TextField
        label="Password"
        type="password"
        onChange={updatePassword}
      />
      <Button onClick={() => login()}> Login </Button>
      <GoogleLogin
        clientId="766162828005-efnc6r8ufsla9t4ter3ep7tt1t0q8ulb.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={googleLogin}
        onFailure={() => console.log("Google Login failed")}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Login
