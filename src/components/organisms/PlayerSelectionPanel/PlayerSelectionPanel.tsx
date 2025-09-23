import { ChartDataPoint, PlayerConfig } from "../../../types";

export interface PlayerSelectionPanelProps {
    players: PlayerConfig[];
    chartData: ChartDataPoint[];
    onPlayerToggle: (playerId: string) => void;
}

const PlayerSelectionPanel: React.FC<PlayerSelectionPanelProps> = ({
    players,
    chartData,
    onPlayerToggle
}) => {
    const containerStyle: React.CSSProperties = {
        marginBottom: '32px',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.8) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
    };

    const headerStyle: React.CSSProperties = {
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    };

    const indicatorStyle: React.CSSProperties = {
        width: '8px',
        height: '8px',
        backgroundColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'pulse 2s infinite'
    };

    const cardContainerStyle: React.CSSProperties = {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap' as const,
        justifyContent: 'center'
    };

    return (
        <>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
            <div style={containerStyle}>
                <h2 style={headerStyle}>
                    <div style={indicatorStyle} />
                    プレイヤー選択
                </h2>
                <div style={cardContainerStyle}>
                    {players.map(player => {
                        const latestData = chartData[chartData.length - 1];
                        const currentPoints = latestData?.[player.id] as number || 0;

                        return (
                            <PlayerToggleCardEnhanced
                                key={player.id}
                                player={player}
                                currentPoints={currentPoints}
                                onToggle={onPlayerToggle}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

// 拡張されたPlayerToggleCard（ゴールに近づける）
interface PlayerToggleCardEnhancedProps {
    player: PlayerConfig;
    currentPoints: number;
    onToggle: (playerId: string) => void;
}

const PlayerToggleCardEnhanced: React.FC<PlayerToggleCardEnhancedProps> = ({
    player,
    currentPoints,
    onToggle
}) => {
    const cardStyle: React.CSSProperties = {
        minWidth: '280px',
        padding: '20px 24px',
        borderRadius: '16px',
        border: `2px solid ${player.visible ? player.color + '60' : '#374151'}`,
        background: player.visible 
            ? `linear-gradient(135deg, ${player.color}15, ${player.gradientColor}10)`
            : 'rgba(55, 65, 81, 0.5)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative' as const,
        overflow: 'hidden'
    };

    const headerRowStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
    };

    const playerInfoStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    };

    const colorIndicatorStyle: React.CSSProperties = {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: `linear-gradient(45deg, ${player.color}, ${player.gradientColor})`,
        boxShadow: player.visible 
            ? `0 0 12px ${player.color}80, 0 2px 6px rgba(0, 0, 0, 0.3)`
            : '0 2px 4px rgba(0, 0, 0, 0.3)',
        transform: player.visible ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.3s ease'
    };

    const playerNameStyle: React.CSSProperties = {
        fontSize: '16px',
        fontWeight: '600',
        color: player.visible ? '#f3f4f6' : '#9ca3af',
        transition: 'color 0.3s ease'
    };

    const pointsStyle: React.CSSProperties = {
        fontSize: '14px',
        fontWeight: '500',
        color: player.visible ? player.color : '#6b7280',
        textAlign: 'right' as const
    };

    const toggleIndicatorStyle: React.CSSProperties = {
        position: 'absolute' as const,
        top: '12px',
        right: '12px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: player.visible ? '#10b981' : '#374151',
        border: '2px solid white',
        transition: 'all 0.3s ease'
    };

    return (
        <div
            style={cardStyle}
            onClick={() => onToggle(player.id)}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${player.color}40`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={toggleIndicatorStyle} />
            
            <div style={headerRowStyle}>
                <div style={playerInfoStyle}>
                    <div style={colorIndicatorStyle} />
                    <span style={playerNameStyle}>{player.name}</span>
                </div>
            </div>
            
            <div style={pointsStyle}>
                {currentPoints.toLocaleString()} pts
            </div>
            
            {/* 装飾的なグラデーション */}
            {player.visible && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${player.color}, ${player.gradientColor}, transparent)`
                }} />
            )}
        </div>
    );
};

export default PlayerSelectionPanel;