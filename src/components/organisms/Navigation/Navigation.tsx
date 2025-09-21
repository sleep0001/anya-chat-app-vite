// src/components/organisms/Navigation/Navigation.tsx
import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Text } from '../../atoms';

const { Header } = Layout;

export interface NavigationItem {
    key: string;
    label: string;
    path: string;
    children?: NavigationItem[];
}

export interface NavigationProps {
    /** ロゴテキスト */
    logoText?: string;
    /** ロゴのリンク先 */
    logoPath?: string;
    /** ナビゲーションアイテム */
    items: NavigationItem[];
    /** テーマカラー */
    themeColor?: string;
    /** テキストカラー */
    textColor?: string;
    /** ホバー時のテキストカラー */
    hoverTextColor?: string;
    /** 高さ */
    height?: string | number;
    /** 背景色 */
    backgroundColor?: string;
    /** カスタムスタイル */
    style?: React.CSSProperties;
}

const Navigation: React.FC<NavigationProps> = ({
    logoText = "NYA",
    logoPath = "/",
    items,
    themeColor = "#f4b3bb",
    textColor = "#402b28",
    hoverTextColor = "#402b28",
    height = "auto", // デフォルトを"auto"に変更
    backgroundColor,
    style,
}) => {
    const location = useLocation();

    // メニューアイテムの変換
    const convertToMenuItems = (items: NavigationItem[]): MenuProps['items'] => {
        return items.map(item => ({
            key: item.key,
            label: item.children ? item.label : <Link to={item.path}>{item.label}</Link>,
            children: item.children ? convertToMenuItems(item.children) : undefined,
        }));
    };

    // 現在のパスに基づいてデフォルトの選択キーを決定
    const getSelectedKeys = () => {
        const findSelectedKey = (items: NavigationItem[]): string[] => {
            for (const item of items) {
                if (item.path === location.pathname) {
                    return [item.key];
                }
                if (item.children) {
                    const childKey = findSelectedKey(item.children);
                    if (childKey.length > 0) {
                        return childKey;
                    }
                }
            }
            return [];
        };
        return findSelectedKey(items);
    };

    const headerStyle: React.CSSProperties = {
        height: height === "auto" ? "auto" : height,
        minHeight: "64px", // 最小高さを設定
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 15px',
        backgroundColor: backgroundColor || themeColor,
        margin: 0, // 明示的にマージンをリセット
        lineHeight: 'normal', // line-heightをnormalに設定
        ...style,
    };

    const logoStyle: React.CSSProperties = {
        color: textColor,
        fontSize: '22px',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
    };

    const menuStyle: React.CSSProperties = {
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '6px',
        overflow: 'hidden',
        height: 'auto', // メニューの高さも自動に
        lineHeight: 'normal', // line-heightをnormalに設定
    };

    // 動的スタイルの注入
    React.useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .navigation-menu.ant-menu-horizontal > .ant-menu-item,
            .navigation-menu.ant-menu-horizontal > .ant-menu-submenu {
                color: ${textColor} !important;
                line-height: normal !important;
                height: auto !important;
                padding: 12px 16px !important;
            }
            
            .navigation-menu.ant-menu-horizontal > .ant-menu-item:hover,
            .navigation-menu.ant-menu-horizontal > .ant-menu-submenu:hover,
            .navigation-menu.ant-menu-horizontal > .ant-menu-item-active,
            .navigation-menu.ant-menu-horizontal > .ant-menu-item-selected,
            .navigation-menu.ant-menu-horizontal > .ant-menu-submenu-active,
            .navigation-menu.ant-menu-horizontal > .ant-menu-submenu-selected {
                color: ${hoverTextColor} !important;
                background-color: transparent !important;
            }
            
            .navigation-menu.ant-menu-horizontal > .ant-menu-item::after,
            .navigation-menu.ant-menu-horizontal > .ant-menu-submenu::after {
                border-bottom: none !important;
                transform: none !important;
            }
            
            .navigation-menu.ant-menu-horizontal {
                background-color: transparent !important;
                border-bottom: none !important;
                line-height: normal !important;
            }
            
            /* Antdの Layout.Header のスタイルをリセット */
            .ant-layout-header.navigation-header {
                margin: 0 !important;
                padding: 0 15px !important;
                line-height: normal !important;
                height: auto !important;
                min-height: 64px !important;
            }
        `;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, [textColor, hoverTextColor]);

    return (
        <Header className="navigation-header" style={headerStyle}>
            <div>
                <Link 
                    to={logoPath} 
                    style={logoStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = hoverTextColor;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = textColor;
                    }}
                >
                    <Text variant="h5" weight="bold" color={textColor}>
                        {logoText}
                    </Text>
                </Link>
            </div>
            
            <Menu
                theme="light"
                mode="horizontal"
                className="navigation-menu"
                selectedKeys={getSelectedKeys()}
                items={convertToMenuItems(items)}
                style={menuStyle}
            />
        </Header>
    );
};

export default Navigation;