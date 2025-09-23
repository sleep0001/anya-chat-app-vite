// src/components/organisms/ChartArea/ChartArea.tsx
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { ChartDataPoint, PlayerConfig } from "../../../types";
import { CustomTooltip } from "../../molecules";
import { useEffect, useMemo, useState } from "react";

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
    // 画面サイズを検知
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // X軸の間隔を動的に設定
    const getXAxisInterval = () => {
        const dataLength = chartData.length;
        if (isMobile) {
            // モバイルではより積極的に間引く
            if (dataLength <= 5) return 0;
            if (dataLength <= 10) return 2;
            return Math.ceil(dataLength / 5);
        }
        // デスクトップ用
        if (dataLength <= 7) return 0;
        if (dataLength <= 14) return 1;
        if (dataLength <= 30) return Math.ceil(dataLength / 15);
        return Math.ceil(dataLength / 10);
    };

    // 日付フォーマット
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return isMobile 
            ? `${date.getMonth() + 1}/${date.getDate()}`  // モバイル: MM/DD
            : dateStr;  // デスクトップ: そのまま
    };

    // コンテナスタイル（モバイル対応）
    const containerStyle: React.CSSProperties = {
        background: 'linear-gradient(135deg, rgba(30, 20, 60, 0.95) 0%, rgba(50, 30, 80, 0.9) 50%, rgba(70, 40, 100, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: isMobile ? '16px' : '32px',  // モバイルではパディングを減らす
        borderRadius: '24px',
        border: '1px solid rgba(147, 51, 234, 0.2)',
        boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.6),
            0 10px 20px -5px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
        position: 'relative' as const,
        overflow: 'hidden',
        width: '100%',  // 幅を100%に
        boxSizing: 'border-box' as const,  // パディングを含めたサイズ計算
    };

    // カスタムレジェンド（モバイル対応）
    const CustomLegend = ({ payload }: any) => (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '12px' : '24px',
            flexWrap: 'wrap',
            marginTop: isMobile ? '8px' : '16px',
            padding: isMobile ? '0 8px' : '0',
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
                            padding: isMobile ? '4px 8px' : '6px 12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(4px)',
                            border: `1px solid ${player.color}40`,
                            fontSize: isMobile ? '12px' : '14px',  // モバイルでフォントサイズ調整
                            maxWidth: isMobile ? '100%' : 'none',  // モバイルで幅制限
                        }}
                    >
                        <div
                            style={{
                                width: isMobile ? '10px' : '12px',
                                height: isMobile ? '10px' : '12px',
                                borderRadius: '50%',
                                background: `linear-gradient(45deg, ${player.color}, ${player.gradientColor})`,
                                boxShadow: `0 2px 6px ${player.color}60`,
                                flexShrink: 0,
                            }}
                        />
                        <span style={{
                            color: '#e5e7eb',
                            fontSize: isMobile ? '12px' : '14px',
                            fontWeight: '500',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                            {entry.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );

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

    // チャートの最小高さを設定（ラベルの行数に応じて調整）
    const chartHeight = useMemo(() => {
        const visiblePlayerCount = players.filter(p => p.visible).length;
        
        // モバイルとデスクトップで異なる計算
        if (isMobile) {
            // モバイル: より小さいレジェンドサイズと基本高さ
            const legendItemsPerRow = 2; // モバイルでは1行に2つ
            const legendRows = Math.ceil(visiblePlayerCount / legendItemsPerRow);
            const baseHeight = 400; // モバイル用基本高さ
            const legendHeight = legendRows * 35; // 各行35px
            const marginHeight = 80; // モバイル用マージン
            return baseHeight + legendHeight + marginHeight;
        } else {
            // デスクトップ: 元の計算
            const legendItemsPerRow = 4; // デスクトップでは1行に4つ
            const legendRows = Math.ceil(visiblePlayerCount / legendItemsPerRow);
            const baseHeight = 400; // グラフ本体の基本高さ
            const legendHeight = legendRows * 40; // 各行40px
            const marginHeight = 100; // 上下のマージン
            return baseHeight + legendHeight + marginHeight;
        }
    }, [players, isMobile]); // playersとisMobileの変化を監視

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

                @media (max-width: 768px) {
                    .recharts-wrapper {
                        font-size: 10px !important;
                    }
                    
                    .recharts-cartesian-axis-tick-value {
                        font-size: 10px !important;
                    }
                    
                    .recharts-label {
                        font-size: 12px !important;
                    }
                }
            `}</style>
            
            <div style={containerStyle}>
                <div style={backgroundOverlayStyle} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <ResponsiveContainer width="100%" height={chartHeight}>
                        <LineChart 
                            data={chartData} 
                            margin={isMobile 
                                ? { top: 10, right: 20, left: 10, bottom: 10 }
                                : { top: 20, right: 80, left: 20, bottom: 60 }
                            }
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
                                width={isMobile ? 40 : 60}  // モバイルで幅を調整
                                label={isMobile ? undefined : {  // モバイルではラベルを非表示
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
                                    paddingTop: '20px',
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
                                        strokeWidth={isMobile ? 2 : 3}  // モバイルで線を細く
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