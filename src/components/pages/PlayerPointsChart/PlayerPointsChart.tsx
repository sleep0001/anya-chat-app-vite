// src/components/pages/PlayerPointsChart/PlayerPointsChart.tsx
import { useState, useMemo } from "react";
import { PlayerData, PlayerConfig, ChartDataPoint } from "../../../types";
import { ChartArea, PlayerSelectionPanel } from "../../organisms";
import { usePlayerPoints } from "../../../hooks/usePlayerPoints";
import { ErrorDisplay, Loading } from "../../atoms";

const PlayerPointsChart: React.FC = () => {
    
    // モックデータ（バックエンドから受け取るデータ構造）
    // const mockApiData: PlayerData[] = [
    //     {
    //         name: "アーニャ",
    //         data: [
    //             { date: "2025-04-01", point: 150 },
    //             { date: "2025-05-01", point: 200 },
    //             { date: "2025-06-01", point: 300 },
    //             { date: "2025-07-01", point: 450 },
    //             { date: "2025-08-01", point: 450 },
    //             { date: "2025-09-01", point: 550 },
    //             { date: "2025-10-01", point: 750 },
    //             { date: "2025-11-01", point: 10500 }
    //         ]
    //     },
    //     {
    //         name: "ボンド", 
    //         data: [
    //             { date: "2025-04-01", point: 50 },
    //             { date: "2025-05-01", point: 100 },
    //             { date: "2025-06-01", point: 300 },
    //             { date: "2025-07-01", point: 550 },
    //             { date: "2025-08-01", point: 750 },
    //             { date: "2025-09-01", point: 800 },
    //             { date: "2025-10-01", point: 900 },
    //             { date: "2025-11-01", point: 1200 }
    //         ]
    //     }
    // ];

    const { data: apiData, loading, error } = usePlayerPoints();

    if (loading) return <Loading />;
    if (error) return <ErrorDisplay message={error} />;
    // プレイヤー設定 - より魅力的な色設定に変更
    const [players, setPlayers] = useState<PlayerConfig[]>([
        { 
            id: 'player1', 
            name: 'アーニャ', 
            color: '#ff6b9d', // ピンク系
            gradientColor: '#ffeaa7', // 黄色系
            visible: true 
        },
        { 
            id: 'player2', 
            name: 'ボンド', 
            color: '#74b9ff', // 青系
            gradientColor: '#00cec9', // ターコイズ系
            visible: true 
        }
    ]);

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
    }, [apiData]);

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