import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { initialize, setLoading} from '../redux/features/userSlice'
import Cookies from 'universal-cookie';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';
import logo from '../assets/icon.png';
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import dreamer from "../assets/dreamer.svg"


const shakeBag = keyframes`
  0% { transform: translate(1px, 1px) rotate(-3deg); }
  5% { transform: translate(-1px, -1px) rotate(-10deg); }
  10% { transform: translate(-1px, 1px) rotate(5deg); }
  15% { transform: translate(0px, 0px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`;

const Signup = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  })

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailExist, setEmailExist] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [password2Error, setPassword2Error] = useState(false)

  function validateName(first, last) {
    const firstSuccess = first.length > 0
    const lastSuccess = last.length > 0
    setFirstNameError(!firstSuccess)
    setLastNameError(!lastSuccess)
    return firstSuccess && lastSuccess
  }
  
  function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const success = re.test(email)
    setEmailError(!success)
    return success;
  }
  function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    const success = re.test(password)
    setPasswordError(!success)
    return success;
  }

  function validatePassword2(password, password2) {
    const success = password === password2
    setPassword2Error(!success)
    return success;
  }

  function validateInputs() {
    return validateName(formData.first_name, formData.last_name) && validateEmail(formData.email) && validatePassword(formData.password) && validatePassword2(formData.password, formData.password2)
  }


  const signup = async (e) => {
    console.log(formData)
    e.preventDefault();
    if(!validateInputs()) return
    try {
      await axios.post(`/api/user/signup`, formData);
      console.log("Token cookie now:", cookies.getAll().token)
      const { data } = await axios.get(`/api/user/`);
      dispatch(initialize(data))
      history.push({ pathname: '/', loggedIn: true })
    } catch(err) {
      setEmailExist(true)
      console.log("Login Error\n", err.response ? err.response.data : err)
    }
    dispatch(setLoading(false))
  }

  return (
    <React.Fragment>
      {/* Email exist error snackbar */}
      <Snackbar
        open={emailExist}
        autoHideDuration={4000}
        onClose={() => {setEmailExist(false)}}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}> Email already exist. </Alert>
      </Snackbar>
      {/* Actual content */}
      <Paper elevation={3} sx={{
        textAlign: "center",
        mx: "auto",
        mt: {
          xs: 25,
          sm: 25,
          md: 35,
          lg: 35,
          xl: 35,
        },
        mb: 4,
        position: "relative",
        width: {
          xs: 300, 
          sm: 400, 
          md: 500, 
          lg: 600, 
          xl: 700, 
        },
        transition: "transform 1s ease",
        ":hover": {
          transform: 'translate(0px, -10px)'
        }
      }}>
        <Box component="img" src={dreamer} sx={{
          top: {
            xs: -200, 
            sm: -200, 
            md: -265, 
            lg: -265, 
            xl: -265, 
          },
          position: "absolute",
          display: "block",
          width: {
            xs: 300, 
            sm: 300, 
            md: 400, 
            lg: 400, 
            xl: 400, 
        }}}/>
        <Tooltip title={<Typography variant="body2">Don't worry, I won't store your password as plaintext! 😊</Typography>} >
          <LockIcon sx={{
            display: "block",
            position: "absolute",
            right: 10 , 
            top: 10
          }}/>
        </Tooltip>
        <Box component="img" src={logo} sx={{width: 55, mt: 6, animation: `${shakeBag} 5s infinite ease`}}/>
        <Box sx={{width: "80%", mx: "auto", pb: 7}}>
          <Typography variant="h2" sx={{fontWeight: 500, fontFamily: 'GFS Didot , serif'}}> Sign Up </Typography>
          <Typography variant="body1" color="text.secondary" sx={{mt: 2}}>
            EAT. EAT. EAT.
          </Typography>
          {/* Forms */}
          <Box sx={{mt:6}}>
            <Grid container component="form" onSubmit={signup} spacing={2} >
              <Grid item xs={6} >
                <TextField label="First Name"
                  error={firstNameError}
                  helperText={firstNameError ? "First name cannot be empty" : ""}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    first_name: e.target.value
                  }))}
                  sx={{width: "100%"}}
                />
              </Grid>
              <Grid item xs={6} >
                <TextField label="Last Name"
                  error={lastNameError}
                  helperText={lastNameError ? "Last name cannot be empty" : ""}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    last_name: e.target.value
                  }))}
                  sx={{width: "100%"}}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField label="Email"
                  error={emailError}
                  helperText={emailError ? "Please enter a valid email" : ""}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    email: e.target.value
                  }))}
                  sx={{width: "100%"}}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField label="Password" type="password"
                  error={passwordError}
                  helperText={passwordError ? "Password must be at least 8 characters, no spaces and must contain an uppercase letter, a number and a special character" : ""}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    password: e.target.value
                  }))}
                  sx={{width: "100%"}}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField label="Confirm Password" type="password"
                  error={password2Error}
                  helperText={password2Error ? "Passwords are not the same" : ""}
                  onChange={(e) => setFormData(prevState => ({
                    ...prevState,
                    password2: e.target.value
                  }))}
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default Signup
