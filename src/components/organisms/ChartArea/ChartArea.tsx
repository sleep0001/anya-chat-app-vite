import { CartesianGrid, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartDataPoint, PlayerConfig } from "../../../types";
import { CustomTooltip } from "../../molecules";

export interface ChartAreaProps {
    chartData: ChartDataPoint[];
    players: PlayerConfig[];
}

const ChartArea: React.FC<ChartAreaProps> = ({ chartData, players }) => {

    return (
        <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={chartData} margin={{ top: 20, right: 120, left: 20, bottom: 20 }}>
                    <defs>
                        <linearGradient id="labelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#667eea" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#764ba2" stopOpacity={0.6} />
                        </linearGradient>
                        {players.map(player => (
                            <linearGradient key={player.id} id={`gradient-${player.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={player.color} stopOpacity={0.8} />
                                <stop offset="100%" stopColor={player.gradientColor} stopOpacity={0.4} />
                            </linearGradient>
                        ))}
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        strokeOpacity={0.3}
                        strokeWidth={1}
                    />
                    <XAxis
                        dataKey="date"
                        stroke="#9ca3af"
                        fontSize={12}
                        fontWeight="500"
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                        fontWeight="500"
                        tickLine={false}
                        axisLine={false}
                        label={{
                            value: 'ポイント',
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#9ca3af', fontSize: '14px', fontWeight: '500' }
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    {players
                        .filter(player => player.visible)
                        .map(player => (
                            <Line
                                key={player.id}
                                type="monotone"
                                dataKey={player.id}
                                stroke={`url(#gradient-${player.id})`}
                                strokeWidth={3}
                                dot={{
                                    r: 5,
                                    fill: player.color,
                                    strokeWidth: 2,
                                    stroke: '#1f2937'
                                }}
                                activeDot={{
                                    r: 7,
                                    fill: player.color,
                                    strokeWidth: 3,
                                    stroke: '#ffffff',
                                    className: 'drop-shadow-lg'
                                }}
                                name={player.name}
                            />
                        ))}

                    {players
                        .filter(player => player.visible)
                        .map(player => {
                            const lastData = chartData[chartData.length - 1];
                            const value = lastData?.[player.id] as number;
                            if (!value) return null;

                            return (
                                <ReferenceDot
                                    key={`${player.id}-label`}
                                    x={lastData.date}
                                    y={value}
                                    r={0}
                                />
                            );
                        })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartArea;