import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

/**
 * @file Entry Point - Головна точка входу в додаток.
 * Виконує ініціалізацію React Root через createRoot, обгортає додаток у StrictMode та BrowserRouter.
 *
 * @name EntryPoint
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
  </StrictMode>,
)
