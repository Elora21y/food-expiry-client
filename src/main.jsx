import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router.jsx'
import AuthProvider from './context/AuthProvider.jsx'

import { motion } from "framer-motion";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>

    </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)

