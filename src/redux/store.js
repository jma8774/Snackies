import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import userReducer from './features/userSlice'


export default configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer
  },
})