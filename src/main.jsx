import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import favicon from './assets/logoDesenho.png'
import './styles/index.css'

document.querySelector('link[rel="icon"]').href = favicon

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
