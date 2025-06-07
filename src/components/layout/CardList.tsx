import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { getCards } from '../../hooks/cardAPI';
import CardComponent from '../common/CardComponent';
import SearchComponent from './SearchComponent';
import { useContexts } from '../../contexts/contexts';

const PAGE_SIZE = 50;

const CardList = () => {
    const {
        cards,
        setCards
    } = useContexts();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getCards(setCards);
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const pagedCards = cards.slice(startIndex, endIndex);

    return (
        <div>
            <SearchComponent />
            <div><p>{cards.length}件HIT</p></div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={PAGE_SIZE}
                    total={cards.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(clamp(90px, 20vw, 150px), 1fr))",
                    gap: "0.5rem",
                    justifyItems: "center",
                    marginBottom: "1rem"
                }}
            >
                {pagedCards.map((card, index) => (
                    <CardComponent
                        key={`${card.number}-${startIndex + index}`}
                        card={card}
                    />
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    current={currentPage}
                    pageSize={PAGE_SIZE}
                    total={cards.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default CardList;