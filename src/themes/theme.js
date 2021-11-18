import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const light = {
  palette: {
    mode: 'light',
    // primary: {
    //   main: "#fff4ec",
    //   light: "#fbf4ec",
    //   dark: "#fbf4ec"
    // },
    background: {
      default: "#f2f6f9",
      paper: "#ffffff",
      paper2: "#2d2d2d",
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}
const dark = {
  palette: {
    mode: 'dark',
    background: {
      default: "#1d1d1d",
      paper: "#2c2c2e",
      paper2: "#48484a"
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}

const lightTheme = responsiveFontSizes(createTheme(light))
const darkTheme = responsiveFontSizes(createTheme(dark))

export {lightTheme, darkTheme};
