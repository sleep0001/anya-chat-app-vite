import { ChartDataPoint, PlayerConfig } from "../../../types";
import { StatCard } from "../../molecules";

export interface StatsPanelProps {
    players: PlayerConfig[];
    chartData: ChartDataPoint[];
}

const StatsPanel: React.FC<StatsPanelProps> = ({ players, chartData }) => (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {players.map(player => {
            const latestData = chartData[chartData.length - 1];
            const firstData = chartData[0];
            const currentPoints = latestData?.[player.id] as number || 0;
            const initialPoints = firstData?.[player.id] as number || 0;
            const totalGrowth = currentPoints - initialPoints;
            const growthPercentage = initialPoints > 0
                ? ((totalGrowth / initialPoints) * 100).toFixed(1)
                : '0.0';

            return (
                <StatCard
                    key={player.id}
                    player={player}
                    currentPoints={currentPoints}
                    totalGrowth={totalGrowth}
                    growthPercentage={growthPercentage}
                />
            );
        })}
    </div>
);

export default StatsPanel;