import { useEffect } from "react";
import AppRoutes from "./routes/index.tsx"
import { ContextsProvider } from "./contexts/contexts"
import { BrowserRouter } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid';

function App() {
    useEffect(() => {
        // 初回アクセス時にuserIdをlocalStorageに保存
        if (!localStorage.getItem("userId")) {
            localStorage.setItem("userId", uuidV4());
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
