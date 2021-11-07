import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// createSlice is part of the Redux Toolkit which is the recommended way to use Redux
// It simplifies the old ways of creating reducers and then having to create actions for each
// Better file managment this way
export const themeSlice = createSlice({
  name: 'theme',
  // Cookie doesn't get stored as a bool but as a string, so we have to do
  //    "true" === "true" --> true
  //    "false" === "true" --> false
  initialState: cookies.get("theme") === undefined ? true : cookies.get("theme") === "true",
  reducers: {
    toggle: (state) => {
      return !state
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggle } = themeSlice.actions

export default themeSlice.reducer