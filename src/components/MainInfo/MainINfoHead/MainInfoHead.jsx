import { useEffect, useMemo, useState } from 'react'
import { getTime } from '../../../utils/time'
import Typography from '../../typography/Typography'
import './MainInfoHead.scss'

const MainInfoHead = ({ name, country, timezone, temp, weather }) => {
  const [time, setTime] = useState('')
  const [loop, setLoop] = useState()
  const [dateState, setDateState] = useState(new Date()) //getRegionDate(timezone)

  useEffect(() => {
    setLoop(setInterval(() => setDateState(new Date()), 15000))
    //getRegionDate(timezone)
    return function cleanup() {
      clearInterval(loop)
    }
  }, [])

  useEffect(() => {
    setTime(getTime(dateState, timezone))
  }, [dateState])

  return (
    <div className='mainInfo-head'>
      <div className='city-info'>
        <div className='city-name'>
          <Typography variant='subtitle1' component='p'>
            {name}
          </Typography>
          <Typography variant='body2' component='span'>
            {country}
          </Typography>
        </div>
        <div className='city-time'>
          <Typography variant='subtitle1' component='p'>
            {time}
          </Typography>
        </div>
      </div>
      <div className='city-temp'>
        <div className='city-temp-icon'>
          {weather.map((item) => (
            <img
              key={item.id}
              src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
              width='70'
              height='70'
              alt='Weather icon'
            />
          ))}
        </div>
        <div className='city-temp-info'>
          <Typography
            variant='h2'
            component='span'
            sx={{ position: 'relative', pr: '25px', color: '#fff' }}
          >
            {Math.round(temp)}
            <Typography
              variant='h5'
              component='p'
              sx={{ position: 'absolute', top: 0, right: 0 }}
            >
              °C
            </Typography>
          </Typography>

          <Typography variant='body1' component='span' sx={{ color: '#fff' }}>
            {weather.map((item) => item.description).join(', ')}
          </Typography>
        </div>
      </div>
      <div className='city-sunset'></div>
    </div>
  )
}

export default MainInfoHead
