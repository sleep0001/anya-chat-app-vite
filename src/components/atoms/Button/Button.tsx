import React, { CSSProperties, ReactNode, useState } from 'react';
import { Button as AntdButton } from 'antd';

export interface ButtonProps {
    /** ボタンのラベル */
    children: ReactNode;
    /** クリックハンドラー */
    onClick?: () => void;
    /** ボタンの種類 */
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    /** サイズ */
    size?: 'small' | 'medium' | 'large';
    /** 無効状態 */
    disabled?: boolean;
    /** ローディング状態 */
    loading?: boolean;
    /** カスタムカラー（variant='primary'時のみ） */
    color?: string;
    /** テキストカラー */
    textColor?: string;
    /** 角丸タイプ */
    shape?: 'default' | 'round' | 'circle';
    /** アイコン */
    icon?: ReactNode;
    /** フルワイド */
    block?: boolean;
    /** HTMLのtype属性 */
    htmlType?: 'button' | 'submit' | 'reset';
    /** カスタムクラス名 */
    className?: string;
    /** カスタムスタイル */
    style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    color,
    textColor,
    shape = 'round',
    icon,
    block = false,
    htmlType = 'button',
    className,
    style, // 追加
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // サイズマッピング
    const sizeMap = {
        small: 'small' as const,
        medium: 'middle' as const,
        large: 'large' as const,
    };

    // variantをAntdのtypeにマッピング
    const getAntdType = () => {
        switch (variant) {
            case 'primary':
                return 'primary';
            case 'secondary':
                return 'default';
            case 'ghost':
                return 'text';
            case 'danger':
                return 'primary';
            default:
                return 'primary';
        }
    };

    // カスタムスタイルの生成
    const getCustomStyle = (): CSSProperties => {
        const baseStyle: CSSProperties = {
            transition: 'all 0.3s ease',
            ...style, // カスタムスタイルをマージ
        };

        // カスタムカラーが指定されている場合（主にvariant='primary'用）
        if (color && variant === 'primary') {
            const hoverStyle = isHovered ? {
                backgroundColor: color,
                borderColor: color,
                boxShadow: `0 6px 12px ${color}80`,
                transform: 'translateY(-1px)',
            } : {};

            return {
                ...baseStyle,
                backgroundColor: color,
                borderColor: color,
                color: textColor || '#ffffff',
                boxShadow: `0 4px 10px ${color}40`,
                ...hoverStyle,
            };
        }

        // danger variantの特別処理
        if (variant === 'danger') {
            return {
                ...baseStyle,
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
                color: textColor || '#ffffff',
            };
        }

        // secondaryでカスタムカラーがある場合
        if (variant === 'secondary' && color) {
            const hoverStyle = isHovered ? {
                backgroundColor: '#fff0f6',
                borderColor: color,
            } : {};

            return {
                ...baseStyle,
                backgroundColor: 'transparent',
                borderColor: color,
                color: textColor || color,
                ...hoverStyle,
            };
        }

        return baseStyle;
    };

    return (
        <AntdButton
            type={getAntdType()}
            size={sizeMap[size]}
            shape={shape}
            disabled={disabled}
            loading={loading}
            icon={icon}
            block={block}
            htmlType={htmlType}
            className={className}
            onClick={onClick}
            style={getCustomStyle()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </AntdButton>
    );
};

export default Button;