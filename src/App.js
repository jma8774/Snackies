import React from 'react';
import { lightTheme, darkTheme } from './theme'
import ThemeSwitch from './components/ThemeSwitch';
import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { add, remove } from './redux/features/cartSlice'


const App = () => {
  const theme = useSelector((state) => state.theme.value)
  const cart = useSelector((state) => state.cart.value)
  const dispatch = useDispatch()

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      <ThemeSwitch />
      <Button onClick={() => dispatch(add(cart.length))}> 
        Cart Add 
      </Button>
      <Button onClick={() => dispatch(remove(cart.length-1))}> 
        Cart Delete 
      </Button>
      {cart.length}
    </ThemeProvider>
  )
}

export default App
