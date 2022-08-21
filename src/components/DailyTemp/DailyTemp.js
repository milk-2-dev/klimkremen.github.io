import { Box } from '@mui/material'
import React from 'react'
import Typography from '../typography/Typography'
import './DailyTemp.scss'

const DailyTempItem = ({ title, icon, temp }) => {
  return (
    <div className='daily-temp-item'>
      <p className='daily-temp-day'>{title}</p>
      <div className='daily-temp-icon'>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          width='70'
          height='70'
          alt='Weather icon'
        />
      </div>
      <div className='daily-temp-temp'>
        <span className='day-temp'>{`${Math.floor(temp.day)} °`}</span>
        <span className='night-temp'>{`${Math.floor(temp.night)} °`}</span>
      </div>
    </div>
  )
}

const DailyTemp = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        <div className='daily-temp'>
          <Typography variant='h5' sx={{ mb: 4 }}>
            Daily temperature
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {data.map((item, index) => {
              return <DailyTempItem key={`dailyItem-${index}`} {...item} />
            })}
          </Box>
        </div>
      ) : null}
    </div>
  )
}

export default DailyTemp
