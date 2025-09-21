import React from 'react';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    CrownOutlined,
    UserOutlined,
    LogoutOutlined,
    PlusOutlined,
    SearchOutlined,
    StarOutlined,
    HeartOutlined,
    SettingOutlined,
    HomeOutlined,
    MessageOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';

export type IconName = 
    | 'arrow-up'
    | 'arrow-down'
    | 'crown'
    | 'user'
    | 'logout'
    | 'plus'
    | 'search'
    | 'star'
    | 'heart'
    | 'settings'
    | 'home'
    | 'message'
    | 'check-circle'
    | 'exclamation-circle'
    | 'info-circle'
    | 'close-circle';

export interface IconProps {
    /** アイコンの名前 */
    name: IconName;
    /** サイズ */
    size: 'small' | 'medium' | 'large' | 'xlarge' | number;
    /** 色 */
    color?: string;
    /** スピン効果 */
    spin?: boolean;
    /** クリック可能かどうか */
    clickable?: boolean;
    /** クリックハンドラー */
    onClick?: () => void;
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const Icon: React.FC<IconProps> = ({
    name,
    size = 'medium',
    color,
    spin = false,
    clickable = false,
    onClick,
    style,
    className,
}) => {
    // アイコンマッピング
    const iconMap = {
        'arrow-up': ArrowUpOutlined,
        'arrow-down': ArrowDownOutlined,
        'crown': CrownOutlined,
        'user': UserOutlined,
        'logout': LogoutOutlined,
        'plus': PlusOutlined,
        'search': SearchOutlined,
        'star': StarOutlined,
        'heart': HeartOutlined,
        'settings': SettingOutlined,
        'home': HomeOutlined,
        'message': MessageOutlined,
        'check-circle': CheckCircleOutlined,
        'exclamation-circle': ExclamationCircleOutlined,
        'info-circle': InfoCircleOutlined,
        'close-circle': CloseCircleOutlined,
    };

    // サイズマッピング
    const getSizeValue = (size: IconProps['size']) => {
        if (typeof size === 'number') return size;
        
        const sizeMap = {
            small: 12,
            medium: 16,
            large: 20,
            xlarge: 24,
        };
        return sizeMap[size] || 16;
    };

    const IconComponent = iconMap[name];
    
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    const iconStyle: React.CSSProperties = {
        fontSize: getSizeValue(size),
        color: color || 'currentColor',
        cursor: clickable ? 'pointer' : 'default',
        transition: clickable ? 'all 0.2s ease' : 'none',
        ...style,
        ...(clickable && {
            ':hover': {
                opacity: 0.7,
            },
        }),
    };

    return (
        <IconComponent
            spin={spin}
            style={iconStyle}
            className={className}
            onClick={clickable ? onClick : undefined}
        />
    );
};

export default Icon;