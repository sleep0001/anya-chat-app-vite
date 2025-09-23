import { PlayerConfig } from "../../../types";
import { ColorIndicator, StatCardValue } from "../../atoms";

export interface StatCardProps {
    player: PlayerConfig;
    currentPoints: number;
    totalGrowth: number;
    growthPercentage: string;
}

const StatCard: React.FC<StatCardProps> = ({
    player,
    currentPoints,
    totalGrowth,
    growthPercentage
}) => (
    <div className="group bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center mb-4">
            <ColorIndicator
                color={player.color}
                gradientColor={player.gradientColor}
            />
            <span className="font-bold text-gray-200 text-lg">{player.name}</span>
        </div>
        <div className="space-y-3">
            <div>
                <p className="text-gray-400 text-sm mb-1">現在のポイント</p>
                <StatCardValue value={currentPoints} unit="pts" />
            </div>
            <div>
                <p className="text-gray-400 text-sm mb-1">成長率</p>
                <p className={`text-lg font-semibold ${totalGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    +{totalGrowth} pts (+{growthPercentage}%)
                </p>
            </div>
        </div>
    </div>
);

export default StatCard;