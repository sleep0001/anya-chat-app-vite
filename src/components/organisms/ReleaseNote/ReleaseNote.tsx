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

function isWithinOneWeek(targetDate: Date | string): boolean {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : new Date(targetDate);
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    // 時間を0時0分0秒にリセット（日付のみで比較）
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    oneWeekAgo.setHours(0, 0, 0, 0);

    // 1週間前から今日までの範囲内かチェック
    return target >= oneWeekAgo && target <= today;
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

    const autoBadges: ReleaseHeaderProps['badges'] = badges;

    // 1週間以内のリリースにnewバッチを追加する。
    if(isWithinOneWeek(date)) {
        autoBadges.push({ variant: 'new', label: 'New' })
    }

    // 含まれるセクションに応じてバッチを追加する。
    if (features && features.length > 0) {
        autoBadges.push({ variant: 'feature', label: 'Feature' });
    }
    if (improvements && improvements.length > 0) {
        autoBadges.push({ variant: 'improved', label: 'Improved' });
    }
    if (bugfixes && bugfixes.length > 0) {
        autoBadges.push({ variant: 'bugfix', label: 'Bugfix' });
    }
    if (security && security.length > 0) {
        autoBadges.push({ variant: 'security', label: 'Security' });
    }
    if (breaking && breaking.length > 0) {
        autoBadges.push({ variant: 'breaking', label: 'Breaking' });
    }
    if (deprecated && deprecated.length > 0) {
        autoBadges.push({ variant: 'deprecated', label: 'Deprecated' });
    }

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
                badges={autoBadges}
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