import React from 'react';
import { Layout } from 'antd';
import { Text } from '../../atoms';

const { Footer: AntdFooter } = Layout;

export interface FooterLink {
    label: string;
    url: string;
    external?: boolean;
}

export interface FooterProps {
    /** コピーライトテキスト */
    copyrightText?: string;
    /** 年 */
    year?: number;
    /** 会社名・組織名 */
    organizationName?: string;
    /** フッターリンク */
    links?: FooterLink[];
    /** 背景色 */
    backgroundColor?: string;
    /** テキスト色 */
    textColor?: string;
    /** リンクの色 */
    linkColor?: string;
    /** 高さ */
    height?: string | number;
    /** 中央寄せにするか */
    centered?: boolean;
    /** アプリバージョン */
    version?: string;
    /** バージョン表示するか */
    showVersion?: boolean;
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** 子要素 */
    children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({
    copyrightText,
    year = new Date().getFullYear(),
    organizationName = "a-nya developer alliance",
    links = [],
    backgroundColor = "#f4b3bb",
    textColor = "white",
    linkColor = "#ffffffff",
    height = "10vh",
    centered = true,
    version = "v1.0.0",
    showVersion = true,
    style,
    children,
}) => {
    const footerStyle: React.CSSProperties = {
        height,
        backgroundColor,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '16px 24px',
        position: 'relative', // バージョン表示のために追加
        ...style,
    };

    const contentStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
    };

    const linksStyle: React.CSSProperties = {
        display: 'flex',
        gap: '16px',
        justifyContent: centered ? 'center' : 'flex-start',
        marginBottom: links.length > 0 ? '8px' : '0',
        flexWrap: 'wrap',
    };

    const linkStyle: React.CSSProperties = {
        color: linkColor,
        textDecoration: 'none',
        fontSize: '14px',
        transition: 'opacity 0.3s ease',
    };

    // バージョン表示のスタイル
    const versionStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '8px',
        right: '16px',
        fontSize: '12px',
        color: textColor,
        opacity: 0.7,
        fontFamily: 'monospace',
    };

    const defaultCopyright = copyrightText || `© ${year} ${organizationName}.`;

    return (
        <AntdFooter style={footerStyle}>
            <div style={contentStyle}>
                {children ? (
                    children
                ) : (
                    <>
                        {links.length > 0 && (
                            <div style={linksStyle}>
                                {links.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target={link.external ? "_blank" : "_self"}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                        style={linkStyle}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '0.7';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                        
                        <Text 
                            variant="body2" 
                            color={textColor}
                            align={centered ? 'center' : 'left'}
                        >
                            {defaultCopyright}
                        </Text>
                    </>
                )}
            </div>
            
            {/* バージョン表示 */}
            {showVersion && (
                <div style={versionStyle}>
                    {version}
                </div>
            )}
        </AntdFooter>
    );
};

export default Footer;