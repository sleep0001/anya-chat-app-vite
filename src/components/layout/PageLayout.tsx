import AppHeader from './AppHeader.tsx'
import AppFooter from './AppFooter.tsx'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
    return (
        <>
            <AppHeader />
            <main style={{ minHeight: '80vh'}}>
                <Outlet />
            </main>
            <AppFooter />
        </>
    )
}

export default PageLayout;