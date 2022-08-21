import { Box, Button, Divider, List } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import Search from '../../components/Search/Search'
import WeatherListItem from '../../components/WeatherList/WeatherListItem'
import { CITIES } from '../../constants/cities'
import { useAppContext } from '../../context/AppContext'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import localStorageService, {
  localStorageItem,
} from '../../services/localStorage'
import {
  cityAdded,
  cityRemoved,
  fetchCitiesByIds,
  ICityListItem,
  refreshCityData,
} from '../../store/slices/citiesSlice'
import { useNavigate } from 'react-router-dom'

const savedCities: localStorageItem[] | null =
  localStorageService.getItem(CITIES)

const CityList = () => {
  const navigate = useNavigate()
  const cities = useAppSelector((state) => state.cities)
  const { setCanAddNewCity, showSearch, setShowSearch } = useAppContext()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setCanAddNewCity(true)

    if (savedCities && savedCities.length > 0) {
      dispatch(
        fetchCitiesByIds(savedCities.map((item: localStorageItem) => item.id))
      )
    }
  }, [])

  const handleClickAddNewCity = (item: ICityListItem) => {
    if (!cities.list.some((city) => city.id === item.id)) {
      setShowSearch(false)
      localStorageService.addItem(CITIES, {
        id: item.id,
        coord: { ...item.coord },
        name: item.name,
        sys: { ...item.sys },
      })
      dispatch(cityAdded(item))
    }
  }

  const handleClickDelete = (id: number) => {
    dispatch(cityRemoved(id))
    localStorageService.removeItem(CITIES, id)
  }

  const handleClickRefresh = (id: number) => {
    dispatch(refreshCityData(id))
  }
  const handleClickMore = (id: number) => {
    navigate(`/${id}`)
  }

  return (
    <Container maxWidth='md'>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {cities.list.length === 0 ? (
          <h1>No saved cities. Please add city</h1>
        ) : (
          <List aria-label='Search results'>
            {cities.list.map((item: any, index: any, array: any) => {
              return (
                <Box key={item.id}>
                  <WeatherListItem {...item} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      mb: 4,
                      button: {
                        mr: 4,
                        '&:last-child': {
                          mr: 0,
                        },
                      },
                    }}
                  >
                    <Button
                      onClick={() => handleClickDelete(item.id)}
                      color='gray'
                      size='small'
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleClickRefresh(item.id)}
                      color='gray'
                      size='small'
                    >
                      Reload
                    </Button>
                    <Button
                      onClick={() => handleClickMore(item.id)}
                      color='gray'
                      size='small'
                    >
                      More
                    </Button>
                  </Box>
                  {index !== array.length - 1 ? (
                    <Divider sx={{ mt: 4, mb: 4 }} />
                  ) : null}
                </Box>
              )
            })}
          </List>
        )}
      </Box>

      <Search
        open={showSearch}
        close={() => setShowSearch(false)}
        onClickResultItem={handleClickAddNewCity}
      />
    </Container>
  )
}

export default CityList
