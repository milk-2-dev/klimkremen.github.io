import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CITIES } from '../../constants/cities'
import citiesService from '../../services/cities'
import localStorageService from '../../services/localStorage'
import { regionNames } from '../../utils/city'
import AirIcon from '@mui/icons-material/Air'
import SpeedIcon from '@mui/icons-material/Speed'
import GrainIcon from '@mui/icons-material/Grain'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import TodayOverview from '../../components/TodayOverview/TodayOverview'
import Card from '../../components/Card/Card'
import MainInfo from '../../components/MainInfo/MainInfo'
import { DateTime } from 'luxon'
import DailyTemp from '../../components/DailyTemp/DailyTemp'
import { useAppContext } from '../../context/AppContext'

const City = () => {
  const { setCanAddNewCity } = useAppContext()
  const [city, setCity] = useState(null)
  const [cityForecast, setCityForecast] = useState()
  const [mainInfo, setMainInfo] = useState({})
  const [hourlyTempData, setHourlyTempData] = useState([])
  const [dailyTempData, setDailyTempData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    setCanAddNewCity(false)
    const storedCities = localStorageService.getItem(CITIES)
    setCity(storedCities.find((city) => city.id === parseInt(id)))
  }, [])

  useEffect(() => {
    async function fetchCityForecast() {
      try {
        const response = await citiesService.getForecast(
          city.coord.lat,
          city.coord.lon
        )
        setCityForecast(response)
      } catch (error) {
        console.log(error.message)
      }
    }

    if (city) {
      fetchCityForecast()
    }
  }, [city])

  useEffect(() => {
    if (cityForecast) {
      setMainInfo({
        name: city.name,
        country: city && city.sys ? regionNames.of(city.sys.country) : '',
        timezone: cityForecast.timezone,
        timezone_offset: cityForecast.timezone_offset,
        current: { ...cityForecast.current },
      })
    }
  }, [cityForecast])

  useEffect(() => {
    if (cityForecast) {
      setHourlyTempData(
        cityForecast.hourly.slice(1, 6).map((hourData) => {
          return {
            title: DateTime.fromSeconds(hourData.dt)
              .setZone(cityForecast.timezone)
              .toFormat('hh:mm a'),
            temp: hourData.temp,
          }
        })
      )

      setDailyTempData(
        cityForecast.daily.slice(1, 6).map((dayData) => {
          return {
            title: DateTime.fromSeconds(dayData.dt)
              .setZone(cityForecast.timezone)
              .toFormat('ccc'),
            temp: dayData.temp,
            icon: dayData.weather[0].icon,
          }
        })
      )
    }
  }, [mainInfo])

  return (
    <Box>
      {cityForecast ? (
        <Grid container spacing={4} sx={{ mt: 0 }}>
          <Grid item xs={8}>
            <Box sx={{ pl: 4, pr: 4 }}>
              <TodayOverview>
                <Card
                  icon={AirIcon}
                  label='Wind Speed'
                  value={cityForecast.current.wind_speed}
                  units='m/sec'
                />
                <Card
                  icon={SpeedIcon}
                  label='Pressure'
                  value={cityForecast.current.pressure}
                  units='hpa'
                />
                <Card
                  icon={GrainIcon}
                  label='Humidit'
                  value={cityForecast.current.humidity}
                  units='%'
                />
                <Card
                  icon={WbSunnyIcon}
                  label='Uv Index'
                  value={cityForecast.current.uvi}
                  units=''
                />
              </TodayOverview>
            </Box>

            <Box sx={{ pl: 4, pr: 4 }}>
              <DailyTemp data={dailyTempData} />
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              mt: -4,
            }}
          >
            {mainInfo.name ? (
              <MainInfo {...mainInfo} hourly={hourlyTempData} />
            ) : null}
          </Grid>
        </Grid>
      ) : null}
    </Box>
  )
}

export default City
