import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/authContext.jsx'
import { DashboardContextProvider } from './contexts/dashboardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DashboardContextProvider>
        <App />
      </DashboardContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
