import { createSlice } from '@reduxjs/toolkit'

// createSlice is part of the Redux Toolkit which is the recommended way to use Redux
// It simplifies the old ways of creating reducers and then having to create actions for each
// Better file managment this way
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    cart_count: 0,
    addresses: [],
    loading: true
  },
  reducers: {
    initialize: (state, action) => {
      const data = action.payload
      state.id = data.id
      state.email = data.email
      state.first_name = data.first_name
      state.last_name = data.last_name
      state.cart_count = data.cart_count
      state.addresses = data.addresses
    },
    reset: (state) => {
      state.id = ''
      state.email = ''
      state.first_name = ''
      state.last_name = ''
      state.cart_count = 0
      state.addresses = []
      state.loading = true
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCartCount: (state, action) => {
      state.cart_count = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { initialize, setLoading, setCartCount, reset } = userSlice.actions

export default userSlice.reducer