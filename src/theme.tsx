import { createTheme, PaletteColorOptions } from '@mui/material/styles'
import { green, grey, red } from '@mui/material/colors'
import { ButtonPropsColorOverrides } from '@mui/material/Button'

declare module '@mui/material/styles' {
  interface CustomPalette {
    gray: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true
  }
}

const rawTheme = createTheme({
  palette: {
    primary: {
      light: '#333539',
      main: '#232323',
      dark: '#1e1e1f',
    },
    secondary: {
      light: '#fff5f8',
      main: '#ff3366',
      dark: '#e62958',
    },
    warning: {
      main: '#eeb44c',
      dark: '#dd991f',
    },
    error: {
      main: '#ed3e44',
      dark: '#df2026',
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700],
    },
    gray: {
      main: grey[500],
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 800,
  },
})

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  textTransform: 'uppercase',
}

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      fontWeight: rawTheme.typography.fontWeightBold,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontWeight: rawTheme.typography.fontWeightMedium,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.h2,
      textTransform: 'uppercase',
      fontSize: 30,
    },
    subtitle2: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
    small: {
      ...rawTheme.typography.body2,
      color: grey[500],
      fontSize: 12,
    },
    label: {
      fontWeight: rawTheme.typography.fontWeightRegular,
      color: grey[500],
      fontSize: 14,
    },
  },
}

export default theme
