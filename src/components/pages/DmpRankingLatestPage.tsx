import DmpRankingLatest from '../layout/DmpRankingLatest';
import { useDmPlayerLatestStats } from '../../hooks/useDmPlayerLatestStats';
import { useMemo, useState, useEffect } from 'react';
import { RankingPlayerData } from '../../types/DmPlayerLatestStats';

const DmpRankingLatestPage = () => {
    const { allRankingData, loading, error } = useDmPlayerLatestStats();
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');
    const [rankingPlayerData, setRankingPlayerData] = useState<RankingPlayerData[]>([]);

    const periodOptions = useMemo(() => {
        if (!allRankingData || Object.keys(allRankingData).length === 0) return [];
        
        return Object.keys(allRankingData)
            .map(key => {
                const [startDate, endDate] = key.split('_');
                return {
                    key,
                    label: `${startDate} ～ ${endDate}`,
                    startDate: new Date(startDate), // Date型に変換
                    endDate: new Date(endDate)      // Date型に変換
                };
            })
            // 当日までのstartDateのみを対処
            .filter(period => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // 時間を00:00:00に設定して日付のみで比較
                return period.startDate <= today;
            })
            .sort((a, b) => b.endDate.getTime() - a.endDate.getTime()); // Date型のメソッドを使用
    }, [allRankingData]);

    useEffect(() => {
        if (periodOptions.length > 0 && !selectedPeriod) {
            setSelectedPeriod(periodOptions[0].key);
        }
    }, [periodOptions, selectedPeriod]);

    // 最終加算日を選択された期間から取得
    const latestUpDate = useMemo(() => {
        if (selectedPeriod && 
            allRankingData && 
            allRankingData[selectedPeriod]) {
            return allRankingData[selectedPeriod].latestUpDate; // DmPlayerLatestStatsを経由しない
        }
        return null;
    }, [selectedPeriod, allRankingData]);

    useEffect(() => {
        if (selectedPeriod && 
            allRankingData[selectedPeriod]) {
            const selectedData = allRankingData[selectedPeriod];
            setRankingPlayerData(selectedData.rankingPlayerData); // DmPlayerLatestStatsを経由しない
        } else {
            setRankingPlayerData([]);
        }
    }, [selectedPeriod, allRankingData]);
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
            {latestUpDate && allRankedPlayers.length > 0 && (
                <DmpRankingLatest 
                    latestUpDate={latestUpDate} 
                    players={allRankedPlayers}
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={setSelectedPeriod}
                    periodOptions={periodOptions}
                />
            )}
        </div>
    );
};

export default DmpRankingLatestPage;