import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import axiosConfig from './config/axiosConfig.ts'
axiosConfig();
ReactDOM.createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <App />
  </BrowserRouter>,

)
