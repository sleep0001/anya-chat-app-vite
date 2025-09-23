import { ChartDataPoint, PlayerConfig } from "../../../types";
import { PlayerToggleCard } from "../../molecules";

export interface PlayerSelectionPanelProps {
    players: PlayerConfig[];
    chartData: ChartDataPoint[];
    onPlayerToggle: (playerId: string) => void;
}

const PlayerSelectionPanel: React.FC<PlayerSelectionPanelProps> = ({
    players,
    chartData,
    onPlayerToggle
}) => (
    <div className="mb-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
            プレイヤー
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {players.map(player => {
                const latestData = chartData[chartData.length - 1];
                const currentPoints = latestData?.[player.id] as number || 0;

                return (
                    <PlayerToggleCard
                        key={player.id}
                        player={player}
                        // currentPoints={currentPoints}
                        onToggle={onPlayerToggle}
                    />
                );
            })}
        </div>
    </div>
);

export default PlayerSelectionPanel;