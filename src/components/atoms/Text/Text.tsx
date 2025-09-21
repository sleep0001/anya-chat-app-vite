import React, { CSSProperties, ReactNode, ElementType } from 'react';

export interface TextProps {
    /** テキスト内容 */
    children: ReactNode;
    /** テキストのバリエーション */
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
    /** 色 */
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'text' | string;
    /** 太さ */
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
    /** テキスト整列 */
    align?: 'left' | 'center' | 'right' | 'justify';
    /** 改行の制御 */
    truncate?: boolean;
    /** 最大行数（truncateがtrueの時） */
    maxLines?: number;
    /** HTMLタグ */
    as?: ElementType;
    /** カスタムスタイル */
    style?: CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const Text: React.FC<TextProps> = ({
    children,
    variant = 'body1',
    color = 'text',
    weight = 'normal',
    align = 'left',
    truncate = false,
    maxLines,
    as,
    style,
    className,
}) => {
    // カラーマッピング
    const getColor = (colorProp: string) => {
        const colorMap = {
            primary: '#1890ff',
            secondary: '#6b7280',
            success: '#52c41a',
            warning: '#faad14',
            error: '#ff4d4f',
            info: '#1890ff',
            text: '#1f2937',
        };
        return colorMap[colorProp as keyof typeof colorMap] || colorProp;
    };

    // フォントウェイトマッピング
    const weightMap = {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    };

    // バリエーション別スタイル
    const getVariantStyles = (variant: string): CSSProperties => {
        const styles = {
            h1: { fontSize: '2.5rem', lineHeight: '1.2', fontWeight: weightMap.bold },
            h2: { fontSize: '2rem', lineHeight: '1.3', fontWeight: weightMap.bold },
            h3: { fontSize: '1.75rem', lineHeight: '1.3', fontWeight: weightMap.semibold },
            h4: { fontSize: '1.5rem', lineHeight: '1.4', fontWeight: weightMap.semibold },
            h5: { fontSize: '1.25rem', lineHeight: '1.4', fontWeight: weightMap.medium },
            h6: { fontSize: '1.125rem', lineHeight: '1.4', fontWeight: weightMap.medium },
            body1: { fontSize: '1rem', lineHeight: '1.6', fontWeight: weightMap.normal },
            body2: { fontSize: '0.875rem', lineHeight: '1.5', fontWeight: weightMap.normal },
            caption: { fontSize: '0.75rem', lineHeight: '1.4', fontWeight: weightMap.normal },
            overline: { fontSize: '0.75rem', lineHeight: '1.4', fontWeight: weightMap.medium, textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
        };
        return styles[variant as keyof typeof styles] || styles.body1;
    };

    // デフォルトタグの決定 - React.ElementType を返す
    const getDefaultTag = (variant: string): ElementType => {
        const tagMap: Record<string, ElementType> = {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            body1: 'p',
            body2: 'p',
            caption: 'span',
            overline: 'span',
        };
        return tagMap[variant] || 'p';
    };

    // トランケート用スタイル
    const getTruncateStyles = (): CSSProperties => {
        if (!truncate) return {};

        if (maxLines && maxLines > 1) {
            return {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
            };
        }

        return {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        };
    };

    const combinedStyles: CSSProperties = {
        margin: 0,
        color: getColor(color),
        fontWeight: weightMap[weight],
        textAlign: align,
        ...getVariantStyles(variant),
        ...getTruncateStyles(),
        ...style,
    };

    // React.ElementType として明確に型定義
    const Component: ElementType = as || getDefaultTag(variant);

    return (
        <Component
            className={className}
            style={combinedStyles}
        >
            {children}
        </Component>
    );
};

export default Text;