import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/libre-franklin/400.css'
import '@fontsource/libre-franklin/700.css'
import '@fontsource/libre-franklin/900.css'
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
