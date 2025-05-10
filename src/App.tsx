import { useEffect } from "react";
import AppRoutes from "./routes/index.tsx"
import { useContexts } from "./contexts/contexts"
import { BrowserRouter } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid';

function App() {
    const {
        setUserId
    } = useContexts();
    useEffect(() => {
        // 初回アクセス時にuserIdをlocalStorageに保存
        const localStorageUserId = localStorage.getItem("userId");
        if (!localStorageUserId) {
            const userId = uuidV4();
            localStorage.setItem("userId", userId);
            setUserId(userId);
        } else {
            setUserId(localStorageUserId);
        }
    }, []);
    return (
        <BrowserRouter>
                <AppRoutes />
        </BrowserRouter>
    )
}

export default App
