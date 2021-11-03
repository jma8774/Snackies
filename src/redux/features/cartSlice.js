import { createSlice } from '@reduxjs/toolkit'

// createSlice is part of the Redux Toolkit which is the recommended way to use Redux
// It simplifies the old ways of creating reducers and then having to create actions for each
// Better file managment this way
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      const itemExist = state.value.indexOf(action.payload) === -1 ? false : true
      if(!itemExist)
        state.value.push(action.payload)
    },
    remove: (state, action) => {
      const itemIndex = state.value.indexOf(action.payload)
      if(itemIndex > -1)
        state.value.splice(itemIndex, 1)
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = cartSlice.actions

export default cartSlice.reducer