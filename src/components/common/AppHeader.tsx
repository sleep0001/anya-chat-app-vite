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
                    theme="light"
                    mode="horizontal"
                    className='menu'
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                />
            </Header>
        </Layout>
    );
};

export default AppHeader;