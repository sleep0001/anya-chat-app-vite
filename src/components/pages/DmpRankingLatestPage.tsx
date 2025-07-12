import DmpRankingLatest from '../layout/DmpRankingLatest';
import { useDmPlayerLatestStats } from '../../hooks/useDmPlayerLatestStats';
// import { DmPlayerLatestStatsTest } from '../../test/DmPlayerLatestStatsTest';
import { useMemo } from 'react';

const DmpRankingLatestPage = () => {
    const { latestUpDate, rankingPlayerData, loading, error } = useDmPlayerLatestStats();
    // const latestUpDate = DmPlayerLatestStatsTest.latestUpDate; // テスト用。CORS設定のためローカルから接続できないため。
    // const rankingPlayerData = DmPlayerLatestStatsTest.rankingPlayerData;
    // 全国ランキングの順位付け
    const allRankedPlayers = useMemo(() => {
        const sorted = [...rankingPlayerData].sort((a, b) => b.point - a.point);

        return sorted.map((player, index) => ({
            ...player,
            allRank: index + 1,
        }));
    }, [rankingPlayerData]);
    if (loading) return <div className="p-4">読み込み中...</div>;
    if (error) return <div className="p-4 text-red-500">エラー: {error}</div>;

    return (
        <div className="p-4">
            <DmpRankingLatest latestUpDate={latestUpDate} players={allRankedPlayers} />
        </div>
    );
};

export default DmpRankingLatestPage;