import React, { useState, useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CrownOutlined } from '@ant-design/icons';
import { RankingPlayerData } from '../../types/DmPlayerLatestStats';
import './DmpRanking.css';
import PrefectureSelector from "../Button/PrefectureSelector";

interface Props {
    latestUpDate: Date;
    players: RankingPlayerData[];
}

const DmpRankingLatest: React.FC<Props> = ({ latestUpDate, players }) => {
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");

    const filteredPlayers = useMemo(() => {
        return selectedPrefecture === ""
            ? players
            : players.filter((player) => player.prefecture === selectedPrefecture);
    }, [selectedPrefecture, players]);

    const rankedPlayers = useMemo(() => {
        const sorted = [...filteredPlayers].sort((a, b) => b.point - a.point); // 降順（高得点が上）

        return sorted.map((player, index) => ({
            ...player,
            rank: index + 1,
        }));
    }, [filteredPlayers]);

    const renderRank = (rank: number) => {
        const base = <strong>{rank}</strong>;
        if (rank === 1) return <span className="rank-gold"><CrownOutlined /> {base}</span>;
        if (rank === 2) return <span className="rank-silver"><CrownOutlined /> {base}</span>;
        if (rank === 3) return <span className="rank-bronze"><CrownOutlined /> {base}</span>;
        return base;
    };

    const columns: ColumnsType<RankingPlayerData> = [
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
        }
    ];

    return (
        <div className="ranking-wrapper pink-theme">
            <h2 className="ranking-title">{selectedPrefecture}プレイヤーランキング</h2>
            <PrefectureSelector value={selectedPrefecture} onChange={setSelectedPrefecture} />
            <p>最終加算日：{latestUpDate.toISOString()}</p>
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

export default DmpRankingLatest;
