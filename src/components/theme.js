import { createTheme } from '@mui/material/styles';

const light = {
  palette: {
    mode: 'light',
  },
}
const dark = {
  palette: {
    mode: 'dark',
  },
}

const lightTheme = createTheme(light)
const darkTheme = createTheme(dark)

export {lightTheme, darkTheme};