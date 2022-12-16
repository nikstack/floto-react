import React, { useState } from 'react'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material'
import { ChildrenProps } from '../common/types'

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0096ff',
      light: '#69beff',
      dark: '#006eb9',
    },
    secondary: {
      main: '#607d8b',
      light: '#90a4ae',
      dark: '#455a64',
    },
    info: {
      main: '#0096ff',
      light: '#69beff',
      dark: '#006eb9',
    },
    background: {
      default: '#fafafa',
    },
  },
}


const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#0096ff',
      light: '#69beff',
      dark: '#006eb9',
    },
    secondary: {
      main: '#607d8b',
      light: '#90a4ae',
      dark: '#455a64',
    },
    info: {
      main: '#0096ff',
      light: '#69beff',
      dark: '#006eb9',
    },
    background: {
      default: '#303030',
    },
  },
}

const Theme = ({ children }: ChildrenProps) => {
  const darkThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)')
  const getMatchingTheme = (matches: boolean) => matches ? 'dark' : 'light'

  const allThemeOptions = {
    light: lightThemeOptions,
    dark: darkThemeOptions,
  }

  const [themeOptionsKey, setThemeOptionsKey] = useState<'light' | 'dark'>(getMatchingTheme(darkThemeMatcher.matches))

  const theme = createTheme(allThemeOptions[themeOptionsKey])

  const color = themeOptionsKey === 'light' ? '#fafafa' : '#303030'
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', color)

  const body = document.querySelector('body')
  if (body) {
    body.style.background = color
  }


  darkThemeMatcher.addEventListener('change', e => {
    setThemeOptionsKey(getMatchingTheme(e.matches))
  })

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>

  )
}

export default Theme
