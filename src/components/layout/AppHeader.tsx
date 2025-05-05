import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import './AppHeader.css';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const menuItems: MenuProps['items'] = [
        {
            key: '1',
            label: <Link to="/">Home</Link>,
        },
        {
            key: 'sub1',
            label: 'More',
            children: [
                { key: '2', label: <Link to="/logs">logs</Link> },
                { key: '3', label: <Link to="/v1_4_0">v1_4_0</Link> },
                { key: '4', label: <Link to="/v1_3_0">v1_3_0</Link> },
                { key: '5', label: <Link to="/v1_2_0">v1_2_0</Link> },
                { key: '6', label: <Link to="/v1_1_0">v1_1_0</Link> },
                { key: '7', label: <Link to="/v1_0_0">v1_0_0</Link> },
            ],
        },
    ];

    return (
        <Layout>
            <Header className={"header_class"}>
                <div className={"logo"}>
                    <Link to="/" className={"logo_text"}>NYA</Link>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                />
            </Header>
        </Layout>
    );
};

export default AppHeader;