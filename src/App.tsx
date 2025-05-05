import AppRoutes from "./routes/index.tsx"
import { ContextsProvider } from "./contexts/contexts"
import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <ContextsProvider>
                <AppRoutes />
            </ContextsProvider>
        </BrowserRouter>
    )
}

export default App
