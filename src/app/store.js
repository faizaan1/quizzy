import { configureStore } from '@reduxjs/toolkit'
import useReducer from '../features/userSlice';
const inspector = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default configureStore({
    inspector,
    reducer: {
      user:useReducer,
  },
})