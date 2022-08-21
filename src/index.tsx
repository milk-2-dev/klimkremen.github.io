import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Provider } from 'react-redux'
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AppProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
