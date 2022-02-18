import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { reset } from '../../../redux/features/userSlice'

const RequestResetLink = () => {
  const dispatch = useDispatch()
  const cookies = new Cookies();
  const [email, setEmail] = useState("")
  const [disableButton, setDisableButton] = useState(false)
  const [successSnack, setSuccessSnack] = useState(false)
  const [emailError, setEmailError] = useState(false)

  function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const status = re.test(email)
    setEmailError(!status)
    return status;
  }

  const logout = async () => {
    cookies.remove("token", { path: '/' })
    // console.log("Token cookie:", cookies.getAll().token)
    dispatch(reset())
  }

  const sendReset = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)) return
    try {
      await axios.get("/api/user/sendReset?email=" + email)
      logout()
    } catch(err) {
      console.log(err.response ? err.response.data : err)
    }
    setDisableButton(true)
    setSuccessSnack(true)
  }

  return(
    <Box sx={{width: "80%", mx: "auto", my:5}}>
      <Snackbar
        open={successSnack}
        autoHideDuration={4000}
        onClose={() => {setSuccessSnack(false)}}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> Success, password reset information will be sent shortly if the email is valid. </Alert>
      </Snackbar>
      <Typography variant="h4" textAlign="left" sx={{fontWeight: 500, fontFamily: 'GFS Didot , serif'}}> Forgot your password </Typography>
      <Typography variant="body1" textAlign="left" color="text.secondary" sx={{mt:2}}> Please enter the email address you'd like your password reset information sent to </Typography>
      <Box component="form" onSubmit={sendReset} sx={{mt: 2}}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField 
            label="Email" 
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
            onChange={(e) => setEmail(e.target.value)} 
            sx={{width: "100%"}} 
          /> 
          </Grid>
          <Grid item xs={12} > 
            <Button type="submit" variant="contained" color="secondary" size="large" disabled={disableButton} sx={{width: "100%"}}> Request Reset Link </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default RequestResetLink
