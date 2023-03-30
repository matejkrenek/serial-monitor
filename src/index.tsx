import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './styles/index.css'

declare global {
    interface Window {
        monitor: any
    }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
