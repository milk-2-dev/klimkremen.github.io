import React from 'react'
import { Box, List, ListItem, ListItemButton } from '@mui/material'
import Typography from '../typography/Typography'
import { regionNames } from '../../utils/city'

// let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

const WeatherListItem = ({ id, name, wind, main, weather, sys, onClick }) => {
  return (
    <ListItem disablePadding key={id} onClick={onClick}>
      <ListItemButton>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexShrink: 0,
            }}
          >
            <img
              src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              width='70'
              height='70'
              alt='Weather icon'
            />
            <Box
              component='div'
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                ml: 2,
                mr: 1,
              }}
            >
              <Typography
                variant='h2'
                component='span'
                sx={{ position: 'relative', pr: '25px' }}
              >
                {Math.round(main.temp)}
                <Typography
                  variant='h5'
                  component='span'
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  °C
                </Typography>
              </Typography>
            </Box>

            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ml: 2,
                p: 0,
                color: '#70757a',
                fontSize: '12px',
              }}
            >
              <ListItem disableGutters sx={{ p: 0 }}>
                <Typography
                  variant='body1'
                  component='span'
                  sx={{ color: '#000' }}
                >
                  {weather[0].description}
                </Typography>
              </ListItem>
              <ListItem disableGutters sx={{ p: 0 }}>
                Humidity: {`${main.humidity}%`}
              </ListItem>
              <ListItem disableGutters sx={{ p: 0 }}>
                Wind: {`${Math.floor(wind.speed)} meter/sec`}
              </ListItem>
            </List>
          </Box>
          <Box
            component='div'
            sx={{
              textAlign: 'right',
            }}
          >
            <Typography variant='subtitle1' component='p'>
              {name}
            </Typography>
            <Typography
              variant='body2'
              component='span'
              sx={{ color: '#70757a' }}
            >
              {/* {new Date().toDateString()} */}
              {regionNames.of(sys.country)}
            </Typography>
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
  )
}

export default WeatherListItem
