import DmpRanking from '../layout/DmpRanking';
import { useDmPlayerStats } from '../../hooks/useDmPlayerStats';

const DmpRankingPage = () => {
    const { players, loading, error } = useDmPlayerStats();

    if (loading) return <div className="p-4">読み込み中...</div>;
    if (error) return <div className="p-4 text-red-500">エラー: {error}</div>;

    return (
        <div className="p-4">
            <DmpRanking players={players} />
        </div>
    );
};

export default DmpRankingPage;
