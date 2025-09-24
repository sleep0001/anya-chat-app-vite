import React from 'react';

export interface VersionNumberProps {
    version: string;
    size?: 'small' | 'medium' | 'large';
}

const VersionNumber: React.FC<VersionNumberProps> = ({ version, size = 'medium' }) => {
    const sizeStyles = {
        small: { fontSize: '14px', padding: '4px 8px' },
        medium: { fontSize: '16px', padding: '6px 12px' },
        large: { fontSize: '20px', padding: '8px 16px' },
    };

    return (
        <span
            style={{
                display: 'inline-block',
                fontFamily: 'ui-monospace, monospace',
                fontWeight: 600,
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                color: '#374151',
                ...sizeStyles[size],
            }}
        >
            v{version}
        </span>
    );
};

export default VersionNumber;