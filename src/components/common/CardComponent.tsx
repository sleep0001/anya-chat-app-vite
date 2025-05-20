import { Card } from "../../types/CardType";

const CardComponent = (card:Card) => {
    return (
        <div>
            <img
                src={"https://www.onepiece-cardgame.com/images/cardlist/card/" + card.expansion + "-" + card.number + ".png"}
                alt={card.name}
            />
        </div>
    )
}

export default CardComponent;