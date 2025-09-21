// src/routes/index.tsx
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd';
import PageLayout from '../components/templates/PageLayout/PageLayout';
import { 
    HomePage, 
    CardSearchPage, 
    RankingLatestPage,
    SeaTreesPage,
    DmpRankingPage
} from '../components';
import PreviewToolRelease from '../previewToolRelease/previewToolRelease.tsx';
import ErrorBoundary from '../components/ErrorBoundary.tsx';
import SeaTreeEventAdmin from '../components/pages/SeaTreeEventAdmin.tsx';

const ChatRoomPage = lazy(() => import('../components/pages/ChatRoomPage/ChatRoomPage'));

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout style={{ minHeight: '100vh' }}>
                <Routes>
                    <Route path='/' element={<PageLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path='/room/:roomId' element={<ChatRoomPage />} />
                        <Route path='/card' element={<CardSearchPage />} />
                        <Route path='/toolInfo' element={<PreviewToolRelease />} />
                        <Route path='/dm' element={<DmpRankingPage />} />
                        <Route path='/rank' element={
                            <ErrorBoundary>
                                <RankingLatestPage />
                            </ErrorBoundary>
                        } />
                        <Route path='/seatrees' element={<SeaTreesPage />} />
                        <Route path='/seatrees/admin' element={<SeaTreeEventAdmin />} />
                    </Route>
                </Routes>
            </Layout>
        </Suspense>
    )
}