import React from 'react';
import ChangeItem from '../ChangeItem/ChangeItem';
import { ChangeItemProps } from '../ChangeItem/ChangeItem';
import { ChangeType } from '../../atoms';

export interface ChangeGroupProps {
    title: string;
    type: ChangeType;
    changes: Omit<ChangeItemProps, 'type'>[];
    collapsed?: boolean;
    onToggle?: () => void;
}

const ChangeGroup: React.FC<ChangeGroupProps> = ({
    title,
    type,
    changes,
    collapsed = false,
    onToggle,
}) => {
    const changeCount = changes.length;

    return (
        <div style={{ marginBottom: '24px' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    cursor: onToggle ? 'pointer' : 'default',
                }}
                onClick={onToggle}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    {title}
                    <span
                        style={{
                            fontSize: '14px',
                            color: '#9ca3af',
                            fontWeight: 400,
                        }}
                    >
                        ({changeCount})
                    </span>
                </h3>
                {onToggle && (
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: '#6b7280',
                            transition: 'transform 0.2s',
                            transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                        }}
                    >
                        ▶
                    </button>
                )}
            </div>
            {!collapsed && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {changes.map((change, index) => (
                        <ChangeItem key={index} type={type} {...change} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChangeGroup;