import { useEffect } from 'react';
import { getCards } from '../../hooks/cardAPI';
import CardComponent from '../common/CardComponent';
import SearchComponent from './SearchComponent';
import { useContexts } from '../../contexts/contexts';


const CardList = () => {
    const {
        cards,
        setCards
    } = useContexts();

    useEffect(() => {
        getCards(setCards);
    }, [])
    return (
        <div>
            <SearchComponent />
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
        </div>
    )
}

export default CardList;