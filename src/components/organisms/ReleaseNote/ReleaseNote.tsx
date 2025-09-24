import React, { useState } from 'react';
import { ReleaseHeader, ReleaseHeaderProps, ChangeGroup, ChangeItemProps } from '../../molecules';
import { ChangeType } from '../../atoms';

export interface ReleaseNoteProps {
    version: string;
    date: string | Date;
    title?: string;
    badges?: ReleaseHeaderProps['badges'];
    features?: Omit<ChangeItemProps, 'type'>[];
    improvements?: Omit<ChangeItemProps, 'type'>[];
    bugfixes?: Omit<ChangeItemProps, 'type'>[];
    security?: Omit<ChangeItemProps, 'type'>[];
    breaking?: Omit<ChangeItemProps, 'type'>[];
    deprecated?: Omit<ChangeItemProps, 'type'>[];
    summary?: string;
    collapsible?: boolean;
}

const ReleaseNote: React.FC<ReleaseNoteProps> = ({
    version,
    date,
    title,
    badges = [],
    features = [],
    improvements = [],
    bugfixes = [],
    security = [],
    breaking = [],
    deprecated = [],
    summary,
    collapsible = true,
}) => {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    const handleToggle = (key: string) => {
        if (!collapsible) return;
        setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const sections: Array<{
        key: string;
        title: string;
        type: ChangeType;
        changes: Omit<ChangeItemProps, 'type'>[];
    }> = [
        { key: 'breaking', title: '⚠️ 破壊的変更', type: 'breaking', changes: breaking },
        { key: 'security', title: '🔒 セキュリティ', type: 'security', changes: security },
        { key: 'features', title: '✨ 新機能', type: 'feature', changes: features },
        { key: 'improvements', title: '⚡ 改善', type: 'improvement', changes: improvements },
        { key: 'bugfixes', title: '🐛 バグ修正', type: 'bugfix', changes: bugfixes },
        { key: 'deprecated', title: '📦 非推奨', type: 'deprecated', changes: deprecated },
    ];

    const activeSections = sections.filter((section) => section.changes.length > 0);

    return (
        <article
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                marginBottom: '32px',
            }}
        >
            <ReleaseHeader
                version={version}
                date={date}
                title={title}
                badges={badges}
            />

            {summary && (
                <div
                    style={{
                        margin: '16px 0',
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        borderLeft: '4px solid #3b82f6',
                    }}
                >
                    <p style={{ margin: 0, fontSize: '15px', color: '#374151', lineHeight: 1.6 }}>
                        {summary}
                    </p>
                </div>
            )}

            <div style={{ marginTop: '24px' }}>
                {activeSections.map((section) => (
                    <ChangeGroup
                        key={section.key}
                        title={section.title}
                        type={section.type}
                        changes={section.changes}
                        collapsed={collapsed[section.key] || false}
                        onToggle={collapsible ? () => handleToggle(section.key) : undefined}
                    />
                ))}
            </div>
        </article>
    );
};

export default ReleaseNote;