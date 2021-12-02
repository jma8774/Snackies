import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"
import { useHistory, useParams  } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';
import logo from '../../assets/icon.png';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import passwordSvg from "../../assets/password.svg"
import RequestResetLink from "./components/RequestResetLink"

const shakeBag = keyframes`
  0% { transform: translate(1px, 1px) rotate(-3deg); }
  5% { transform: translate(-1px, -1px) rotate(-10deg); }
  10% { transform: translate(-1px, 1px) rotate(5deg); }
  15% { transform: translate(0px, 0px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`;

const Reset = () => {
  const history = useHistory();
  const { token } = useParams()
  const [password, setPassword] = useState("")
  // Password don't pass validation
  const [passwordError, setPasswordError] = useState(false)
  // Password and confirmation don't match
  const [password2, setPassword2] = useState("")
  const [passSame, setPassSame] = useState(true)
  const [badJWT, setBadJWT] = useState(false)

  function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    const success = re.test(password)
    // Show error message when it is not successful
    setPasswordError(!success)
    return success;
  }

  function validateSame(password, password2) {
    const same = password === password2
    setPassSame(same)
    return same
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    if(!validatePassword(password) || !validateSame(password, password2)) return
    try {
      await axios.post("/api/user/resetPassword", { token: token, newPassword: password })
      history.push({pathname: '/login', resetSuccess: true})
    } catch(err) {
      setBadJWT(true)
      console.log(err.response ? err.response.data : err)
    }
  }

  return (
    <Paper elevation={3} sx={{
      textAlign: "center",
      mx: "auto",
      mt: 10,
      mb: 5,
      position: "relative",
      width: {
        xs: 300, 
        sm: 400, 
        md: 500, 
        lg: 600, 
        xl: 700, 
      },
    }}>
      <Box component="img" src={logo} sx={{width: 55, mt: 8, animation: `${shakeBag} 5s infinite ease`}}/>
      {token === undefined 
        ? <RequestResetLink />
        :
          <Box sx={{width: "80%", mx: "auto", my: 5}}>
            {/* Bad JWT error */}
            <Snackbar
              open={badJWT}
              autoHideDuration={4000}
              onClose={() => {setBadJWT(false)}}
            >
              <Alert severity="error" variant="filled" sx={{ width: '100%' }}> Invalid reset link. </Alert>
            </Snackbar>
            <Typography variant="h4" textAlign="left" sx={{fontWeight: 500, fontFamily: 'GFS Didot , serif'}}> Enter your new password</Typography>
            <Typography variant="body1" textAlign="left" color="text.secondary" sx={{mt: 2}}>
              Remember that a password must be at least 8 characters, no spaces and must contain an uppercase letter, a number and a special character
            </Typography>
            {/* Forms */}
            <Box component="form" onSubmit={resetPassword} sx={{mt:2}}>
              <Grid container rowSpacing={2} >
                <Grid item xs={12} >
                  <TextField label="Password" type="password"
                    error={passwordError}
                    helperText={passwordError ? "Please follow the password requirements" : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{width: "100%"}}
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField label="Confirm password" type="password"
                    error={!passSame}
                    helperText={!passSame ? "Passwords are not the same" : ""}
                    onChange={(e) => setPassword2(e.target.value)}
                    sx={{width: "100%"}}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Button 
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    sx={{width: "100%"}}
                  >
                    Reset Password
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
      } 
      {/* Image on the bottom */}
      <Box component="img" src={passwordSvg} 
        sx={{
          width: {
            xs: 200,
            sm: 300,
            md: 300,
            lg: 300,
            xl: 300
          },
          display: "block", 
          ml: 4
      }}/>
    </Paper>
  )
}

export default Reset
