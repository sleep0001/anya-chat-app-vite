import React from 'react';
import { Spin } from 'antd';
import Text from '../Text/Text';

export interface LoadingProps {
    /** ローディングメッセージ */
    message?: string;
    /** サイズ */
    size?: 'small' | 'medium' | 'large';
    /** 中央揃えにするか */
    centered?: boolean;
    /** 全画面表示にするか */
    fullscreen?: boolean;
    /** 背景色 */
    backgroundColor?: string;
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({
    message = '読み込み中...',
    size = 'medium',
    centered = true,
    fullscreen = false,
    backgroundColor,
    style,
    className,
}) => {
    const getSizeConfig = (size: string) => {
        const sizeMap = {
            small: { spinSize: 'small' as const, fontSize: '12px', gap: '8px' },
            medium: { spinSize: 'default' as const, fontSize: '14px', gap: '12px' },
            large: { spinSize: 'large' as const, fontSize: '16px', gap: '16px' },
        };
        return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
    };

    const sizeConfig = getSizeConfig(size);

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        justifyContent: centered ? 'center' : 'flex-start',
        gap: sizeConfig.gap,
        ...(fullscreen && {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: backgroundColor || 'rgba(255, 255, 255, 0.9)',
        }),
        ...(backgroundColor && !fullscreen && {
            backgroundColor,
            padding: '20px',
            borderRadius: '8px',
        }),
        ...style,
    };

    return (
        <div className={`loading-atom ${className || ''}`} style={containerStyle}>
            <Spin size={sizeConfig.spinSize} />
            {message && (
                <Text 
                    variant="body2" 
                    color="secondary" 
                    align={centered ? 'center' : 'left'}
                    style={{ fontSize: sizeConfig.fontSize }}
                >
                    {message}
                </Text>
            )}
        </div>
    );
};

export default Loading;