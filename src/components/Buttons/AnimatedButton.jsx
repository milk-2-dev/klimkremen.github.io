import React from 'react'
import { Box, Button } from '@mui/material'
import theme from '../../theme'

const AnimatedButton = (props) => {
  const animatedButtonSX = {
    '.animated-btn__title': {
      display: 'block',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 2,
      span: {
        color: props.color === 'error' ? '#fff' : '#000',
        display: 'block',
        transformOrigin: 'left top',
        transition: 'color .2s,transform .4s',
        '&:after': {
          content: `"${props.children}"`,
          display: 'block',
          left: 0,
          position: 'absolute',
          top: '150%',
          transform: 'skewY(7deg)',
          transformOrigin: 'left top',
          transition: 'transform .4s',
        },
      },
    },
    '.animated-btn__ripple': {
      borderRadius: 'inherit',
      bottom: 0,
      display: 'block',
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
      transform: 'translateZ(0)',
      zIndex: 1,
      span: {
        background: '#df2026',
        borderRadius: '50%',
        display: 'block',
        height: '100%',
        transform: 'translateY(100%)',
        transition:
          'transform .5s cubic-bezier(.4,0,0,1),border-radius .5s cubic-bezier(.4,0,0,1),-webkit-transform .5s cubic-bezier(.4,0,0,1)',
        width: '100%',
      },
    },
    '&:after': {
      background: theme.palette[props.color].main,
      border: 0,
      borderRadius: 'inherit',
      bottom: 0,
      content: `""`,
      left: -'0',
      position: 'absolute',
      right: 0,
      top: 0,
      transition: 'border-color .2s',
    },
    '&:hover': {
      '.animated-btn__title': {
        span: {
          color: props.color === 'error' ? '#fff' : '#000',
          transform: 'translateY(-150%) skewY(-7deg)',
          after: {
            transform: 'skewY(7deg)',
          },
        },
      },
      '.animated-btn__ripple': {
        span: {
          animation: 'ripple-in .5s cubic-bezier(.4,0,0,1)',
          borderRadius: 0,
          transform: 'translateY(0)',
          transitionDuration: '0s,0s',
        },
      },
    },
  }
  return (
    <Button sx={animatedButtonSX} {...props}>
      <Box component='span' className='animated-btn__title'>
        <Box component='span'>{props.children}</Box>
      </Box>
      <Box component='span' className='animated-btn__ripple'>
        <Box component='span'></Box>
      </Box>
    </Button>
  )
}

export default AnimatedButton
