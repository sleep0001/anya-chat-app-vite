import React, { useMemo, useState, useEffect } from 'react';
import { RankingTable, RankingPlayer } from '../organisms';
import { Text } from '../atoms';
import { PrefectureSelector } from '../molecules';
import { Selector } from '../molecules';
import { useDmPlayerLatestStats } from '../../hooks/useDmPlayerLatestStats';
import { RankingPlayerData } from '../../types/DmPlayerLatestStats';

const DmpRankingLatestPage = () => {
    const { allRankingData, loading, error } = useDmPlayerLatestStats();
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
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

    // ランキングデータの加工
    const processedRankingData: RankingPlayer[] = useMemo(() => {
        const filtered = selectedPrefecture === ""
            ? rankingPlayerData
            : rankingPlayerData.filter((player) => player.prefecture === selectedPrefecture);

        const sorted = [...filtered].sort((a, b) => b.point - a.point);

        return sorted.map((player, index) => ({
            id: player.dmpId,
            rank: index + 1,
            name: player.name,
            point: player.point,
            prefecture: player.prefecture,
            allRank: player.allRank,
        }));
    }, [selectedPrefecture, rankingPlayerData]);
    
    if (loading) return <div className="p-4">読み込み中...</div>;
    if (error) return <div className="p-4 text-red-500">エラー: {error}</div>;

    const containerStyle: React.CSSProperties = {
        padding: '16px',
    };

    const controlsStyle: React.CSSProperties = {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    };

    const infoStyle: React.CSSProperties = {
        textAlign: 'center',
        marginBottom: '16px',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '8px',
    };

    return (
        <div className="p-4" style={containerStyle}>
            {/* コントロール */}
            <div style={controlsStyle}>
                <Selector
                    label="対象期間"
                    value={selectedPeriod}
                    onChange={(value) => setSelectedPeriod(String(value))}
                    options={periodOptions.map(option => ({
                        value: option.key,
                        label: option.label
                    }))}
                    placeholder="期間を選択"
                    searchable={true}
                    width={300}
                />
                
                <PrefectureSelector 
                    value={selectedPrefecture} 
                    onChange={setSelectedPrefecture}
                    label="都道府県"
                />
            </div>

            {/* 情報表示 */}
            {latestUpDate && (
                <div style={infoStyle}>
                    <Text variant="body2" color="secondary">
                        最終加算日：{latestUpDate.toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Text>
                </div>
            )}

            {latestUpDate && processedRankingData.length > 0 && (
                <RankingTable
                    data={processedRankingData}
                    title={selectedPrefecture ? `${selectedPrefecture}プレイヤーランキング` : "アニャマス県プレイヤーランキング"}
                    loading={loading}
                    showPrefecture={selectedPrefecture === ""}
                    showAllRank={selectedPrefecture !== ""}
                    maxItems={100}
                    themeColor="#f8bbd0"
                />
            )}
        </div>
    );
};

export default DmpRankingLatestPage;