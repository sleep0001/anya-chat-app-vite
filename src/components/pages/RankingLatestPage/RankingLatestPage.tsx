import React, { useMemo, useState, useEffect } from 'react';
import { RankingTable, RankingPlayer } from '../../organisms';
import { Text } from '../../atoms';
import { PrefectureSelector } from '../../molecules';
import { Selector } from '../../molecules';
import { useDmPlayerLatestStats } from '../../../hooks/useDmPlayerLatestStats';
import { RankingPlayerData, PeriodOption } from '../../../types/DmPlayerLatestStats';

export interface RankingLatestPageProps {
    /** ページタイトル */
    title?: string;
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const RankingLatestPage: React.FC<RankingLatestPageProps> = ({
    title = "アニャマス県プレイヤーランキング",
    style,
    className,
}) => {
    const { allRankingData, loading, error } = useDmPlayerLatestStats();
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
    const [rankingPlayerData, setRankingPlayerData] = useState<RankingPlayerData[]>([]);

    // 期間オプションの生成
    const periodOptions: PeriodOption[] = useMemo(() => {
        if (!allRankingData || Object.keys(allRankingData).length === 0) return [];
        
        return Object.keys(allRankingData)
            .map(key => {
                const [startDate, endDate] = key.split('_');
                return {
                    key,
                    label: `${startDate} ～ ${endDate}`,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate)
                };
            })
            .filter(period => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return period.startDate <= today;
            })
            .sort((a, b) => b.endDate.getTime() - a.endDate.getTime());
    }, [allRankingData]);

    // 初期期間設定
    useEffect(() => {
        if (periodOptions.length > 0 && !selectedPeriod) {
            setSelectedPeriod(periodOptions[0].key);
        }
    }, [periodOptions, selectedPeriod]);

    // データ更新
    useEffect(() => {
        if (selectedPeriod && allRankingData[selectedPeriod]) {
            const selectedData = allRankingData[selectedPeriod];
            setRankingPlayerData(selectedData.rankingPlayerData);
        } else {
            setRankingPlayerData([]);
        }
    }, [selectedPeriod, allRankingData]);

    // 最終加算日
    const latestUpDate = useMemo(() => {
        if (selectedPeriod && allRankingData && allRankingData[selectedPeriod]) {
            return allRankingData[selectedPeriod].latestUpDate;
        }
        return null;
    }, [selectedPeriod, allRankingData]);

    // ランキングデータの加工
    const processedRankingData: RankingPlayer[] = useMemo(() => {
        // Step 1: 全体データをポイント順でソートして全国順位を計算
        const allPlayersSorted = [...rankingPlayerData].sort((a, b) => b.point - a.point);
        
        // Step 2: 全国順位を付与（全体データ基準）
        const playersWithAllRank = allPlayersSorted.map((player, index) => ({
            ...player,
            allRank: index + 1, // 全国順位
        }));
        
        // Step 3: 都道府県でフィルタリング
        const filtered = selectedPrefecture === ""
            ? playersWithAllRank
            : playersWithAllRank.filter((player) => player.prefecture === selectedPrefecture);
        
        // Step 4: フィルタ後のデータをポイント順で再ソート（県内順位計算用）
        const sortedFiltered = [...filtered].sort((a, b) => b.point - a.point);
        
        // Step 5: 最終的なデータ構造に変換
        return sortedFiltered.map((player, index) => ({
            id: player.dmpId,
            rank: index + 1,           // 県内順位（フィルタ後の順位）
            name: player.name,
            point: player.point,
            prefecture: player.prefecture,
            allRank: player.allRank,   // 全国順位（フィルタ前に計算済み）
        }));
    }, [selectedPrefecture, rankingPlayerData]);

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

    const containerStyle: React.CSSProperties = {
        padding: '16px',
        ...style,
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
        <div className={`ranking-latest-page ${className || ''}`} style={containerStyle}>
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

            {/* ランキングテーブル */}
            <RankingTable
                data={processedRankingData}
                title={selectedPrefecture ? `${selectedPrefecture}プレイヤーランキング` : title}
                loading={loading}
                showPrefecture={selectedPrefecture === ""}
                showAllRank={selectedPrefecture !== ""}
                maxItems={100}
                themeColor="#f8bbd0"
            />
        </div>
    );
};

export default RankingLatestPage;