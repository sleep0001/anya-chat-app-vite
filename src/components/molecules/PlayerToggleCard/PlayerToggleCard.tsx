import { PlayerConfig } from "../../../types";
import { Checkbox, ColorIndicator } from "../../atoms";

export interface PlayerToggleCardProps {
    player: PlayerConfig;
    // currentPoints: number;
    onToggle: (playerId: string) => void;
}

const PlayerToggleCard: React.FC<PlayerToggleCardProps> = ({
    player,
    // currentPoints,
    onToggle
}) => (
    <label className="group cursor-pointer">
        <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${player.visible
            ? 'border-gray-600 bg-gray-700/50 shadow-lg'
            : 'border-gray-800 bg-gray-800/30'
            } hover:border-gray-500 hover:shadow-xl`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center mb-2">
                    <Checkbox
                        checked={player.visible}
                        onChange={() => onToggle(player.id)}
                    />
                    <ColorIndicator
                        color={player.color}
                        gradientColor={player.gradientColor}
                        visible={player.visible}
                    />
                    <span className={`text-sm font-medium transition-colors duration-300 ${player.visible ? 'text-gray-200' : 'text-gray-500'
                        }`}>
                        {player.name}
                    </span>
                </div>
            </div>
        </div>
    </label>
);

export default PlayerToggleCard;