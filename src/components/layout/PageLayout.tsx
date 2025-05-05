import AppHeader from './AppHeader.tsx'
import AppFooter from './AppFooter.tsx'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
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
            <AppFooter />
        </>
    )
}

export default PageLayout;