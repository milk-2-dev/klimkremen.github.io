import { Box } from '@mui/system'
import Typography from '../typography/Typography'

const HourlyTemp = ({ data }) => {
  return (
    <div>
      <Typography variant='h5' sx={{ mb: 4 }}>
        Hourly temperature
      </Typography>
    <Box
      sx={{
        height: `130px`,
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '30px',
      }}
    >
      
      {data.map((item, index) => {
        return (
          <Box
            key={`hourly-${index}`}
            sx={{ position: 'relative', width: '100%' }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: `${item.temp}px`,
                left: 0,
                right: 0,
                minWidth: '50px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#263d66',
                borderBottom: '2px solid #8cb2fb',
              }}
            >
              {Math.floor(item.temp)}
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '-30px',
                left: 0,
                right: 0,
                fontSize: '14px',
                textAlign: 'center',
              }}
            >
              {item.title}
            </Box>
          </Box>
        )
      })}
    </Box>
    </div>
  )
}

export default HourlyTemp
