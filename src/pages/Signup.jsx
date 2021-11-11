import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"
import { useDispatch } from 'react-redux'
import { useHistory  } from 'react-router-dom';
import { initialize, setLoading} from '../redux/features/userSlice'
import Cookies from 'universal-cookie';

const Signup = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const history = useHistory();
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  })
  const [passwordError, setPasswordError] = useState(false)
  // helperText={passwordError ? "Password must be at least 8 characters, no spaces and must contain an uppercase letter, a number and a symbol" : ""}


  function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    const status = re.test(password)
    setPasswordError(!status)
    return status;
  }

  const updateEmail = (e) => {
    setSignUpInfo(prevState => ({
      ...prevState,
      email: e.target.value
    }))
  }

  const updatePassword = (e) => {
    setSignUpInfo(prevState => ({
      ...prevState,
      password: e.target.value
    }))
  }

  const updateFirstName = (e) => {
    setSignUpInfo(prevState => ({
      ...prevState,
      first_name: e.target.value
    }))
  }

  const updateLastName = (e) => {
    setSignUpInfo(prevState => ({
      ...prevState,
      last_name: e.target.value
    }))
    }

  const signup = async () => {
    try {
      const res = await axios.post(`/api/user/signup`, signUpInfo);
      if(res.data.error && res.data.error === "Email exist")
        console.log("Show some error, email already exist")
      console.log("Token cookie now:", cookies.getAll().token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
      history.push('/')
    } catch(err) {
      console.log("Login Error\n", err.response ? err.response.data : err)
    }
    dispatch(setLoading(false))
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
      <TextField
        label="First Name"
        onChange={updateFirstName}
      />
      <TextField
        label="Last Name"
        onChange={updateLastName}
      />
      <Button onClick={() => signup()}> Signup </Button>
    </div>
  )
}

export default Signup
