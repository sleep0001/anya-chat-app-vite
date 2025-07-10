import DmpRankingLatest from '../layout/DmpRankingLatest';
import { useDmPlayerLatestStats } from '../../hooks/useDmPlayerLatestStats';

const DmpRankingLatestPage = () => {
    const { latestUpDate, rankingPlayerData, loading, error } = useDmPlayerLatestStats();

    if (loading) return <div className="p-4">読み込み中...</div>;
    if (error) return <div className="p-4 text-red-500">エラー: {error}</div>;

    return (
        <div className="p-4">
            <DmpRankingLatest latestUpDate={latestUpDate} players={rankingPlayerData} />
        </div>
    );
};

export default DmpRankingLatestPage;