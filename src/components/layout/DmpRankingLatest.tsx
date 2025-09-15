import React, { useState, useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CrownOutlined } from '@ant-design/icons';
import { RankingPlayerData, PeriodOption } from '../../types/DmPlayerLatestStats';
import './DmpRanking.css';
import PrefectureSelector from "../Button/PrefectureSelector";
import PeriodDropDown from "../common/PeriodDropDown";

interface Props {
    latestUpDate: Date;
    players: RankingPlayerData[];
    // 期間選択用のpropsを追加
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
    periodOptions: PeriodOption[];
}

const DmpRankingLatest: React.FC<Props> = ({ 
    latestUpDate, 
    players, 
    selectedPeriod, 
    onPeriodChange, 
    periodOptions 
}) => {
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");

    const rankedPlayers = useMemo(() => {
        const filtered = selectedPrefecture === ""
            ? players
            : players.filter((player) => player.prefecture === selectedPrefecture);

        const sorted = [...filtered].sort((a, b) => b.point - a.point); // 降順

        return sorted.map((player, index) => ({
            ...player,
            rank: index + 1,
        }));
    }, [selectedPrefecture, players]);

    const renderRank = (rank: number) => {
        const base = <strong>{rank}</strong>;
        if (rank === 1) return <span className="rank-gold"><CrownOutlined /> {base}</span>;
        if (rank === 2) return <span className="rank-silver"><CrownOutlined /> {base}</span>;
        if (rank === 3) return <span className="rank-bronze"><CrownOutlined /> {base}</span>;
        return base;
    };

    const showAllRank = selectedPrefecture !== "";
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

        if (showAllRank) {
            baseColumns.push({
                title: '全国',
                dataIndex: 'allRank',
                key: 'allRank',
                align: 'center',
                className: 'point',
                render: (allRank) => <strong>全国{allRank} 位</strong>,
            });
        }

        return baseColumns;
    }, [selectedPrefecture]);

    return (
        <div className="ranking-wrapper pink-theme">
            <h2 className="ranking-title">{selectedPrefecture}プレイヤーランキング</h2>
            
            {/* 期間選択を追加 */}
            <PeriodDropDown
                selectedPeriod={selectedPeriod}
                onPeriodChange={onPeriodChange}
                periodOptions={periodOptions}
            />
            
            <PrefectureSelector value={selectedPrefecture} onChange={setSelectedPrefecture} />
            
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

export default DmpRankingLatest;
