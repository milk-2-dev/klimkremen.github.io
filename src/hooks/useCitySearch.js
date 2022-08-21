import React, { useEffect, useState } from 'react'
import citiesService from '../services/cities'

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

const useCitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearcResults] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await citiesService.findData(searchQuery)
      setSearcResults(response.list)
      // setSearcResults(test.list)
    }

    if (searchQuery !== '' && searchQuery.length >= 2) {
      fetchData()
    }
  }, [searchQuery])

  return { searchResults, setSearcResults, setSearchQuery }
}

export default useCitySearch
