import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import './styles/site.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App lang={document.documentElement.lang === 'en' ? 'en' : 'de'} />
  </StrictMode>,
)
