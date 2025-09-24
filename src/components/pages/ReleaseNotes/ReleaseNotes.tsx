import React from 'react';
import { ReleaseNoteProps, ReleaseNotesList } from '../../organisms';

const ReleaseNotes: React.FC = () => {
    const releases: ReleaseNoteProps[] = [
        {
            version: '2.0.0',
            date: '2024-11-15',
            title: 'メジャーアップデート - パフォーマンス改善',
            badges: [
                { variant: 'breaking', label: 'Breaking' },
                { variant: 'new', label: 'New' },
            ],
            summary: 'このリリースでは、アプリケーション全体のパフォーマンスが大幅に改善されました。また、新しいUIコンポーネントライブラリが導入されています。',
            breaking: [
                {
                    description: 'APIレスポンスフォーマットの変更',
                    details: '従来のXML形式からJSON形式に変更されました。既存の実装は修正が必要です。',
                    issueNumber: '1234',
                },
            ],
            features: [
                {
                    description: 'ダークモード対応',
                    details: 'システム設定に連動したダークモードを実装しました。',
                    tags: [{ variant: 'new', label: 'UI' }],
                },
                {
                    description: 'リアルタイム通知機能',
                    details: 'WebSocketを使用したリアルタイム通知が可能になりました。',
                },
            ],
            improvements: [
                {
                    description: 'ページ読み込み速度を50%改善',
                    details: 'バンドルサイズの最適化とコード分割により、初回読み込み時間が大幅に短縮されました。',
                },
            ],
            bugfixes: [
                {
                    description: 'ログイン後のリダイレクト不具合を修正',
                    issueNumber: '1235',
                },
            ],
        },
        {
            version: '1.5.2',
            date: '2024-11-01',
            title: 'セキュリティパッチ',
            badges: [{ variant: 'security', label: 'Security' }],
            security: [
                {
                    description: 'XSS脆弱性の修正',
                    details: 'ユーザー入力のサニタイゼーション処理を強化しました。',
                    tags: [{ variant: 'security', label: 'Critical' }],
                },
            ],
            bugfixes: [
                {
                    description: 'フォームのバリデーションエラーを修正',
                },
            ],
        },
    ];

    return <ReleaseNotesList releases={releases} />;
};

export default ReleaseNotes;