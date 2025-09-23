import { useState, useMemo } from "react";
import { PlayerData, PlayerConfig, ChartDataPoint } from "../../../types";
import { ChartArea, PlayerSelectionPanel } from "../../organisms";
import { DashboardTemplate } from "../../templates";

const PlayerPointsChart: React.FC = () => {
    // モックデータ（バックエンドから受け取るデータ構造）
    const mockApiData: PlayerData[] = [
        {
            name: "アーニャ",
            data: [
                { date: "2025-04-01", point: 150 },
                { date: "2025-05-01", point: 200 },
                { date: "2025-06-01", point: 300 },
                { date: "2025-07-01", point: 450 },
                { date: "2025-08-01", point: 450 },
                { date: "2025-09-01", point: 550 },
                { date: "2025-10-01", point: 750 },
                { date: "2025-11-01", point: 800 }
            ]
        },
        {
            name: "ボンド",
            data: [
                { date: "2025-04-01", point: 50 },
                { date: "2025-05-01", point: 100 },
                { date: "2025-06-01", point: 300 },
                { date: "2025-07-01", point: 550 },
                { date: "2025-08-01", point: 750 },
                { date: "2025-09-01", point: 800 },
                { date: "2025-10-01", point: 900 },
                { date: "2025-11-01", point: 1000 }
            ]
        }
    ];

    // プレイヤー設定
    const [players, setPlayers] = useState<PlayerConfig[]>([
        { id: 'player1', name: 'アーニャ', color: '#667eea', gradientColor: '#764ba2', visible: true },
        { id: 'player2', name: 'ボンド', color: '#f093fb', gradientColor: '#f5576c', visible: true }
    ]);

    // データ変換: APIデータ → チャート用データ
    const chartData = useMemo(() => {
        if (!mockApiData.length) return [];

        // すべての日付を取得
        const allDates = Array.from(
            new Set(mockApiData.flatMap(player => player.data.map(d => d.date)))
        ).sort();

        // 日付ごとにデータをマージ
        return allDates.map(date => {
            const dataPoint: ChartDataPoint = { date };

            mockApiData.forEach((playerData, index) => {
                const playerId = `player${index + 1}`;
                const pointData = playerData.data.find(d => d.date === date);
                dataPoint[playerId] = pointData?.point || 0;
            });

            return dataPoint;
        });
    }, [mockApiData]);

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

    return (
        <DashboardTemplate
            title="ポイント推移"
            subtitle=""
        >
            <PlayerSelectionPanel
                players={players}
                chartData={chartData}
                onPlayerToggle={handlePlayerToggle}
            />

            <ChartArea
                chartData={chartData}
                players={players}
            />

            {/* <StatsPanel
                players={players}
                chartData={chartData}
            /> */}
        </DashboardTemplate>
    );
};

export default PlayerPointsChart;