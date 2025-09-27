import React from 'react';
import { Tag, Badge as AntdBadge } from 'antd';

export interface BadgeProps {
    /** バッジの内容 */
    children?: React.ReactNode;
    /** バッジの種類 */
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'positive' | 
                'new' | 'improved' | 'fixed' | 'deprecated' | 'security' | 'breaking' | 'feature' | 'bugfix';
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
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
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
    style = {},
    className,
}) => {
    // バリエーション別カラー（既存 + リリースノート用を追加）
    const getVariantColor = (variant: string) => {
        const colorMap = {
            // 既存のカラー
            default: '#d9d9d9',
            primary: '#1890ff',
            success: '#52c41a',
            warning: '#faad14',
            error: '#ff4d4f',
            info: '#13c2c2',
            positive: '#ffaa00ff',
            // リリースノート用のカラー
            new: '#10b981',
            improved: '#3b82f6',
            fixed: '#8b5cf6',
            deprecated: '#f59e0b',
            security: '#ef4444',
            breaking: '#dc2626',
            feature: '#00ccffff',
            bugfix: '#8b5cf6',
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

    // リリースノート用バリアントかチェック
    const isReleaseNoteVariant = ['new', 'improved', 'fixed', 'deprecated', 'security', 'breaking', 'feature', 'bugfix'].includes(variant);

    // 数値バッジの場合（子要素がある場合）
    if (children && (count !== undefined || dot) && !isReleaseNoteVariant) {
        return (
            <AntdBadge
                count={count}
                dot={dot}
                overflowCount={overflowCount}
                showZero={showZero}
                color={getVariantColor(variant)}
                style={{ 
                    cursor: clickable ? 'pointer' : 'default',
                    ...style
                }}
                className={className}
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
        // リリースノート用の追加スタイル
        ...(isReleaseNoteVariant && {
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            borderRadius: '4px',
        }),
        ...style, // カスタムスタイルを最後に適用（オーバーライド）
    };

    return (
        <Tag
            style={tagStyle}
            className={className}
            onClick={clickable ? onClick : undefined}
        >
            {icon && <span>{icon}</span>}
            {count !== undefined ? count : children}
        </Tag>
    );
};

export default Badge;