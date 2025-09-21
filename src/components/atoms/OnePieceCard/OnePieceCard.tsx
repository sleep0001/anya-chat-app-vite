import React, { useState } from 'react';
import { Card as CardType } from '../../../types/CardType';
import { formatThreeDigitString } from '../../../util/utils';

interface OnePieceCardProps {
    card: CardType;
    size?: 'small' | 'medium' | 'large';
    showDetails?: boolean;
    onClick?: () => void;
}

const OnePieceCard: React.FC<OnePieceCardProps> = ({ 
    card, 
    size = 'medium',
    showDetails = false,
    onClick 
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // サイズ別スタイル
    const getSizeStyles = (size: string) => {
        const sizeMap = {
            small: { maxWidth: '90px', borderRadius: '6px' },
            medium: { maxWidth: '150px', borderRadius: '8px' },
            large: { maxWidth: '200px', borderRadius: '12px' },
        };
        return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
    };

    const imageUrl = `https://www.onepiece-cardgame.com/images/cardlist/card/${card.expansion.name}-${formatThreeDigitString(card.number)}.png`;
    
    const containerStyle: React.CSSProperties = {
        ...getSizeStyles(size),
        width: '100%',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: 'auto',
        display: imageLoaded ? 'block' : 'none',
        borderRadius: getSizeStyles(size).borderRadius,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const placeholderStyle: React.CSSProperties = {
        width: '100%',
        aspectRatio: '63/88', // 一般的なカードの縦横比
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: getSizeStyles(size).borderRadius,
        color: '#999',
        fontSize: size === 'small' ? '10px' : size === 'large' ? '14px' : '12px',
    };

    const overlayStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        color: 'white',
        padding: size === 'small' ? '4px' : '8px',
        fontSize: size === 'small' ? '10px' : '12px',
        opacity: showDetails ? 1 : 0,
        transition: 'opacity 0.3s ease',
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(false);
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div 
            style={containerStyle}
            onClick={handleClick}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                }
            }}
            onMouseLeave={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }
            }}
        >
            {!imageLoaded && !imageError && (
                <div style={placeholderStyle}>
                    読み込み中...
                </div>
            )}
            
            {imageError && (
                <div style={placeholderStyle}>
                    <div style={{ textAlign: 'center' }}>
                        <div>{card.name}</div>
                        <div style={{ fontSize: '10px', marginTop: '4px' }}>
                            {card.expansion.name}-{formatThreeDigitString(card.number)}
                        </div>
                    </div>
                </div>
            )}
            
            {!imageError && (
                <img
                    src={imageUrl}
                    alt={card.name}
                    style={imageStyle}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
            
            {showDetails && imageLoaded && (
                <div style={overlayStyle}>
                    <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                        {card.name}
                    </div>
                    <div>
                        コスト: {card.cost} | パワー: {card.power}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OnePieceCard;