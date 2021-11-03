import { createSlice } from '@reduxjs/toolkit'

// createSlice is part of the Redux Toolkit which is the recommended way to use Redux
// It simplifies the old ways of creating reducers and then having to create actions for each
// Better file managment this way
export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: true,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggle } = themeSlice.actions

export default themeSlice.reducer