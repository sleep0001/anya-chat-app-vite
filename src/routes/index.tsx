// src/routes/index.tsx
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'
// import PageLayout from '../components/layout/PageLayout.tsx'
import { Layout } from 'antd';
// import ChatRoom from '../components/layout/ChatRoom.tsx';
// import Lobby from '../components/layout/Lobby.tsx';

const PageLayout = lazy(() => import('../components/layout/PageLayout.tsx'));
const Lobby = lazy(() => import('../components/layout/Lobby.tsx'));
const ChatRoom = lazy(() => import('../components/layout/ChatRoom.tsx'));

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout style={{ minHeight: '100vh' }}>
                <Routes>
                    <Route path='/' element={<PageLayout />}>
                        <Route index element={<Lobby />} />
                        <Route path='/room/:roomId' element={<ChatRoom />} />
                    </Route>
                </Routes>
            </Layout>
        </Suspense>
    )
}