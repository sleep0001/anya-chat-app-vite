import { useEffect, useState } from "react";
import { PlayerConfig } from "../../../types";

export interface PlayerSelectionPanelProps {
    players: PlayerConfig[];
    onPlayerToggle: (playerId: string) => void;
}

const PlayerSelectionPanel: React.FC<PlayerSelectionPanelProps> = ({
    players,
    onPlayerToggle
}) => {
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

    const containerStyle: React.CSSProperties = {
        marginBottom: isMobile ? '16px' : '32px',
        padding: isMobile ? '16px' : '24px',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.8) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: isMobile ? '16px' : '24px',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
    };

    const cardContainerStyle: React.CSSProperties = {
        display: 'flex',
        gap: isMobile ? '8px' : '16px',
        flexWrap: 'wrap' as const,
        justifyContent: isMobile ? 'flex-start' : 'center'
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
                <div style={cardContainerStyle}>
                    {players.map(player => {
                        return (
                            <PlayerToggleCardEnhanced
                                key={player.id}
                                player={player}
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
    onToggle: (playerId: string) => void;
}

const PlayerToggleCardEnhanced: React.FC<PlayerToggleCardEnhancedProps> = ({
    player,
    onToggle
}) => {
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

    const cardStyle: React.CSSProperties = {
        minWidth: isMobile ? '140px' : '280px',
        padding: isMobile ? '8px 12px' : '20px 24px',
        flex: isMobile ? '1 1 calc(50% - 8px)' : 'initial',
        maxWidth: isMobile ? 'calc(50% - 8px)' : 'none',
        minHeight: isMobile ? '40px' : '60px',
        height: isMobile ? '40px' : 'auto',
        borderRadius: '16px',
        border: `2px solid ${player.visible ? player.color + '60' : '#374151'}`,
        background: player.visible 
            ? `linear-gradient(135deg, ${player.color}15, ${player.gradientColor}10)`
            : 'rgba(55, 65, 81, 0.5)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative' as const,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
    };

    const headerRowStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: isMobile ? '12px' : '0'
    };

    const playerInfoStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '6px' : '12px'
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
        transition: 'all 0.3s ease',
        flexShrink: 0,
    };

    const playerNameStyle: React.CSSProperties = {
        fontSize: isMobile ? '11px' : '16px',
        fontWeight: isMobile ? '500' : '600',
        color: player.visible ? '#f3f4f6' : '#9ca3af',
        transition: 'color 0.3s ease',
        overflow: 'hidden',
        maxWidth: '200px',
        lineHeight: 1,
    };

    const toggleIndicatorStyle: React.CSSProperties = {
        position: 'absolute' as const,
        top: isMobile ? '6px' : '12px',
        right: isMobile ? '6px' : '12px',
        width: isMobile ? '8px' : '12px',
        height: isMobile ? '8px' : '12px',
        borderRadius: '50%',
        backgroundColor: player.visible ? '#10b981' : '#374151',
        border: isMobile ? '1px solid white' : '2px solid white',
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