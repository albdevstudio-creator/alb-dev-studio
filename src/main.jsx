import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import brandLogo from './assets/alb.png'
import './styles/index.css'

document.querySelector('link[rel="icon"]').href = brandLogo

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
