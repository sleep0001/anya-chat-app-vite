import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CrownOutlined } from '@ant-design/icons';
import { RankingPlayerData, PeriodOption } from '../../types/DmPlayerLatestStats';
import './DmpRanking.css';
// 修正: 正しいパスでインポート
import { Selector } from '../molecules';

interface Props {
    latestUpDate: Date;
    players: RankingPlayerData[];
    // 期間選択用のpropsを追加
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
    periodOptions: PeriodOption[];
}

const DmpRankingSeaTree: React.FC<Props> = ({ 
    latestUpDate, 
    players, 
    selectedPeriod, 
    onPeriodChange, 
    periodOptions 
}) => {
    const rankedPlayers = useMemo(() => {
        const sorted = [...players].sort((a, b) => b.point - a.point); // 降順

        return sorted.map((player, index) => ({
            ...player,
            rank: index + 1,
        }));
    }, [players]);

    const renderRank = (rank: number) => {
        const base = <strong>{rank}</strong>;
        if (rank === 1) return <span className="rank-gold"><CrownOutlined /> {base}</span>;
        if (rank === 2) return <span className="rank-silver"><CrownOutlined /> {base}</span>;
        if (rank === 3) return <span className="rank-bronze"><CrownOutlined /> {base}</span>;
        return base;
    };

    const columns: ColumnsType<RankingPlayerData> = useMemo(() => {
        const baseColumns: ColumnsType<RankingPlayerData> = [
            {
                title: '順位',
                dataIndex: 'rank',
                key: 'rank',
                className: '.ant-table-cell.rank-col',
                width: 70,
                align: 'center',
                render: renderRank,
            },
            {
                title: 'プレイヤー名',
                dataIndex: 'name',
                key: 'name',
                className: 'player-name',
                align: 'center',
                render: (name) => <strong>{name}</strong>,
            },
            {
                title: 'ポイント',
                dataIndex: 'point',
                key: 'point',
                align: 'center',
                className: 'point',
                render: (point) => <strong>{point} pt</strong>,
            },
        ];

        return baseColumns;
    }, []);

    return (
        <div className="ranking-wrapper pink-theme">
            <h2 className="ranking-title">じゅかいらんきんぐ</h2>

            {/* 期間選択を上に配置 */}
            <div style={{ marginBottom: '16px' }}>
                <Selector
                    label="対象期間"
                    value={selectedPeriod}
                    onChange={(value) => onPeriodChange(String(value))}
                    options={periodOptions.map(option => ({
                        value: option.key,
                        label: option.label
                    }))}
                    placeholder="期間を選択"
                    searchable={true}
                    width={300}
                />
            </div>
            <p>最終加算日：{latestUpDate.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}</p>
            <Table
                columns={columns}
                dataSource={rankedPlayers
                    .slice(0, 100)
                    .map(p => ({
                        ...p, key: p.dmpId,
                        rowClassName: `rank-${p.rank}`,
                    }))}
                pagination={false}
                bordered
                size="middle"
                className="ranking-table"
                rowClassName={(record) => `rank-${record.rank}`}
            />
        </div>
    );
};

export default DmpRankingSeaTree;