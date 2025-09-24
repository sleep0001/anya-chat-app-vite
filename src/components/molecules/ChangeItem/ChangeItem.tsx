import React from 'react';
import { ChangeIcon, ChangeType, Badge, BadgeProps } from '../../atoms';

export interface ChangeItemProps {
    type: ChangeType;
    description: string;
    details?: string;
    tags?: Array<{ variant: BadgeProps['variant']; label: string }>;
    issueNumber?: string;
}

const ChangeItem: React.FC<ChangeItemProps> = ({
    type,
    description,
    details,
    tags = [],
    issueNumber,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
        >
            <div style={{ flexShrink: 0, paddingTop: '2px' }}>
                <ChangeIcon type={type} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <p style={{ margin: 0, fontSize: '15px', color: '#111827' }}>
                        {description}
                    </p>
                    {issueNumber && (
                        <a
                            href={`#${issueNumber}`}
                            style={{
                                fontSize: '13px',
                                color: '#6b7280',
                                textDecoration: 'none',
                            }}
                        >
                            #{issueNumber}
                        </a>
                    )}
                    {tags.map((tag, index) => (
                        <Badge key={index} variant={tag.variant} size="small">
                            {tag.label}
                        </Badge>
                    ))}
                </div>
                {details && (
                    <p
                        style={{
                            margin: '8px 0 0',
                            fontSize: '14px',
                            color: '#6b7280',
                            lineHeight: 1.5,
                        }}
                    >
                        {details}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChangeItem;