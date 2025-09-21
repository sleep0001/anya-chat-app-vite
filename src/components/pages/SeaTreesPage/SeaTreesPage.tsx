import React, { useMemo, useState, useEffect } from 'react';
import { RankingTable, RankingPlayer } from '../../organisms';
import { Text } from '../../atoms';
import { Selector } from '../../molecules';
import { useDmSeaTree } from '../../../hooks/useDmSeaTree';
import { RankingPlayerData, PeriodOption } from '../../../types/DmPlayerLatestStats';

export interface SeaTreesPageProps {
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const SeaTreesPage: React.FC<SeaTreesPageProps> = ({
    style,
    className,
}) => {
    const { allRankingData, loading, error } = useDmSeaTree();
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');
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
        const sorted = [...rankingPlayerData].sort((a, b) => b.point - a.point);

        return sorted.map((player, index) => ({
            id: player.dmpId,
            rank: index + 1,
            name: player.name,
            point: player.point,
            prefecture: player.prefecture,
        }));
    }, [rankingPlayerData]);

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

    const adminLinkStyle: React.CSSProperties = {
        textAlign: 'center',
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
    };

    return (
        <div className={`seatrees-page ${className || ''}`} style={containerStyle}>
            {/* ヘッダー */}
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '24px',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <Text variant="h3" weight="bold" color="primary" style={{ marginBottom: '8px' }}>
                    🌲 じゅかいらんきんぐ
                </Text>
                <Text variant="body1" color="secondary">
                    樹海CSのランキングをチェック！
                </Text>
            </div>

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
                loading={loading}
                showPrefecture={true}
                maxItems={100}
                themeColor="#f8bbd0"
            />

            {/* 管理者リンク */}
            <div style={adminLinkStyle}>
                <Text variant="body2" color="secondary">
                    管理者の方は{' '}
                    <a 
                        href="https://www.sl33p.net/seatrees/admin" 
                        style={{ 
                            color: '#1890ff', 
                            textDecoration: 'underline' 
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        こちらから管理画面
                    </a>
                    {' '}にアクセスできます
                </Text>
            </div>
        </div>
    );
};

export default SeaTreesPage;