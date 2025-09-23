// src/components/molecules/CustomTooltip/CustomTooltip.tsx
import React from 'react';

export interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const containerStyle: React.CSSProperties = {
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)', // Safari対応
            padding: '16px 20px',
            border: '1px solid rgba(75, 85, 99, 0.4)',
            borderRadius: '16px',
            boxShadow: `
                0 20px 25px -5px rgba(0, 0, 0, 0.4),
                0 10px 10px -5px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            minWidth: '200px',
            position: 'relative' as const,
            zIndex: 1000,
            animation: 'tooltipFadeIn 0.2s ease-out'
        };

        const labelStyle: React.CSSProperties = {
            fontWeight: '600',
            marginBottom: '12px',
            color: '#f3f4f6',
            fontSize: '14px',
            textAlign: 'center' as const,
            borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
            paddingBottom: '8px'
        };

        const itemStyle: React.CSSProperties = {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            padding: '4px 0',
            transition: 'all 0.2s ease'
        };

        const dotStyle = (color: string): React.CSSProperties => ({
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: color,
            marginRight: '12px',
            flexShrink: 0,
            boxShadow: `0 0 8px ${color}60, 0 2px 4px rgba(0, 0, 0, 0.3)`,
            border: '2px solid rgba(255, 255, 255, 0.2)'
        });

        const textStyle: React.CSSProperties = {
            color: '#e5e7eb',
            fontSize: '13px',
            fontWeight: '500',
            flex: 1
        };

        const valueStyle: React.CSSProperties = {
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '700',
            marginLeft: '8px'
        };

        return (
            <>
                <style>{`
                    @keyframes tooltipFadeIn {
                        0% { opacity: 0; transform: translateY(8px) scale(0.95); }
                        100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    
                    .tooltip-item:hover {
                        background-color: rgba(75, 85, 99, 0.2);
                        border-radius: 8px;
                        transform: translateX(2px);
                    }
                `}</style>
                <div style={containerStyle}>
                    <p style={labelStyle}>{label}</p>
                    {payload
                        .filter((entry: any) => entry.value !== undefined && entry.value !== null)
                        .sort((a: any, b: any) => b.value - a.value) // 降順でソート
                        .map((entry: any, index: number) => (
                            <div 
                                key={index} 
                                className="tooltip-item" 
                                style={{
                                    ...itemStyle,
                                    ...(index === payload.length - 1 && { marginBottom: 0 })
                                }}
                            >
                                <div style={dotStyle(entry.color)} />
                                <span style={textStyle}>
                                    {entry.name}:
                                </span>
                                <span style={valueStyle}>
                                    {typeof entry.value === 'number' 
                                        ? entry.value.toLocaleString() 
                                        : entry.value} pts
                                </span>
                            </div>
                        ))}
                    
                    {/* 装飾用のグラデーション */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5), transparent)',
                        borderRadius: '16px 16px 0 0'
                    }} />
                </div>
            </>
        );
    }
    return null;
};

export default CustomTooltip;