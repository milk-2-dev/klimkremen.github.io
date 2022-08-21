import React, { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAppContext } from '../context/AppContext'
import { Box, Link, Toolbar, Backdrop, CircularProgress } from '@mui/material'
import Navbar from '../components/navbar/Navbar'
import AnimatedButton from '../components/Buttons/AnimatedButton'

type MainLayoutProps = {
  children?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isLoading, canAddNewCity, setShowSearch } = useAppContext()

  return (
    <div className='App'>
      <Navbar position='sticky'>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'block',
            }}
          >
            <Link href='/'>
              <img src={logo} alt='' />
            </Link>
          </Box>

          {!!canAddNewCity ? (
            <AnimatedButton
              onClick={() => setShowSearch(true)}
              color='error'
              variant='contained'
            >
              add new city
            </AnimatedButton>
          ) : null}
        </Toolbar>
      </Navbar>

      <main>{children ? children : <Outlet />}</main>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default MainLayout
