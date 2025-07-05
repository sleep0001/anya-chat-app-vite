import React from 'react';
import { Layout } from 'antd';
import './AppFooter.css';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
    return (
        <Footer className={"footer_class"}>
            <div className={"footer_text"}>
                <p>© 2025 a-nya developer alliance.</p>
            </div>
        </Footer>
    );
};

export default AppFooter;