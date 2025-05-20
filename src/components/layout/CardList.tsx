import { useEffect, useState } from 'react';
import { Card } from '../../types/CardType';
import { getCards } from '../../hooks/cardAPI';
import { List } from 'antd';
import { formatThreeDigitString } from '../../util/utils';


const CardList = () => {
    const [ cards, setCards ] = useState<Card[]>([]);
    useEffect(() => {
        getCards(setCards);
    }, [])
    return (
        <div>
            <List
            dataSource={cards.map(card => ({ expansion: card.expansion.name, num: card.number }))}
            renderItem={(card) => (
                <List.Item>
                    <img src={"https://www.onepiece-cardgame.com/images/cardlist/card/" + card.expansion + "-" + formatThreeDigitString(card.num) + ".png"}/>
                </List.Item>
            )}
            />
        </div>
    )
}

export default CardList;