import React from 'react';
import { VersionNumber, ReleaseDate, Badge, BadgeProps } from '../../atoms';

export interface ReleaseHeaderProps {
    version: string;
    date: string | Date;
    badges?: Array<{ variant: BadgeProps['variant']; label: string }>;
    title?: string;
}

const ReleaseHeader: React.FC<ReleaseHeaderProps> = ({
    version,
    date,
    badges = [],
    title,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px 0',
                borderBottom: '2px solid #e5e7eb',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <VersionNumber version={version} size="large" />
                <ReleaseDate date={date} />
                {badges.map((badge, index) => (
                    <Badge key={index} variant={badge.variant} size="small">
                        {badge.label}
                    </Badge>
                ))}
            </div>
            {title && (
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#111827' }}>
                    {title}
                </h2>
            )}
        </div>
    );
};

export default ReleaseHeader;