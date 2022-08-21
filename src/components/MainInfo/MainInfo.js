import { Box, Divider } from '@mui/material'
import HourlyTemp from '../HourlyTemp/HourlyTemp'
import MainInfoBody from './MainInfoBody/MainInfoBody'
import MainInfoHead from './MainINfoHead/MainInfoHead'
import { DateTime } from 'luxon'

const MainInfo = (props) => {
  return (
    <Box
      sx={{
        color: '#fff',
        p: 6,
        ml: -4,
        height: 'calc(100vh - 64px)',
        background:
          'linear-gradient(170deg, rgb(81 101 130) 0%, rgb(40 73 115) 30%, rgb(40 73 115) 60%, rgba(24,58,126,1) 100%)',
      }}
    >
      {/* More info */}
      <MainInfoHead
        name={props.name}
        country={props.country}
        timezone={props.timezone}
        temp={props.current.temp}
        weather={[...props.current.weather]}
      />

      <Divider sx={{ background: '#486181', height: '2px', mb: 6 }} />

      <Box sx={{ mb: 6 }}>
        <HourlyTemp
          data={props.hourly}
        />
      </Box>

      <Divider sx={{ background: '#486181', height: '2px', mb: 6 }} />

      <MainInfoBody
        sunrise={props.current.sunrise}
        sunset={props.current.sunset}
        timezone={props.timezone}
      />
    </Box>
  )
}

export default MainInfo
