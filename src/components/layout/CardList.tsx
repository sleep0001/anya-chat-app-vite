import { useEffect, useState } from 'react';
import { Card } from '../../types/CardType';
import { getCards } from '../../hooks/cardAPI';
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
                gridTemplateColumns: "repeat(auto-fit, minmax(clamp(90px, 20vw, 150px), 1fr))",
                gap: "0.5rem",
                justifyItems: "center",
            }}
        >
            {cards.map(card => (
                <CardComponent key={card.number} card={card} />
            ))}
        </div>
    )
}

export default CardList;