import React from 'react'
import { useDispatch } from 'react-redux'
import { toggle } from '../redux/features/themeSlice'
import Switch from '@mui/material/Switch';


const ThemeSwitch = ({setTheme}) => {
  const dispatch = useDispatch()

  return (
    <Switch
      defaultChecked
      onChange={() => dispatch(toggle())}
    >
    </Switch>
  )
}

export default ThemeSwitch
