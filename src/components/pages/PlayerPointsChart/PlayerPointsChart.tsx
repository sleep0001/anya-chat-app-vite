// src/components/pages/PlayerPointsChart/PlayerPointsChart.tsx
import { useState, useMemo, useEffect } from "react";
import { PlayerConfig, ChartDataPoint, PeriodOption } from "../../../types";
import { ChartArea, PlayerSelectionPanel } from "../../organisms";
import { usePlayerPoints } from "../../../hooks/usePlayerPoints";
import { ErrorDisplay, Loading } from "../../atoms";
import { PrefectureSelector, Selector } from "../../molecules";

// APIデータの型定義
interface PlayerPointData {
    name: string;
    prefecture: string;
    pointMap: Record<string, number>;
}

interface ApiDataType {
    [key: string]: PlayerPointData[];
}

const PlayerPointsChart: React.FC = () => {
    const { data: apiData, loading, error } = usePlayerPoints();
    
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');
    const [players, setPlayers] = useState<PlayerConfig[]>([]);

    // APIデータを型安全にキャスト
    const typedApiData = apiData as unknown as ApiDataType;

    // 画面サイズを検知
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 期間オプションの生成
    const periodOptions: PeriodOption[] = useMemo(() => {
        if (!typedApiData || Object.keys(typedApiData).length === 0) return [];
        
        return Object.keys(typedApiData)
            .filter(key => key !== 'length') // 配列のlengthプロパティを除外
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
    }, [typedApiData]);

    // 初期期間設定
    useEffect(() => {
        if (periodOptions.length > 0 && !selectedPeriod) {
            setSelectedPeriod(periodOptions[0].key);
        }
    }, [periodOptions, selectedPeriod]);

    // プレイヤー設定の生成
    useEffect(() => {
        if (!selectedPeriod || !typedApiData || !(selectedPeriod in typedApiData)) return;

        const colorPalette = [
            { color: '#667eea', gradientColor: '#764ba2' },
            { color: '#f093fb', gradientColor: '#f5576c' },
            { color: '#4facfe', gradientColor: '#00f2fe' },
            { color: '#43e97b', gradientColor: '#38f9d7' },
            { color: '#fa709a', gradientColor: '#fee140' },
            { color: '#a8edea', gradientColor: '#fed6e3' },
            { color: '#30cfd0', gradientColor: '#330867' },
            { color: '#a8e063', gradientColor: '#56ab2f' },
            { color: '#ffd89b', gradientColor: '#19547b' },
            { color: '#ff9a9e', gradientColor: '#fecfef' },
        ];

        const topN = 20; // 上位20名を表示
        const allPlayers: Array<{
            playerId: string;
            playerData: PlayerPointData;
            latestPoint: number;
        }> = [];

        // 選択された期間のデータを取得
        const periodData = typedApiData[selectedPeriod];
        
        // データを処理（配列の各要素を処理）
        periodData.forEach((player: PlayerPointData, index: number) => {
            // 都道府県フィルターを適用
            if (selectedPrefecture === '' || player.prefecture === selectedPrefecture) {
                // pointMapから最新のポイントを取得
                const dates = Object.keys(player.pointMap).sort((a, b) => 
                    new Date(b).getTime() - new Date(a).getTime()
                );
                const latestPoint = dates.length > 0 ? player.pointMap[dates[0]] : 0;

                allPlayers.push({
                    playerId: `player_${index}`, // インデックスベースのID
                    playerData: player,
                    latestPoint
                });
            }
        });

        // 最新ポイントで降順ソートして上位N名を取得
        const topPlayers = allPlayers
            .sort((a, b) => b.latestPoint - a.latestPoint)
            .slice(0, topN);

        // プレイヤー設定を生成
        const generatedPlayers: PlayerConfig[] = topPlayers.map((player, index) => {
            const colors = colorPalette[index % colorPalette.length];
            return {
                id: player.playerId,
                name: `${player.playerData.name} (${player.playerData.prefecture})`,
                color: colors.color,
                gradientColor: colors.gradientColor,
                visible: index < 5 // 最初の5名を表示
            };
        });

        setPlayers(generatedPlayers);
    }, [typedApiData, selectedPrefecture, selectedPeriod]);

    // データ変換: APIデータ → チャート用データ
    const chartData = useMemo(() => {
        if (!typedApiData || !selectedPeriod || !(selectedPeriod in typedApiData) || players.length === 0) {
            return [];
        }

        const periodData = typedApiData[selectedPeriod];
        
        // すべての日付を収集
        const allDates = new Set<string>();
        const playerDataMap = new Map<string, PlayerPointData>();

        // プレイヤーIDに対応するデータを見つける
        periodData.forEach((player: PlayerPointData, index: number) => {
            const playerId = `player_${index}`;
            const playerConfig = players.find(p => p.id === playerId);
            
            if (playerConfig) {
                playerDataMap.set(playerId, player);
                Object.keys(player.pointMap).forEach(date => allDates.add(date));
            }
        });

        // 日付でソート
        const sortedDates = Array.from(allDates).sort((a, b) => 
            new Date(a).getTime() - new Date(b).getTime()
        );

        // 前の値を保持するためのマップ
        const lastKnownValues = new Map<string, number>();

        // チャートデータを生成
        const result: ChartDataPoint[] = sortedDates.map(date => {
            const dataPoint: ChartDataPoint = { date };
            
            players.forEach(player => {
                const playerData = playerDataMap.get(player.id);
                if (playerData && playerData.pointMap[date] !== undefined) {
                    // データがある場合
                    const value = playerData.pointMap[date];
                    dataPoint[player.id] = value;
                    lastKnownValues.set(player.id, value); // 最後の値を保存
                } else {
                    // データがない場合は前の値を使用するか、0を設定
                    const lastValue = lastKnownValues.get(player.id);
                    dataPoint[player.id] = lastValue !== undefined ? lastValue : 0;
                }
            });
            
            return dataPoint;
        });

        console.log('Chart data created:', result);
        return result;
    }, [typedApiData, selectedPrefecture, selectedPeriod, players]);

    // プレイヤー表示切り替え
    const handlePlayerToggle = (playerId: string) => {
        setPlayers(prev =>
            prev.map(player =>
                player.id === playerId
                    ? { ...player, visible: !player.visible }
                    : player
            )
        );
    };

    if (loading) return <Loading message="データを読み込み中..." />;
    if (error) return <ErrorDisplay message={error} />;

    // カスタムスタイル
    const pageStyle: React.CSSProperties = {
        background: `
            linear-gradient(135deg, 
                rgba(15, 23, 42, 0.97) 0%, 
                rgba(30, 41, 59, 0.95) 25%, 
                rgba(51, 65, 85, 0.93) 50%, 
                rgba(71, 85, 105, 0.90) 75%, 
                rgba(100, 116, 139, 0.88) 100%
            ),
            radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
        `,
        minHeight: '100vh',
        position: 'relative' as const,
        overflow: 'hidden',
        padding: isMobile ? '8px' : '0',
        margin: isMobile ? '4px' : '8px',
        borderRadius: isMobile ? '12px' : '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    };

    const controlsStyle: React.CSSProperties = {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    };

    // 装飾的なオーバーレイ
    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.05) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.03) 0%, transparent 60%)
        `,
        pointerEvents: 'none' as const,
        zIndex: 0,
        animation: 'overlayPulse 10s ease-in-out infinite alternate'
    };

    return (
        <>
            <style>{`
                @keyframes overlayPulse {
                    0% { opacity: 0.3; }
                    100% { opacity: 0.7; }
                }
                
                @keyframes fadeInUp {
                    0% { 
                        opacity: 0; 
                        transform: translateY(30px); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .chart-section {
                    animation: fadeInUp 0.8s ease-out forwards;
                    animation-delay: 0.2s;
                    opacity: 0;
                }
                
                .player-panel-section {
                    animation: fadeInUp 0.8s ease-out forwards;
                    animation-delay: 0.1s;
                    opacity: 0;
                }
            `}</style>

            <div style={pageStyle}>
                <div style={overlayStyle} />
                <div style={{ position: 'relative', zIndex: 1 }}>
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

                    {players.length > 0 && (
                        <>
                            <div className="player-panel-section">
                                <PlayerSelectionPanel
                                    players={players}
                                    onPlayerToggle={handlePlayerToggle}
                                />
                            </div>

                            <div className="chart-section">
                                <ChartArea
                                    chartData={chartData}
                                    players={players}
                                />
                            </div>
                        </>
                    )}

                    {players.length === 0 && !loading && (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '40px',
                            color: '#e5e7eb'
                        }}>
                            <h3>データがありません</h3>
                            <p>選択した条件に該当するプレイヤーが見つかりませんでした。</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PlayerPointsChart;