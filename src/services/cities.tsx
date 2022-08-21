import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`

const DEFAULT_PARAMS = {
  type: 'like',
  sort: 'population',
  cnt: '30',
  units: 'metric',
  appid: process.env.REACT_APP_API_KEY,
}

const buildApiUrl = (operation: any, params = {}) =>
  buildUrl(`${API_URL}/${operation}`, { ...params, ...DEFAULT_PARAMS })

const buildUrl = (url: any, params: any) => `${url}?${paramsToUrl(params)}`

const paramsToUrl = (params = {}) =>
  Object.entries(params)
    .map((param) => paramToUrl(...param))
    .join('&')

const paramToUrl = (name: any, value: any) => name + (value ? '=' + value : '')

const findData = async (query: string = '') => {
  try {
    let response = await axios.get(buildApiUrl('find', { q: query }))

    return await response.data
  } catch (error) {
    return { error: true, msg: error }
  }
}

const getDataByIds = async (ids: number[]) => {
  try {
    let response = await axios.get(buildApiUrl('group', { id: ids.join(',') }))

    return await response.data
  } catch (error) {
    return { error: true, msg: error }
  }
}

const getDataById = async (id: number) => {
  try {
    let response = await axios.get(buildApiUrl('weather', { id: id }))

    return await response.data
  } catch (error) {
    return { error: true, msg: error }
  }
}

const getForecast = async (lat: any, lon: any) => {
  try {
    let response = await axios.get(
      buildApiUrl('onecall', {
        lat: lat,
        lon: lon,
        exclude: 'minutely,alerts',
      })
    )

    return await response.data
  } catch (error) {
    return { error: true, msg: error }
  }
}

const citiesService = {
  findData,
  getDataByIds,
  getDataById,
  getForecast,
}

export default citiesService
