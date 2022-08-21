import { SvgIcon } from '@mui/material'
import { Box } from '@mui/system'
import Typography from '../typography/Typography'

const Card = ({ icon, label, value, units }) => {
  return (
    <Box
      className='card-custom'
      component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 4,
      }}
    >
      <Box sx={{ mr: 4 }} className='card-icon'>
        <SvgIcon component={icon} sx={{ width: '50px', height: '50px' }} />
      </Box>
      <div>
        <Typography
          className='card-label'
          variant='label'
          component='p'
          sx={{ mb: 2 }}
        >
          {label}
        </Typography>
        <Typography className='card-value' variant='subtitle1' component='span'>
          {`${value} `}
        </Typography>
        <Typography className='card-units' variant='h5' component='span'>
          {units}
        </Typography>
      </div>
    </Box>
  )
}

export default Card
