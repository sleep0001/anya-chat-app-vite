import React from 'react';
import { Tag, Badge as AntdBadge } from 'antd';

export interface BadgeProps {
    /** バッジの内容 */
    children?: React.ReactNode;
    /** バッジの種類 */
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
    /** サイズ */
    size?: 'small' | 'medium' | 'large';
    /** ドット表示（数値の代わりに） */
    dot?: boolean;
    /** カウント値 */
    count?: number | string;
    /** カウントの最大表示値 */
    overflowCount?: number;
    /** バッジを表示するかどうか */
    showZero?: boolean;
    /** カスタムカラー */
    color?: string;
    /** アイコン */
    icon?: React.ReactNode;
    /** クリック可能かどうか */
    clickable?: boolean;
    /** クリックハンドラー */
    onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'medium',
    dot = false,
    count,
    overflowCount = 99,
    showZero = false,
    color,
    icon,
    clickable = false,
    onClick,
}) => {
    // バリエーション別カラー
    const getVariantColor = (variant: string) => {
        const colorMap = {
            default: '#d9d9d9',
            primary: '#1890ff',
            success: '#52c41a',
            warning: '#faad14',
            error: '#ff4d4f',
            info: '#13c2c2',
        };
        return color || colorMap[variant as keyof typeof colorMap] || colorMap.default;
    };

    // サイズ別スタイル
    const getSizeStyles = (size: string) => {
        const sizeMap = {
            small: { fontSize: '10px', padding: '0 4px', minWidth: '16px', height: '16px' },
            medium: { fontSize: '12px', padding: '0 6px', minWidth: '20px', height: '20px' },
            large: { fontSize: '14px', padding: '0 8px', minWidth: '24px', height: '24px' },
        };
        return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
    };

    // 数値バッジの場合（子要素がある場合）
    if (children && (count !== undefined || dot)) {
        return (
            <AntdBadge
                count={count}
                dot={dot}
                overflowCount={overflowCount}
                showZero={showZero}
                color={getVariantColor(variant)}
                style={{ cursor: clickable ? 'pointer' : 'default' }}
                onClick={clickable ? onClick : undefined}
            >
                {children}
            </AntdBadge>
        );
    }

    // スタンドアローンバッジの場合
    const tagStyle = {
        ...getSizeStyles(size),
        backgroundColor: getVariantColor(variant),
        borderColor: getVariantColor(variant),
        color: variant === 'default' ? '#666' : 'white',
        display: 'inline-flex',
        alignItems: 'center',
        gap: icon ? '4px' : '0',
        borderRadius: '12px',
        cursor: clickable ? 'pointer' : 'default',
        margin: 0,
    };

    return (
        <Tag
            style={tagStyle}
            onClick={clickable ? onClick : undefined}
        >
            {icon && <span>{icon}</span>}
            {count !== undefined ? count : children}
        </Tag>
    );
};

export default Badge;