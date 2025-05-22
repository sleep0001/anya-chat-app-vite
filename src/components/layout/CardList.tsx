import { useEffect, useState } from 'react';
import { Card } from '../../types/CardType';
import { getCards } from '../../hooks/cardAPI';
import { List } from 'antd';
import CardComponent from '../common/CardComponent';


const CardList = () => {
    const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        getCards(setCards);
    }, [])
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "1rem"
            }}
        >
            {cards.map(card => (
                <CardComponent key={card.number} card={card} />
            ))}
        </div>
    )
}

export default CardList;