import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContextProvider from './utility/contexts/ContextProvider.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </StrictMode>,
)
