import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowUpOutlined, ArrowDownOutlined, CrownOutlined } from '@ant-design/icons';
import { DmPlayerStats } from '../../types/DmPlayerStats';
import './DmpRanking.css';

interface Props {
    players: DmPlayerStats[];
}

const DmpRanking: React.FC<Props> = ({ players }) => {
    const sorted = [...players].sort((a, b) => a.currentRank - b.currentRank);

    const renderRank = (rank: number) => {
        const base = <strong>{rank}</strong>;
        if (rank === 1) return <span className="rank-gold"><CrownOutlined /> {base}</span>;
        if (rank === 2) return <span className="rank-silver"><CrownOutlined /> {base}</span>;
        if (rank === 3) return <span className="rank-bronze"><CrownOutlined /> {base}</span>;
        return base;
    };

    const columns: ColumnsType<DmPlayerStats> = [
        {
            title: '順位',
            dataIndex: 'currentRank',
            key: 'rank',
            width: 100,
            align: 'center',
            render: renderRank,
        },
        {
            title: 'プレイヤー名',
            dataIndex: 'name',
            key: 'name',
            className: 'player-name',
            render: (name) => <strong>{name}</strong>,
        },
        {
            title: 'ポイント',
            dataIndex: 'currentPoint',
            key: 'point',
            align: 'right',
            className: 'point',
            render: (currentPoint) => <strong>{currentPoint}</strong>,
        },
        {
            title: '順位変動',
            key: 'rankDiff',
            align: 'right',
            render: (_, record) => {
                if (record.rankDiff == 2147483647) {
                    return <Tag color="#4caf50">new!!</Tag>;
                } else if (record.rankDiff >= 10) {
                    return <Tag color="#c62828"><ArrowUpOutlined /> {record.rankDiff}</Tag>;
                } else if (record.rankDiff > 0) {
                    return <Tag color="#ef5350"><ArrowUpOutlined /> {record.rankDiff}</Tag>;
                } else if (record.rankDiff == 0) {
                    return <Tag color="#bdbdbd"><strong>±0</strong></Tag>;
                } else {
                    return <Tag color="#42a5f5"><ArrowDownOutlined /> {Math.abs(record.rankDiff)}</Tag>;
                }
            },
        },
        {
            title: 'ポイント変動',
            key: 'pointDiff',
            align: 'right',
            render: (_, record) => {
                if (record.rankDiff == 2147483647) {
                    return <Tag color="#4caf50">new!!</Tag>;
                } else if (record.pointDiff >= 2000) {
                    return <Tag color="#ff3b3b"><ArrowUpOutlined /> {record.pointDiff}</Tag>;
                } else if (record.pointDiff >= 1000) {
                    return <Tag color="#ff7043"><ArrowUpOutlined /> {Math.abs(record.pointDiff)}</Tag>;
                } else if (record.pointDiff >= 500) {
                    return <Tag color="#ff9f43"><ArrowUpOutlined /> {Math.abs(record.pointDiff)}</Tag>;
                } else if (record.pointDiff >= 200) {
                    return <Tag color="#ffbc6b"><ArrowUpOutlined /> {Math.abs(record.pointDiff)}</Tag>;
                } else if (record.pointDiff > 0) {
                    return <Tag color="#ffd699"><ArrowUpOutlined /> {Math.abs(record.pointDiff)}</Tag>;
                } else {
                    return <Tag color="#d1d1d1">±0</Tag>;
                }
            },
        },
    ];

    return (
        <div className="ranking-wrapper pink-theme">
            <h2 className="ranking-title">アニャマス県プレイヤーランキング</h2>
            <Table
                columns={columns}
                dataSource={sorted.map(p => ({ ...p, key: p.dmpId, rowClassName: `rank-${p.currentRank}`, }))}
                pagination={false}
                bordered
                size="middle"
                className="ranking-table"
                rowClassName={(record) => `rank-${record.currentRank}`}
            />
        </div>
    );
};

export default DmpRanking;
