import { Box } from '@mui/system'
import React from 'react'
import Typography from '../typography/Typography'
import './TodayOverview.scss'

const TodayOverview = ({ children }) => {
  return (
    <div className='today-overview'>
      <Typography variant='h5' sx={{ mb: 4 }}>
        Today overview
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          margin: '0 -0.5rem',

          '>div': {
            width: 'calc(50% - 1rem)',
            mb: 4,
          },
        }}
      >
        {children}
      </Box>
    </div>
  )
}

export default TodayOverview
