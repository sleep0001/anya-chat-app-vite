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
    DmpRankingPage,
    ErrorBoundary,
    SeaTreeEventAdmin,
    PreviewToolRelease,
    PlayerPointsChart,
    ReleaseNotes
} from '../components';

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
                        <Route path='/chart' element={<PlayerPointsChart />} />
                        <Route path='/release' element={<ReleaseNotes />} />
                    </Route>
                </Routes>
            </Layout>
        </Suspense>
    )
}