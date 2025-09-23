// src/components/templates/PageLayout/PageLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation, Footer, NavigationItem, FooterLink } from '../../organisms';

export interface PageLayoutProps {
    /** ナビゲーション設定 */
    navigationItems?: NavigationItem[];
    /** フッター設定 */
    footerLinks?: FooterLink[];
    /** フッターを非表示にするパス */
    hideFooterOnPaths?: string[];
    /** 背景画像URL */
    backgroundImage?: string;
    /** 背景色 */
    backgroundColor?: string;
    /** テーマカラー */
    themeColor?: string;
    /** コンテンツの最大幅 */
    maxContentWidth?: string;
    /** コンテンツの背景色 */
    contentBackgroundColor?: string;
    /** コンテンツのパディング */
    contentPadding?: string;
    /** カスタムスタイル */
    style?: React.CSSProperties;
}

const PageLayout: React.FC<PageLayoutProps> = ({
    navigationItems = [
        { key: '1', label: 'Home', path: '/', },
        { key: '2', label: 'DMP Ranking', path: '/rank', },
        { key: '3', label: 'アニャマス県ランキング', path: '/dm', },
        { key: '4', label: '樹海CS', path: '/seatrees', },
        // { key: '5', label: 'ワンピ検索', path: '/card', },
    ],
    footerLinks = [],
    hideFooterOnPaths = ['/room'],
    backgroundImage = "/assets/background_image.png",
    backgroundColor = '#f3e4e7',
    themeColor = '#f4b3bb',
    maxContentWidth = '95%',
    contentBackgroundColor = 'rgba(243, 228, 231, 0.85)',
    contentPadding = '20px 0 30px',
    style,
}) => {
    const location = useLocation();
    const [shouldShowFooter, setShouldShowFooter] = useState(true);

    useEffect(() => {
        const show = !hideFooterOnPaths.some(path => location.pathname.includes(path));
        setShouldShowFooter(show);
    }, [location.pathname, hideFooterOnPaths]);

    const layoutStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        backgroundRepeat: "repeat",
        backgroundColor,
        margin: 0, // 追加：外側のマージンをリセット
        padding: 0, // 追加：外側のパディングをリセット
        ...style,
    };

    // 動的スタイルIDを生成
    const styleId = 'page-layout-responsive-styles';

    // レスポンシブスタイルを動的に追加
    useEffect(() => {
        // 既存のスタイルタグを削除
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }

        // 新しいスタイルタグを作成
        const styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.innerHTML = `
            /* レイアウト全体のリセット */
            .ant-layout {
                background: transparent !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            /* ヘッダーのスタイル調整 */
            .ant-layout-header {
                margin: 0 !important;
                padding: 0 15px !important;
                line-height: normal !important;
                height: auto !important;
            }
            
            /* メインコンテンツのスタイル */
            .page-layout-main {
                flex: 1;
                background-color: ${contentBackgroundColor};
                width: ${maxContentWidth};
                margin: 0 auto;
                padding: ${contentPadding};
                margin-top: 0 !important; /* 追加：上部マージンを明示的にリセット */
            }
            
            /* フッターのスタイル調整 */
            .ant-layout-footer {
                margin: 0 !important;
                padding: 16px 24px !important;
            }
            
            @media screen and (max-width: 480px) {
                .page-layout-main {
                    width: 95% !important;
                    padding: 10px 0 20px !important;
                    margin-top: 0 !important;
                }
            }
        `;
        document.head.appendChild(styleTag);

        // クリーンアップ関数
        return () => {
            const styleElement = document.getElementById(styleId);
            if (styleElement) {
                styleElement.remove();
            }
        };
    }, [contentBackgroundColor, maxContentWidth, contentPadding]);

    return (
        <div style={layoutStyle}>
            {/* ヘッダー - Navigationコンポーネントを直接使用 */}
            <Navigation
                logoText="NYA"
                logoPath="/"
                items={navigationItems}
                themeColor={themeColor}
                textColor="#402b28"
                hoverTextColor="#402b28"
                height="auto" // 高さを自動に変更
                style={{ margin: 0, padding: 0 }} // 明示的にマージン・パディングをリセット
            />

            {/* メインコンテンツ */}
            <main className="page-layout-main">
                <Outlet />
            </main>

            {/* フッター */}
            {shouldShowFooter && (
                <Footer
                    organizationName="a-nya developer alliance"
                    backgroundColor={themeColor}
                    textColor="#402B28"
                    version="v1.4.0"
                    links={footerLinks}
                    height="10vh"
                    style={{ margin: 0 }} // 明示的にマージンをリセット
                />
            )}
        </div>
    );
};

export default PageLayout;