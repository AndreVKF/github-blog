import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/Global'
import { router } from './router'

import 'react-loading-skeleton/dist/skeleton.css'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
