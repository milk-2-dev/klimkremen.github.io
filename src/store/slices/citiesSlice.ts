import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import citiesService from '../../services/cities'

export interface ICityListItem {
  clouds: { all: number }
  coord: { lat: number; lon: number }
  dt: number
  id: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  name: string
  rain: number | null
  snow: number | null
  sys: { country: string }
  weather: [{ id: number; main: string; description: string; icon: string }]
  wind: { speed: number; deg: number }
}

const initialState: {
  cod: string
  count: number
  list: ICityListItem[]
  message: string
} = {
  cod: '',
  count: 0,
  list: [],
  message: '',
}

// const test = {
//   cod: '200',
//   count: 1,
//   list: [
//     {
//       clouds: { all: 0 },
//       coord: { lat: 50.088, lon: 14.4208 },
//       dt: 1660723749,
//       id: 3067696,
//       main: {
//         temp: 25.51,
//         feels_like: 25.53,
//         temp_min: 24.36,
//         temp_max: 28.49,
//         pressure: 1013,
//         humidity: 54,
//       },
//       name: 'Prague',
//       rain: null,
//       snow: null,
//       sys: { country: 'CZ' },
//       weather: [
//         { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
//       ],
//       wind: { speed: 1.03, deg: 0 },
//     },
//     {
//       clouds: { all: 0 },
//       coord: { lat: 50.087, lon: 14.4202 },
//       dt: 1660723749,
//       id: 3065328,
//       main: {
//         temp: 25.51,
//         feels_like: 25.53,
//         temp_min: 24.36,
//         temp_max: 28.49,
//         pressure: 1013,
//         humidity: 54,
//       },
//       name: 'Staré Město',
//       rain: null,
//       snow: null,
//       sys: { country: 'CZ' },
//       weather: [
//         { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
//       ],
//       wind: { speed: 1.03, deg: 0 },
//     },
//   ],
//   message: 'like',
// }

export const fetchCitiesByIds = createAsyncThunk(
  'cities/fetchCitiesData',
  async (ids: number[], thunkAPI) => {
    try {
      const response = await citiesService.getDataByIds(ids)
      return response
    } catch (error) {
      if (!error.response) {
        throw error
      }

      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const refreshCityData = createAsyncThunk(
  'cities/refreshCityData',
  async (id: number, thunkAPI) => {
    try {
      const response = await citiesService.getDataById(id)
      return response
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    cityAdded: (state, action) => {
      state.list.push(action.payload)
    },
    cityRemoved: (state, action) => {
      state.list = state.list.filter((city) => {
        return city.id !== action.payload
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCitiesByIds.fulfilled, (state, action) => {
      state.list = action.payload.list
    })
    builder.addCase(refreshCityData.fulfilled, (state, action) => {
      state.list[
        state.list.findIndex((city) => city.id === action.payload.id)
      ] = action.payload
    })
  },
})

export const { cityAdded, cityRemoved } = citiesSlice.actions
export default citiesSlice.reducer
