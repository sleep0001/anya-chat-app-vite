import { useEffect } from "react";
import AppRoutes from "./routes/index.tsx"
import { ContextsProvider } from "./contexts/contexts"
import { BrowserRouter } from 'react-router-dom'

function App() {
    useEffect(() => {
        // 初回アクセス時にuserIdをlocalStorageに保存
        if (!localStorage.getItem("userId")) {
            localStorage.setItem("userId", crypto.randomUUID());
        }
    }, []);
    return (
        <BrowserRouter>
            <ContextsProvider>
                <AppRoutes />
            </ContextsProvider>
        </BrowserRouter>
    )
}

export default App
