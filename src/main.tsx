import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './components/CartProvider/CartProvider.tsx'
import GAListener from "./GAListener";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GAListener>
        <CartProvider>
          <App />
        </CartProvider>
      </GAListener>
    </BrowserRouter>
  </StrictMode>,
)
