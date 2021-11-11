import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"
import { useHistory, Link  } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { initialize, setLoading} from '../redux/features/userSlice'
import Cookies from 'universal-cookie';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GoogleButton from 'react-google-button'
import { keyframes } from '@mui/system';
import logo from '../assets/icon.png';
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const shakeBag = keyframes`
  0% { transform: translate(1px, 1px) rotate(-3deg); }
  5% { transform: translate(-1px, -1px) rotate(-10deg); }
  10% { transform: translate(-1px, 1px) rotate(5deg); }
  15% { transform: translate(0px, 0px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`;

const Login = (props) => {
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    tokenId: ''
  })
  console.log(history.location)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [showSnack, setShowSnack] = useState(history.location.goLogin)

  const cookies = new Cookies();
  const dispatch = useDispatch()
  
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const status = re.test(email)
    setEmailError(!status)
    return status;
  }
  
  const login = async (e) => {
    e.preventDefault();
    if(!validateEmail(loginInfo.email)) return
    setWaiting(true)
    try {
      await axios.post(`/api/user/login`, loginInfo);
      console.log("Token cookie:", cookies.getAll().token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
      setPasswordError(false)
      history.push('/')
    } catch(err) {
      setPasswordError(true)
      console.log("Login Error\n", err.response ? err.response.data : err)
    }
    setWaiting(false)
    dispatch(setLoading(false))
  }

  const googleLogin = async (response) => {
    const { tokenId } = response
    try {
      await axios.post(`/api/user/googleAuth`, { tokenId: tokenId, });
      console.log("Token cookie:", cookies.getAll().token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
      history.push('/')
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
    <Paper elevation={2} sx={{
      textAlign: "center",
      mx: "auto",
      mt: 7,
      pb: 4,
      position: "relative",
      width: {
        xs: 300, 
        sm: 400, 
        md: 500, 
        lg: 600, 
        xl: 700, 
      },
    }} >
      <Snackbar
        open={showSnack}
        autoHideDuration={2000}
        onClose={() => {setShowSnack(false)}}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}> You need to sign in first! </Alert>
      </Snackbar>
      <Tooltip title={<Typography variant="body2">Don't worry, I won't store your password as plaintext! 😊</Typography>} >
        <LockIcon sx={{
          display: "block",
          position: "absolute",
          right: 10 , 
          top: 10
        }}/>
      </Tooltip>
      <Box component="img" src={logo} sx={{width: 55, mt: 6, animation: `${shakeBag} 5s infinite ease`}}/>
      <Typography variant="h2" sx={{fontWeight: 500, fontFamily: 'GFS Didot , serif'}}>
        Snackies
      </Typography>
      <Typography variant="body1" sx={{color: "text.secondary"}}>
        Taste everything.
      </Typography>
      <Grid container rowSpacing={2} justifyContent="center" sx={{mx: "auto", mt: 4, width: "70%"}}>
        <Grid item xs={12} >
          <GoogleLogin  
          clientId="766162828005-efnc6r8ufsla9t4ter3ep7tt1t0q8ulb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={googleLogin}
          onFailure={() => console.log("Google Login failed")}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <GoogleButton style={{width: "100%"}} label='Continue with Google' onClick={renderProps.onClick} disabled={renderProps.disabled}/> 
          )}
          />
        </Grid>
        <Grid item xs={12} >
          <Divider>
            <Typography variant="body1" color="text.secondary"> or </Typography>
          </Divider>
        </Grid>
        <Grid component="form" onSubmit={(e) => login(e)} item xs={12} >
          <TextField
            type="text"
            label="Email"
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
            onChange={updateEmail}
            sx={{width: "100%"}}
          />
          <TextField
            type="password"
            label="Password"
            error={passwordError}
            helperText={passwordError ? "Incorrect email or password" : ""}
            onChange={updatePassword}
            sx={{width: "100%", mt: 2}}
          />
          <Link to="/reset" style={{textDecoration: 'none'}}> 
            <Typography variant="body2" color="secondary" textAlign="left" sx={{mt: 2, fontWeight: 450}}>  
              Forgot password? 
            </Typography>
          </Link>
          <Button 
            disabled={waiting}
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
            sx={{width: "100%", mt: 2}}
          > 
            Login 
          </Button>
        </Grid>
        <Grid item xs={12} sx={{mt: 5}}>
          <Typography component="span" variant="body2" color="text.secondary"> New here? </Typography>
          <Link to="/signup" style={{textDecoration: 'none'}}> 
            <Typography component="span" variant="body2" color="secondary" textAlign="left" sx={{mt: 2, fontWeight: 450}}>  
              Sign Up
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Login
