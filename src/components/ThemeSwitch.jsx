import React from 'react'
import { useDispatch } from 'react-redux'
import { toggle } from '../redux/features/themeSlice'
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


// Override Switch Component
// add my own custom icons  
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  height: 34,
  padding: 8,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    '&.Mui-checked': {
      color: '#fff',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('/dark_mode.svg')`,
        backgroundSize: '20px',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : theme.palette.warning.dark,
    width: 32,  
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('/light_mode.svg')`,
      backgroundSize: '20px',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const ThemeSwitch = ({setTheme}) => {
  const dispatch = useDispatch()

  return (
    <MaterialUISwitch
      defaultChecked
      onChange={() => dispatch(toggle())}
    >
    </MaterialUISwitch>
  )
}

export default ThemeSwitch
