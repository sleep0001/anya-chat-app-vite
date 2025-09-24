import React from 'react';

export type ChangeType = 'feature' | 'improvement' | 'bugfix' | 'security' | 'breaking' | 'deprecated';

export interface ChangeIconProps {
    type: ChangeType;
    size?: number;
}

const ChangeIcon: React.FC<ChangeIconProps> = ({ type, size = 20 }) => {
    const icons: Record<ChangeType, { icon: string; color: string }> = {
        feature: { icon: '✨', color: '#10b981' },
        improvement: { icon: '⚡', color: '#3b82f6' },
        bugfix: { icon: '🐛', color: '#8b5cf6' },
        security: { icon: '🔒', color: '#ef4444' },
        breaking: { icon: '⚠️', color: '#dc2626' },
        deprecated: { icon: '📦', color: '#f59e0b' },
    };

    const { icon, color } = icons[type];

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: size,
                height: size,
                fontSize: size * 0.8,
                color,
            }}
        >
            {icon}
        </span>
    );
};

export default ChangeIcon;