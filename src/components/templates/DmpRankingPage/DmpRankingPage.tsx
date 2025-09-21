import React, { useMemo } from 'react';
import { RankingTable, RankingPlayer } from '../../organisms';
import { Text } from '../../atoms';
import { useDmPlayerStats } from '../../../hooks/useDmPlayerStats';
import { DmPlayerStats } from '../../../types/DmPlayerStats';

const DmpRankingPage: React.FC = () => {
    const { players, loading, error } = useDmPlayerStats();

    // DmPlayerStats を RankingPlayer に変換
    const rankingData: RankingPlayer[] = useMemo(() => {
        return players
            .sort((a, b) => a.currentRank - b.currentRank)
            .map((player: DmPlayerStats) => ({
                id: player.dmpId,
                rank: player.currentRank,
                name: player.name,
                point: player.currentPoint,
                rankDiff: player.rankDiff,
                pointDiff: player.pointDiff,
            }));
    }, [players]);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '400px' 
            }}>
                <Text variant="h6" color="secondary">
                    読み込み中...
                </Text>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '400px' 
            }}>
                <Text variant="h6" color="error">
                    エラー: {error}
                </Text>
            </div>
        );
    }

    return (
        <div style={{ padding: '16px' }}>
            <RankingTable
                data={rankingData}
                title="アニャマス県プレイヤーランキング"
                loading={loading}
                showDiff={true}
                maxItems={100}
                themeColor="#f8bbd0"
            />
        </div>
    );
};

export default DmpRankingPage;