// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout.tsx'
import { Layout } from 'antd';
import ChatRoom from '../components/layout/ChatRoom.tsx';
import Lobby from '../components/layout/Lobby.tsx';

export default function AppRoutes() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Routes>
                <Route path='/' element={<PageLayout />}>
                    <Route index element={<Lobby />} />
                    <Route path='/room/:roomId' element={<ChatRoom />} />
                </Route>
            </Routes>
        </Layout>
    )
}