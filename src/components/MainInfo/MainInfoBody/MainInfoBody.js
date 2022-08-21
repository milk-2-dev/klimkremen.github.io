import React from 'react'
import Card from '../../Card/Card'
import Typography from '../../typography/Typography'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import { getTime } from '../../../utils/time'
import './MainInfoBody.scss'

const MainInfoBody = ({ sunrise, sunset, timeZone }) => {
  return (
    <div className='mainInfo-body'>
      <Typography variant='h5' sx={{ mb: 4 }}>
        Sunrise & Sunset
      </Typography>
      <Card
        icon={WbSunnyIcon}
        label='Sunrise'
        value={getTime(new Date(sunrise), timeZone)}
        units=''
      />
      <Card
        icon={WbTwilightIcon}
        label='Sunset'
        value={getTime(new Date(sunset), timeZone)}
        units=''
      />
    </div>
  )
}

export default MainInfoBody
