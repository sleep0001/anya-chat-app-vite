import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { AvatarProps as AntdAvatarProps } from 'antd/es/avatar';

export interface AvatarProps extends Omit<AntdAvatarProps, 'size'> {
    /** アバターのサイズ */
    size: 'small' | 'medium' | 'large' | 'xlarge' | number;
    /** 画像URL */
    src?: string;
    /** 代替テキスト */
    alt?: string;
    /** アイコン */
    icon?: React.ReactNode;
    /** 形状 */
    shape?: 'circle' | 'square';
    /** 背景色 */
    backgroundColor?: string;
    /** テキスト色 */
    textColor?: string;
    /** オンライン状態の表示 */
    showOnlineStatus?: boolean;
    /** オンライン状態 */
    isOnline?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    size = 'medium',
    src,
    alt,
    icon,
    shape = 'circle',
    backgroundColor,
    textColor,
    showOnlineStatus = false,
    isOnline = false,
    children,
    style,
    ...props
}) => {
    // サイズマッピング
    const getSizeValue = (size: AvatarProps['size']) => {
        if (typeof size === 'number') return size;
        
        const sizeMap = {
            small: 32,
            medium: 40,
            large: 64,
            xlarge: 80,
        };
        return sizeMap[size] || 40;
    };

    const sizeValue = getSizeValue(size);

    const avatarStyle = {
        backgroundColor: backgroundColor || '#f0f0f0',
        color: textColor || '#666',
        ...style,
    };

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block',
    };

    const onlineStatusStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: sizeValue * 0.25,
        height: sizeValue * 0.25,
        backgroundColor: isOnline ? '#52c41a' : '#d9d9d9',
        border: '2px solid white',
        borderRadius: '50%',
        zIndex: 1,
    };

    return (
        <div style={containerStyle}>
            <AntdAvatar
                size={sizeValue}
                src={src}
                icon={icon}
                shape={shape}
                style={avatarStyle}
                alt={alt}
                {...props}
            >
                {children}
            </AntdAvatar>
            {showOnlineStatus && (
                <div style={onlineStatusStyle} />
            )}
        </div>
    );
};

export default Avatar;