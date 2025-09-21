import React from 'react';
import { CardGallery } from '../../organisms';
import { Text } from '../../atoms';
import { Card as CardType } from '../../../types/CardType';

export interface CardSearchPageProps {
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const CardSearchPage: React.FC<CardSearchPageProps> = ({
    style,
    className,
}) => {
    const handleCardClick = (card: CardType) => {
        console.log('Card clicked:', card);
        // 将来的にカード詳細モーダルなどを開く処理を追加
    };

    return (
        <div className={`card-search-page ${className || ''}`} style={style}>
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '24px',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <Text variant="h3" weight="bold" color="primary" style={{ marginBottom: '8px' }}>
                    ワンピースカード検索
                </Text>
                <Text variant="body1" color="secondary">
                    お気に入りのカードを見つけよう！
                </Text>
            </div>
            
            <CardGallery
                pageSize={50}
                pageSizeOptions={[20, 50, 100]}
                showSearch={true}
                autoLoad={true}
                onCardClick={handleCardClick}
            />
        </div>
    );
};

export default CardSearchPage;