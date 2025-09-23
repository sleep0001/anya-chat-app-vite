export interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900/95 backdrop-blur-sm p-4 border border-gray-700 rounded-xl shadow-2xl">
                <p className="font-semibold mb-3 text-gray-100 text-sm">{label}</p>
                {payload
                    .filter((entry: any) => entry.value !== undefined)
                    .map((entry: any, index: number) => (
                        <div key={index} className="flex items-center mb-2 last:mb-0">
                            <div
                                className="w-3 h-3 rounded-full mr-3"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-gray-200 text-sm font-medium">
                                {entry.name}: <span className="text-white font-bold">{entry.value}</span> pts
                            </span>
                        </div>
                    ))}
            </div>
        );
    }
    return null;
};

export default CustomTooltip;