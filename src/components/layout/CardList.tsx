import { useEffect, useState } from 'react';
import { Card } from '../../types/CardType';
import { getCards } from '../../hooks/cardAPI';
import { List } from 'antd';
import CardComponent from '../common/CardComponent';


const CardList = () => {
    const [ cards, setCards ] = useState<Card[]>([]);
    useEffect(() => {
        getCards(setCards);
    }, [])
    return (
        <div>
            <List
            dataSource={cards.map(card => ({ expansion: card.expansion.name, number: card.number, card: card }))}
            renderItem={(card) => (
                <List.Item>
                    <CardComponent card={card.card} />
                </List.Item>
            )}
            />
        </div>
    )
}

export default CardList;