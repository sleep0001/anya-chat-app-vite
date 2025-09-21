import React, { useEffect, useState, useMemo } from 'react';
import { Pagination, Select } from 'antd';
import { useContexts } from '../../../contexts/contexts';
import { getCards } from '../../../hooks/cardAPI';
import { OnePieceCard } from '../../atoms';
import { Text } from '../../atoms';
import { Card as CardType } from '../../../types/CardType';
import CardSearch from '../CardSearch/CardSearch';

const { Option } = Select;

export interface CardGalleryProps {
    /** 1ページあたりの表示件数 */
    pageSize?: number;
    /** 利用可能なページサイズオプション */
    pageSizeOptions?: number[];
    /** 検索機能を表示するか */
    showSearch?: boolean;
    /** 初期読み込みを自動実行するか */
    autoLoad?: boolean;
    /** カードクリック時のハンドラー */
    onCardClick?: (card: CardType) => void;
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const CardGallery: React.FC<CardGalleryProps> = ({
    pageSize: defaultPageSize = 50,
    pageSizeOptions = [20, 50, 100],
    showSearch = true,
    autoLoad = true,
    onCardClick,
    style,
    className,
}) => {
    const { cards, setCards } = useContexts();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // 初回読み込み
    useEffect(() => {
        if (autoLoad && cards.length === 0) {
            setLoading(true);
            getCards(setCards).finally(() => setLoading(false));
        }
    }, [autoLoad, cards.length, setCards]);

    // ページネーション計算
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return cards.slice(startIndex, endIndex);
    }, [cards, currentPage, pageSize]);

    // ページ変更ハンドラー
    const handlePageChange = (page: number, size?: number) => {
        setCurrentPage(page);
        if (size && size !== pageSize) {
            setPageSize(size);
            setCurrentPage(1); // ページサイズ変更時は1ページ目に戻る
        }
    };

    // ページサイズ変更ハンドラー
    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    // 検索時のハンドラー
    const handleSearch = () => {
        setCurrentPage(1); // 検索時は1ページ目に戻る
    };

    // グリッドスタイル
    const getGridStyle = () => ({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(clamp(90px, 20vw, 150px), 1fr))",
        gap: "0.75rem",
        justifyItems: "center",
        padding: "16px 0"
    });

    // リストスタイル
    const getListStyle = () => ({
        display: "flex",
        flexDirection: "column" as const,
        gap: "12px",
        padding: "16px 0"
    });

    const containerStyle: React.CSSProperties = {
        ...style,
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '12px',
    };

    const statsStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
    };

    const controlsStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    };

    const paginationStyle: React.CSSProperties = {
        display: 'flex', 
        justifyContent: 'center',
        margin: '20px 0'
    };

    const emptyStateStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: '#fafafa',
        borderRadius: '12px',
        border: '2px dashed #d9d9d9',
    };

    if (loading) {
        return (
            <div className={`card-gallery-organism ${className || ''}`} style={containerStyle}>
                <div style={emptyStateStyle}>
                    <Text variant="h5" color="secondary" style={{ marginBottom: '12px' }}>
                        🔄 カード情報を読み込み中...
                    </Text>
                    <Text variant="body2" color="secondary">
                        しばらくお待ちください
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div className={`card-gallery-organism ${className || ''}`} style={containerStyle}>
            {/* 検索セクション */}
            {showSearch && (
                <div style={{ marginBottom: '24px' }}>
                    <CardSearch onSearch={handleSearch} />
                </div>
            )}

            {/* ヘッダー：統計情報とコントロール */}
            <div style={headerStyle}>
                <div style={statsStyle}>
                    <Text variant="h6" weight="semibold" color="primary">
                        📊 検索結果
                    </Text>
                    <Text variant="body1" weight="medium" color="success">
                        {cards.length}件 HIT
                    </Text>
                    {cards.length > 0 && (
                        <Text variant="body2" color="secondary">
                            ({((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, cards.length)}件を表示)
                        </Text>
                    )}
                </div>

                <div style={controlsStyle}>
                    {/* 表示件数選択 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Text variant="body2" color="secondary">表示件数:</Text>
                        <Select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            size="small"
                            style={{ width: 80 }}
                        >
                            {pageSizeOptions.map(size => (
                                <Option key={size} value={size}>{size}</Option>
                            ))}
                        </Select>
                    </div>

                    {/* 表示モード切替 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Text variant="body2" color="secondary">表示:</Text>
                        <Select
                            value={viewMode}
                            onChange={setViewMode}
                            size="small"
                            style={{ width: 80 }}
                        >
                            <Option value="grid">🔲 グリッド</Option>
                            <Option value="list">📋 リスト</Option>
                        </Select>
                    </div>
                </div>
            </div>

            {/* 上部ページネーション */}
            {cards.length > pageSize && (
                <div style={paginationStyle}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={cards.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        showQuickJumper
                        showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}件`}
                    />
                </div>
            )}

            {/* カード一覧 */}
            {cards.length === 0 ? (
                <div style={emptyStateStyle}>
                    <Text variant="h5" color="secondary" style={{ marginBottom: '12px' }}>
                        🃏 カードが見つかりませんでした
                    </Text>
                    <Text variant="body2" color="secondary">
                        検索条件を変更するか、「検索」ボタンを押してカードを読み込んでください
                    </Text>
                </div>
            ) : (
                <div style={viewMode === 'grid' ? getGridStyle() : getListStyle()}>
                    {paginatedData.map((card, index) => (
                        <div key={`${card.number}-${((currentPage - 1) * pageSize) + index}`}>
                            <OnePieceCard
                                card={card}
                                size={viewMode === 'grid' ? 'medium' : 'small'}
                                showDetails={viewMode === 'list'}
                                onClick={onCardClick ? () => onCardClick(card) : undefined}
                            />
                            {viewMode === 'list' && (
                                <div style={{ 
                                    marginTop: '8px', 
                                    padding: '8px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '6px' 
                                }}>
                                    <Text variant="body2" weight="semibold" style={{ marginBottom: '4px' }}>
                                        {card.name}
                                    </Text>
                                    <Text variant="caption" color="secondary">
                                        コスト: {card.cost} | パワー: {card.power} | タイプ: {card.type.name}
                                    </Text>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* 下部ページネーション */}
            {cards.length > pageSize && (
                <div style={paginationStyle}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={cards.length}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        showQuickJumper
                        showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}件`}
                    />
                </div>
            )}
        </div>
    );
};

export default CardGallery;