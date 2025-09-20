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
            key: 'sub2',
            label: 'More',
            children: [
                { key: '2', label: <Link to="/rank">DMP Ranking</Link> },
                { key: '3', label: <Link to="/dm">アニャマス県ランキング</Link> },
                { key: '4', label: <Link to="/seatrees">樹海CS</Link> },
                { key: '5', label: <Link to="/card">ワンピ検索</Link> }
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