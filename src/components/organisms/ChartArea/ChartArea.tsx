// src/components/organisms/ChartArea/ChartArea.tsx
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { ChartDataPoint, PlayerConfig } from "../../../types";
import { CustomTooltip } from "../../molecules";

export interface ChartAreaProps {
    chartData: ChartDataPoint[];
    players: PlayerConfig[];
}

const ChartArea: React.FC<ChartAreaProps> = ({ chartData, players }) => {
    // 色の生成とグラデーション定義
    const gradientDefs = players.map(player => (
        <linearGradient key={`gradient-${player.id}`} id={`gradient-${player.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={player.color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={player.gradientColor} stopOpacity={0.4} />
        </linearGradient>
    ));

    // カスタムレジェンド
    const CustomLegend = ({ payload }: any) => (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginTop: '16px'
        }}>
            {payload?.map((entry: any, index: number) => {
                const player = players.find(p => p.name === entry.value);
                if (!player || !player.visible) return null;
                
                return (
                    <div 
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(4px)',
                            border: `1px solid ${player.color}40`
                        }}
                    >
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: `linear-gradient(45deg, ${player.color}, ${player.gradientColor})`,
                                boxShadow: `0 2px 6px ${player.color}60`
                            }}
                        />
                        <span style={{
                            color: '#e5e7eb',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            {entry.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );

    const containerStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, rgba(30, 20, 60, 0.95) 0%, rgba(50, 30, 80, 0.9) 50%, rgba(70, 40, 100, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', // Safari対応
        padding: '32px',
        borderRadius: '24px',
        border: '1px solid rgba(147, 51, 234, 0.2)',
        boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.6),
            0 10px 20px -5px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
        position: 'relative' as const,
        overflow: 'hidden'
    };

    // アニメーション付きグラデーション背景
    const backgroundOverlayStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
            radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
        `,
        animation: 'gradientShift 12s ease-in-out infinite alternate',
        pointerEvents: 'none' as const,
        zIndex: 0
    };

    // 日付フォーマット関数（オプション）
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}/${date.getDate()}`;  // MM/DD形式
    };

    // ChartAreaコンポーネント内で間隔を計算
    const getXAxisInterval = () => {
        const dataLength = chartData.length;
        if (dataLength <= 7) return 0;        // 7個以下なら全て表示
        if (dataLength <= 14) return 1;       // 14個以下なら1つおきに表示
        if (dataLength <= 30) return 2;       // 30個以下なら2つおきに表示
        if (dataLength <= 60) return 4;       // 60個以下なら4つおきに表示
        return Math.floor(dataLength / 10);   // それ以上は10個程度に間引く
    };

    // チャートの最小高さを設定（ラベルの行数に応じて調整）
    const getChartHeight = () => {
        const visiblePlayerCount = players.filter(p => p.visible).length;
        const legendRows = Math.ceil(visiblePlayerCount / 4); // 1行に4つのラベルと仮定
        const baseHeight = 400; // グラフ本体の基本高さ
        const legendHeight = legendRows * 40; // 各行40pxと仮定
        const marginHeight = 100; // 上下のマージン
        return baseHeight + legendHeight + marginHeight;
    };
    return (
        <>
            <style>{`
                @keyframes gradientShift {
                    0% { opacity: 0.3; transform: rotate(0deg) scale(1); }
                    100% { opacity: 0.6; transform: rotate(1deg) scale(1.02); }
                }
                
                @keyframes pulseGlow {
                    0%, 100% { filter: brightness(1) drop-shadow(0 0 5px currentColor); }
                    50% { filter: brightness(1.2) drop-shadow(0 0 15px currentColor); }
                }
                
                .chart-grid-line {
                    stroke-dasharray: 3 3;
                    stroke: #4b5563;
                    stroke-opacity: 0.4;
                    stroke-width: 1;
                }
                
                .chart-axis-text {
                    fill: #d1d5db;
                    font-size: 12px;
                    font-weight: 500;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }
                
                .chart-axis-label {
                    fill: #9ca3af;
                    font-size: 14px;
                    font-weight: 600;
                    text-anchor: middle;
                }
                
                .chart-line-path {
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
                
                .chart-dot-default {
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
                    stroke-width: 2;
                    stroke: #1f2937;
                    transition: all 0.3s ease;
                }
                
                .chart-dot-active {
                    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6));
                    stroke-width: 3;
                    stroke: #ffffff;
                    animation: pulseGlow 2s ease-in-out infinite;
                    transform-origin: center;
                    transform: scale(1.2);
                }
                
                .recharts-tooltip-wrapper {
                    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
                }
            `}</style>
            
            <div style={containerStyle}>
                <div style={backgroundOverlayStyle} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <ResponsiveContainer width="100%" height={getChartHeight()}>
                        <LineChart 
                            data={chartData} 
                            margin={{ top: 20, right: 120, left: 20, bottom: 60 }}
                            syncId="chart"
                        >
                            <defs>
                                <linearGradient id="labelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#667eea" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#764ba2" stopOpacity={0.6} />
                                </linearGradient>
                                {gradientDefs}
                            </defs>

                            <CartesianGrid
                                className="chart-grid-line"
                                strokeDasharray="3 3"
                                stroke="#4b5563"
                                strokeOpacity={0.3}
                                strokeWidth={1}
                            />
                            
                            <XAxis
                                dataKey="date"
                                className="chart-axis-text"
                                tick={{ 
                                    fill: '#d1d5db', 
                                    fontSize: 12, 
                                    fontWeight: 500 
                                }}
                                tickLine={false}
                                axisLine={false}
                                type="category"
                                angle={-45}
                                textAnchor="end"
                                height={60}
                                allowDuplicatedCategory={false}
                                tickFormatter={formatDate}
                                interval={getXAxisInterval()}
                            />
                            
                            <YAxis
                                className="chart-axis-text"
                                tick={{ 
                                    fill: '#d1d5db', 
                                    fontSize: 12, 
                                    fontWeight: 500 
                                }}
                                tickLine={false}
                                axisLine={false}
                                type="number"
                                domain={[0, 'dataMax + 50']}
                                label={{
                                    value: 'ポイント',
                                    angle: -90,
                                    position: 'insideLeft',
                                    className: 'chart-axis-label',
                                    style: { 
                                        textAnchor: 'middle', 
                                        fill: '#9ca3af', 
                                        fontSize: '14px', 
                                        fontWeight: '600' 
                                    }
                                }}
                            />
                            
                            <Tooltip 
                                content={<CustomTooltip />}
                                wrapperStyle={{
                                    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
                                    zIndex: 1000
                                }}
                                cursor={{ 
                                    stroke: 'rgba(255, 255, 255, 0.2)', 
                                    strokeWidth: 1,
                                    strokeDasharray: '3 3'
                                }}
                                position={{ x: undefined, y: undefined }}
                                allowEscapeViewBox={{ x: false, y: false }}
                            />
                            
                            <Legend 
                                content={<CustomLegend />}
                                wrapperStyle={{
                                    paddingTop: '20px'
                                }}
                            />

                            {players
                                .filter(player => player.visible)
                                .map(player => (
                                    <Line
                                        key={player.id}
                                        type="monotone"
                                        dataKey={player.id}
                                        stroke={`url(#gradient-${player.id})`}
                                        strokeWidth={3}
                                        className="chart-line-path"
                                        dot={false}
                                        activeDot={{  // ホバー時のみドットを表示
                                            r: 2,
                                            fill: player.color,
                                            stroke: '#ffffff',
                                            strokeWidth: 1,
                                        }}
                                        name={player.name}
                                        connectNulls={true}
                                        isAnimationActive={true}
                                    />
                                ))}


                        </LineChart>
                    </ResponsiveContainer>
                    
                    {/* 現在のポイント表示を削除（プレイヤー選択パネルに統合するため） */}
                </div>
            </div>
        </>
    );
};

export default ChartArea;