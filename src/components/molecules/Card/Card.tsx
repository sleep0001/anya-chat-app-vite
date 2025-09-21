import React from 'react';
import { Text } from '../../atoms';

export interface CardProps {
    /** カードのタイトル */
    title?: string;
    /** カードの説明 */
    description?: string;
    /** 画像URL */
    imageUrl?: string;
    /** 画像の代替テキスト */
    imageAlt?: string;
    /** カードの子要素 */
    children?: React.ReactNode;
    /** ホバー効果 */
    hoverable?: boolean;
    /** クリック可能かどうか */
    clickable?: boolean;
    /** クリックハンドラー */
    onClick?: () => void;
    /** カードのサイズ */
    size?: 'small' | 'medium' | 'large';
    /** カードの幅 */
    width?: number | string;
    /** カードの高さ */
    height?: number | string;
    /** 角丸のサイズ */
    borderRadius?: number;
    /** 影の強さ */
    shadowLevel?: 'none' | 'small' | 'medium' | 'large';
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
    /** ローディング状態 */
    loading?: boolean;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
    imageAlt,
    children,
    hoverable = false,
    clickable = false,
    onClick,
    size = 'medium',
    width,
    height,
    borderRadius = 12,
    shadowLevel = 'medium',
    style,
    className,
    loading = false,
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // サイズ別スタイル
    const getSizeStyles = (size: string) => {
        const sizeMap = {
            small: { padding: '12px', minHeight: '120px' },
            medium: { padding: '16px', minHeight: '150px' },
            large: { padding: '24px', minHeight: '200px' },
        };
        return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
    };

    // 影のレベル
    const getShadowStyle = (level: string, hovered: boolean) => {
        const shadowMap = {
            none: '0 0 0 0 rgba(0, 0, 0, 0)',
            small: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            large: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        };
        
        const hoverShadowMap = {
            none: '0 0 0 0 rgba(0, 0, 0, 0)',
            small: '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
            medium: '0 10px 15px -3px rgba(0, 0, 0, 0.15)',
            large: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
        };
        
        return (hoverable && hovered) 
            ? hoverShadowMap[level as keyof typeof hoverShadowMap]
            : shadowMap[level as keyof typeof shadowMap];
    };

    const cardStyle: React.CSSProperties = {
        ...getSizeStyles(size),
        width,
        height,
        borderRadius,
        backgroundColor: 'white',
        border: '1px solid #f0f0f0',
        boxShadow: getShadowStyle(shadowLevel, isHovered),
        transition: 'all 0.3s ease',
        cursor: clickable ? 'pointer' : 'default',
        transform: (hoverable && isHovered) ? 'translateY(-2px)' : 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: 'auto',
        maxHeight: '200px',
        objectFit: 'cover',
        borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
        marginBottom: '12px',
    };

    const contentStyle: React.CSSProperties = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    };

    const loadingStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
    };

    const handleCardClick = () => {
        if (clickable && onClick) {
            onClick();
        }
    };

    return (
        <div
            className={`card ${className || ''}`}
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {loading ? (
                <div style={loadingStyle}>
                    <Text variant="body2" color="secondary">読み込み中...</Text>
                </div>
            ) : (
                <>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            style={imageStyle}
                        />
                    )}
                    
                    <div style={contentStyle}>
                        {title && (
                            <Text 
                                variant="h6" 
                                weight="semibold" 
                                style={{ marginBottom: '8px' }}
                            >
                                {title}
                            </Text>
                        )}
                        
                        {description && (
                            <Text 
                                variant="body2" 
                                color="secondary"
                                style={{ marginBottom: '12px' }}
                            >
                                {description}
                            </Text>
                        )}
                        
                        {children}
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;