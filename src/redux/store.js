import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import cartReducer from './features/cartSlice'


export default configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer
  },
})