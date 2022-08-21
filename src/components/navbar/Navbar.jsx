import React from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backdropFilter: 'blur(50px)',
  background: 'hsla(0,0%,100%,.7)',
  boxShadow: '0 5px 30px rgba(0,0,0,.05)',
}))

const Navbar = (props) => {
  return <AppBar elevation={0} {...props} />
}

export default Navbar
