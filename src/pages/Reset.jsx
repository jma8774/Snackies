import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams, useHistory  } from 'react-router-dom';
import axios from "axios"

const SendEmail = () => {
  const [email, setEmail] = useState("")

  const sendReset = async () => {
    try {
      await axios.get("/api/user/sendReset?email=" + email)
    } catch(err) {
      console.log(err.response ? err.response.data : err)
    }
    console.log("If the email is registered, a reset link will be sent to it.")
  }

  return(
    <div>
    <TextField
      label="Email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <Button onClick={sendReset}>
      Submit
    </Button>
    </div>
  )
}

const Reset = () => {
  const history = useHistory();
  const { token } = useParams()
  const [password, setPassword] = useState("")

  const resetPassword = async () => {
    try {
      await axios.post("/api/user/resetPassword", { token: token, newPassword: password })
      console.log("Password has been reset, will redirect to login in 3 seconds")
      history.push('/login')
    } catch(err) {
      console.log(err.response ? err.response.data : err)
    }
  }

  return (
    token === undefined 
    ? <SendEmail />
    :
      <div>
      <TextField
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={resetPassword}>
        Reset
      </Button>
      </div>
  )
}

export default Reset
