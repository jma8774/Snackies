import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'


const Home = () => {
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const [showLogin, setShowLogin] = useState(history.location.loggedIn)
  return (
    <div>
      <Snackbar
        open={showLogin}
        autoHideDuration={4000}
        onClose={() => {setShowLogin(false)}}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}> Hi {user.first_name}, login successful!</Alert>
      </Snackbar>
      Home
      <TextField
        id="outlined-textarea"
        label="Multiline Placeholder"
        placeholder="Placeholder"
        multiline
        minRows={5}
        maxRows={7}
        onChange={(e) => console.log(e.target.value)}
        sx={{width: "500px"}}
      />
    </div>
  )
}

export default Home
