// src/components/pages/PlayerPointsChart/PlayerPointsChart.tsx
import { useState, useMemo, useEffect } from "react";
import { PlayerConfig, ChartDataPoint, PeriodOption } from "../../../types";
import { ChartArea, PlayerSelectionPanel } from "../../organisms";
import { usePlayerPoints } from "../../../hooks/usePlayerPoints";
import { ErrorDisplay, Loading } from "../../atoms";
import { PrefectureSelector, Selector } from "../../molecules";

const PlayerPointsChart: React.FC = () => {

    const { data: apiData, loading, error } = usePlayerPoints();

    const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');

    if (loading) return <Loading />;
    if (error) return <ErrorDisplay message={error} />;

    const [players, setPlayers] = useState<PlayerConfig[]>([]);

    useEffect(() => {
        if (apiData.length > 0) {
            const colorPalette = [
                { color: '#667eea', gradientColor: '#764ba2' },
                { color: '#f093fb', gradientColor: '#f5576c' },
                { color: '#4facfe', gradientColor: '#00f2fe' },
                { color: '#43e97b', gradientColor: '#38f9d7' },
                { color: '#fa709a', gradientColor: '#fee140' },
                { color: '#a8edea', gradientColor: '#fed6e3' },
            ];

            const topN = 10; // 上位10名を表示（必要に応じて変更）
            const allPlayers: Array<{
                playerId: string;
                playerData: any;
                latestPoint: number;
            }> = [];

            // 都道府県フィルターを適用してプレイヤーを収集
            apiData.forEach(responseGraph => {
                Object.keys(responseGraph).forEach((playerId) => {
                    const playerData = responseGraph[playerId];

                    if (selectedPrefecture === '' || playerData.prefecture === selectedPrefecture) {
                        // 最新の日付のポイントを取得
                        const sortedPointMap = [...playerData.pointMap].sort((a, b) => 
                            new Date(b.date).getTime() - new Date(a.date).getTime()
                        );
                        const latestPoint = sortedPointMap[0]?.point || 0;

                        allPlayers.push({
                            playerId,
                            playerData,
                            latestPoint
                        });
                    }
                });
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
                    visible: true
                };
            });

            setPlayers(generatedPlayers);
        }
    }, [apiData, selectedPrefecture]);



    const periodOptions: PeriodOption[] = useMemo(() => {
        if (!apiData || Object.keys(apiData).length === 0) return [];
        
        return Object.keys(apiData)
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
    }, [apiData]);





    // データ変換: APIデータ → チャート用データ
    const chartData = useMemo(() => {
        if (!apiData.length) return [];


        // ここでデータを加工
        const result: ChartDataPoint[] = [
            { date: "2025-04-01", player1: 150, player2: 50 },
            { date: "2025-05-01", player1: 200, player2: 100 },
            { date: "2025-06-01", player1: 300, player2: 300 },
            { date: "2025-07-01", player1: 450, player2: 550 },
            { date: "2025-08-01", player1: 450, player2: 750 },
            { date: "2025-09-01", player1: 550, player2: 800 },
            { date: "2025-10-01", player1: 750, player2: 900 },
            { date: "2025-11-01", player1: 1000, player2: 1200 }
        ];

        console.log('Chart data created:', result);
        return result;
    }, [apiData, selectedPrefecture]);

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
        borderRadius: '20px',
        margin: '8px',
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
                    <div className="player-panel-section">
                        <PlayerSelectionPanel
                            players={players}
                            onPlayerToggle={handlePlayerToggle}
                        />
                    </div>
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
                    <div className="chart-section">
                        <ChartArea
                            chartData={chartData}
                            players={players}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayerPointsChart;