import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n.js'
import App from './App.jsx'
import { ThemeProvider } from './context/themeContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
