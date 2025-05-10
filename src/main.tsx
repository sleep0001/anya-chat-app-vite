import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContextsProvider } from './contexts/contexts.tsx' 
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContextsProvider>
            <App />
        </ContextsProvider>
    </StrictMode>
)