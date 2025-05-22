import { Card } from "../../types/CardType";
import { formatThreeDigitString } from "../../util/utils";

type Props = {
    card: Card;
}

const CardComponent = ({ card }: Props) => {
    return (
        <div>
            <img
                src={"https://www.onepiece-cardgame.com/images/cardlist/card/" + card.expansion.name + "-" + formatThreeDigitString(card.number) + ".png"}
                alt={card.name}
                style={{ width:"150px", height:"auto" }}
            />
        </div>
    )
}

export default CardComponent;