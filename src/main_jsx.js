import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// To jest punkt wejścia do naszej aplikacji React
// Tutaj mówimy React żeby "zamontował" naszą aplikację w elemencie #root z index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)