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
      const response = await axios.post(`/api/user/login`, loginInfo);
      console.log("Token cookie:", cookies.getAll().token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
    } catch(err) {
      console.log("Login Error\n", err.response ? err.response.data : err)
    }
    dispatch(setLoading(false))
  }

  const googleLogin = async (response) => {
    const { tokenId } = response
    try {
      const res = await axios.post(`/api/user/googleAuth`, {
        tokenId: tokenId,
      });
      console.log("Token cookie:", cookies.getAll().token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
    } catch(err) {
      console.log("Google Login Error\n", err.response ? err.response.data : err)
    }
    dispatch(setLoading(false))
  }

  const updateEmail = (e) => {
    setLoginInfo(prevState => ({
      ...prevState,
      email: e.target.value
    }))
  }

  const updatePassword = (e) => {
    setLoginInfo(prevState => ({
      ...prevState,
      password: e.target.value
    }))
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
