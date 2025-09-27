import React from 'react';
import { ReleaseNoteProps, ReleaseNotesList } from '../../organisms';

const releases: ReleaseNoteProps[] = [
    {
        version: '1.6.0',
        date: '2025-09-27',
        title: 'ChartRaceを追加',
        badges: [],
        summary: 'このリリースでは、新しいコンポーネントが導入されています。',
        features: [
            {
                description: 'チャートレース',
                details: 'アニャマス県ランキング下部にチャートレースを追加しました。'
            },
        ],
    },
    {
        version: '1.5.0',
        date: '2025-09-23',
        title: 'ポイントグラフを追加',
        badges: [
            { variant: 'feature', label: 'feature' },
            { variant: 'improved', label: 'improved' },
        ],
        summary: 'このリリースでは、新しいコンポーネントが導入されています。また、レスポンスの改善を行いました。',
        features: [
            {
                description: 'ポイントグラフ追加',
                details: '全国・都道府県ランキングの上位20名のポイント遷移をグラフで可視化できるようになりました。'
            },
        ],
        improvements: [
            {
                description: 'レスポンス改善',
                details: 'これまでよりレスポンスデータが大きくなったため、データを圧縮することにしました。\nこれにより表示速度が短縮されました。格安simのアーニャちゃんにはとっても嬉しい改善です。'
            },
            {
                description: 'セレクターUI改善',
                details: 'これまで使用していたセレクター（都道府県を選ぶUI）がヌルヌルし過ぎて使いづらかったので改善しました。'
            },
        ],
    },
    {
        version: '1.4.0',
        date: '2025-09-20',
        title: '樹海CSランキングを追加',
        badges: [
            { variant: 'feature', label: 'feature' },
        ],
        summary: 'このリリースでは、新しいコンポーネントが導入されています。',
        features: [
            {
                description: '特定のCSで絞り込んだランキング',
                details: '特定のCSに限定したランキングを作成できるようになりました。樹海CSプレマ獲得ランキングレースに活用できます。'
            },
            {
                description: '特定のCSの絞り込み設定（管理者限定）',
                details: '対象に含めるCS名と除外するCS名を設定できます。暁CSを含めたい、春暁CSを除外したいのような設定ができます。'
            },
        ],
    },
    {
        version: '1.3.3',
        date: '2025-09-15',
        title: 'ランキングシーズンの絞り込みを追加',
        badges: [
            { variant: 'improved', label: 'improved' },
        ],
        summary: 'このリリースでは、機能改善が行われました。',
        improvements: [
            {
                description: 'シーズン選択を追加',
                details: 'ランキングの表示にシーズンが指定できるようになりました。2025年前期が終了に近づいたので対応を加えました。'
            },
        ],
    },
    {
        version: '1.3.2',
        date: '2025-09-10',
        title: '集計バグの修正',
        badges: [
            { variant: 'bugfix', label: 'bugfix' },
        ],
        summary: 'このリリースでは、バグ修正が行われました。',
        bugfixes: [
            {
                description: 'ランキングの集計結果が公式と乖離していた',
                details: 'デュエル・マスターズが想定よりも人気だったためにバグが生じました。\n月1000件を上限に大会結果を取得していましたが、1000件を超えてしまったため月初の大会結果が溢れてしまっていました。\n対応方針として、半月ごとの取得としました。月2000件を超えるほどの人気になると再検討が必要です。\nなんとも複雑な気持ちですね。'
            },
        ],
    },
    {
        version: '1.3.1',
        date: '2025-07-12',
        title: '全国順位を表示',
        badges: [
            { variant: 'improved', label: 'improved' },
        ],
        summary: 'このリリースでは、機能改善が行われました。また、連携機能が追加されました。',
        improvements: [
            {
                description: '都道府県ランキングに全国順位を表示',
                details: '公式サイトを見習って各都道府県ランキングに全国順位列を追加することにしました。'
            },
            {
                description: 'discord連携',
                details: '公式サイトが更新された時に、サイトのスクリーンショットと共にチャネルに投稿してお知らせします。'
            },
        ],
    },
    {
        version: '1.3.0',
        date: '2025-07-08',
        title: '全国ランキング',
        badges: [
            { variant: 'feature', label: 'feature' },
        ],
        summary: 'このリリースでは、新しいコンポーネントが追加されています。',
        features: [
            {
                description: '全国ランキングを追加',
                details: '公式サイトより早く更新されるランキングページを実装しました。1日2回再計算を行います。'
            },
        ],
    },
    {
        version: '1.2.0',
        date: '2025-07-05',
        title: 'アニャマス県ランキング',
        badges: [
            { variant: 'feature', label: 'feature' },
        ],
        summary: 'このリリースでは、新しいコンポーネントが追加されています。',
        features: [
            {
                description: 'アニャマス県ランキング',
                details: 'アーニャさんの国のランキングを実装しました。更新は公式サイトと同タイミングです。\n前週との比較ができることで公式サイトと差別化します。'
            },
        ],
    },
    {
        version: '1.1.0',
        date: '2025-05-31',
        title: 'ワンピースカード検索（現廃止）',
        badges: [
            { variant: 'feature', label: 'feature' },
        ],
        summary: 'このリリースでは、新しいコンポーネントが追加されています。',
        features: [
            {
                description: 'ワンピースカード検索機能を追加',
                details: '公式サイトより細かく条件設定できる検索ツールを実装しました。\n備考：更新がめんどくさくなったのでサ終しました。'
            },
        ],
    },
    {
        version: '1.0.1',
        date: '2025-05-13',
        title: 'ルームに関するバグ修正',
        badges: [
            { variant: 'bugfix', label: 'bugfix' },
        ],
        summary: 'このリリースでは、バグ修正が行われました。',
        bugfixes: [
            {
                description: 'チャットルームが残り続けるバグ',
                details: '退出処理が正常に行われなかった場合にチャットルームが残るバグを修正しました。\nルーム作成、退出を繰り返すとルームが増殖しててびっくりしました。'
            },
        ],
    },
    {
        version: '1.0.0',
        date: '2025-05-01',
        title: 'チャット機能',
        badges: [
            { variant: 'feature', label: 'feature' },
        ],
        summary: 'このリリースが最初のリリースです。',
        features: [
            {
                description: 'アーニャさんのチャット機能',
                details: 'アーニャさん同士でおしゃべりできます。E2EEは行いません。'
            },
        ],
    }
];

export function releaseVersion():string {
    return releases[0]?.version;
}

const ReleaseNotes: React.FC = () => {
    return <ReleaseNotesList releases={releases} />;
};

export default ReleaseNotes;