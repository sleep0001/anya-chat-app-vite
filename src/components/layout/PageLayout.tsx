import AppHeader from '../common/AppHeader.tsx'
import AppFooter from '../common/AppFooter.tsx'
import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

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

            <main
                style={{
                    backgroundColor: 'rgba(243, 228, 231, 0.85)',
                    width: '80%',
                    margin: '0 auto',
                    paddingTop: '20px',
                    paddingBottom: '30px',
                    flexGrow: 1, // ← ここがポイント
                }}
            >
                <Outlet />
            </main>

            <footer>
                {shouldShowFooter && <AppFooter />}
            </footer>
        </div>


    )
}

export default PageLayout;