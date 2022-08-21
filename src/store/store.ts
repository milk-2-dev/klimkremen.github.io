import { configureStore } from '@reduxjs/toolkit'
import citiesSlice from './slices/citiesSlice'

const store = configureStore({
  reducer: {
    cities: citiesSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
