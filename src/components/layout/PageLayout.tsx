import AppHeader from '../common/AppHeader.tsx'
import AppFooter from '../common/AppFooter.tsx'
import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './PageLayout.css';

const PageLayout = () => {
    // フッターの表示切り替えを制御
    const location = useLocation();
    const [shouldShowFooter, setShouldShowFooter] = useState(false);
    // 表示したくないページのパスを定義
    const hideOnPaths = ['/room'];

    useEffect(() => {
        const show: boolean = !hideOnPaths.some(path => location.pathname.includes(path));
        setShouldShowFooter(show);
        console.log('shouldShowFooter:', show);
    }, [location.pathname]); // ページパスが変わるたびに実行される
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundImage: "url('/assets/background_image.png')",
                backgroundRepeat: "repeat",
                backgroundColor: '#f3e4e7',
            }}
        >
            <div>
                <AppHeader />
            </div>

            <main className="ranking-container">
                <Outlet />
            </main>

            <footer>
                {shouldShowFooter && <AppFooter />}
            </footer>
        </div>


    )
}

export default PageLayout;