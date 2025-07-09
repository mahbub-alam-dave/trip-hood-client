import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContextProvider from './utility/contexts/ContextProvider.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
