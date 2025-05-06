import AppHeader from '../common/AppHeader.tsx'
import AppFooter from '../common/AppFooter.tsx'
import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PageLayout = () => {
    // フッターの表示切り替えを制御
    const location = useLocation();
    const [ shouldShowFooter, setShouldShowFooter ] = useState(false);
    // 表示したくないページのパスを定義
    const hideOnPaths = ['/room'];

    useEffect(() => {
        const show: boolean = !hideOnPaths.some(path => location.pathname.includes(path));
        setShouldShowFooter(show);
        console.log('shouldShowFooter:', show);
    }, [location.pathname]); // ページパスが変わるたびに実行される
    return (
        <>
            <AppHeader />
            <main style={{
                minHeight: '80vh',
                marginLeft:'auto',
                marginRight:'auto',
                paddingTop:'20px',
                paddingBottom:'30px',
                width:'80%'
                }}
            >
                <Outlet />
            </main>
            {shouldShowFooter && <AppFooter />}
        </>
    )
}

export default PageLayout;