import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './components/auth/AuthContext.jsx'
import { ShoppingCartProvider } from './service/ShoppingCartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShoppingCartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ShoppingCartProvider>
  </StrictMode>,
)
