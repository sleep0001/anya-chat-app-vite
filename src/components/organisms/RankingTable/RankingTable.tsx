import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Text, Icon, Badge } from '../../atoms';

export interface RankingPlayer {
    id: number | string;
    rank: number;
    name: string;
    point: number;
    prefecture?: string;
    allRank?: number;
    rankDiff?: number;
    pointDiff?: number;
    [key: string]: any;
}

export interface RankingTableProps {
    /** ランキングデータ */
    data: RankingPlayer[];
    /** テーブルタイトル */
    title?: string;
    /** ローディング状態 */
    loading?: boolean;
    /** 都道府県カラムを表示するか */
    showPrefecture?: boolean;
    /** 全国順位カラムを表示するか */
    showAllRank?: boolean;
    /** 変動カラムを表示するか */
    showDiff?: boolean;
    /** 最大表示件数 */
    maxItems?: number;
    /** ページネーション */
    pagination?: boolean;
    /** テーマカラー */
    themeColor?: string;
    /** カスタムカラム */
    extraColumns?: ColumnsType<RankingPlayer>;
    /** 行クリックハンドラー */
    onRowClick?: (player: RankingPlayer) => void;
    /** カスタムスタイル */
    style?: React.CSSProperties;
}

const RankingTable: React.FC<RankingTableProps> = ({
    data,
    title = "ランキング",
    loading = false,
    showPrefecture = false,
    showAllRank = false,
    showDiff = false,
    maxItems = 100,
    pagination = false,
    themeColor = "#f4b3bb",
    extraColumns = [],
    onRowClick,
    style,
}) => {
    // 順位レンダー
    const renderRank = (rank: number) => {
        const rankElement = <Text variant="body1" weight="bold">{rank}</Text>;
        
        if (rank === 1) {
            return (
                <span style={{ color: '#d4af37', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon name="crown" color="#d4af37" size="small" />
                    {rankElement}
                </span>
            );
        }
        if (rank === 2) {
            return (
                <span style={{ color: '#c0c0c0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon name="crown" color="#c0c0c0" size="small" />
                    {rankElement}
                </span>
            );
        }
        if (rank === 3) {
            return (
                <span style={{ color: '#cd7f32', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon name="crown" color="#cd7f32" size="small" />
                    {rankElement}
                </span>
            );
        }
        return rankElement;
    };

    // 変動レンダー
    const renderDiff = (diff: number, isRank: boolean = false) => {
        if (diff === 2147483647) {
            return <Badge variant="success">new!!</Badge>;
        }
        
        if (diff === 0) {
            return <Badge variant="default">±0</Badge>;
        }
        
        const isPositive = diff > 0;
        const absValue = Math.abs(diff);
        const icon = isRank 
            ? (isPositive ? 'arrow-up' : 'arrow-down')
            : (isPositive ? 'arrow-up' : 'arrow-down');
        
        // ランキングの場合、上昇は順位が上がる（数字が小さくなる）ので色を逆転
        const color = isRank 
            ? (isPositive ? '#ff4d4f' : '#52c41a') 
            : (isPositive ? '#52c41a' : '#ff4d4f');
        
        return (
            <Badge 
                variant={isRank ? (isPositive ? 'error' : 'success') : (isPositive ? 'success' : 'error')}
                icon={<Icon name={icon} size="small" />}
            >
                {absValue}
            </Badge>
        );
    };

    // 基本カラム
    const baseColumns: ColumnsType<RankingPlayer> = [
        {
            title: '順位',
            dataIndex: 'rank',
            key: 'rank',
            width: 80,
            align: 'center',
            render: renderRank,
            sorter: (a, b) => a.rank - b.rank,
        },
        {
            title: 'プレイヤー名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (name: string) => (
                <Text variant="body1" weight="semibold" color="#1f2937">
                    {name}
                </Text>
            ),
        },
    ];

    // 都道府県カラム
    if (showPrefecture) {
        baseColumns.push({
            title: '都道府県',
            dataIndex: 'prefecture',
            key: 'prefecture',
            align: 'center',
            render: (prefecture: string) => (
                <Text variant="body2" color="secondary">
                    {prefecture || '-'}
                </Text>
            ),
        });
    }

    // ポイントカラム
    baseColumns.push({
        title: 'ポイント',
        dataIndex: 'point',
        key: 'point',
        align: 'center',
        render: (point: number) => (
            <Text variant="body1" weight="bold" color="#1b5e20">
                {point.toLocaleString()} pt
            </Text>
        ),
        sorter: (a, b) => b.point - a.point,
    });

    // 全国順位カラム
    if (showAllRank) {
        baseColumns.push({
            title: '全国順位',
            dataIndex: 'allRank',
            key: 'allRank',
            align: 'center',
            render: (allRank: number) => (
                <Text variant="body1" weight="bold" color="#1f2937">
                    全国{allRank}位
                </Text>
            ),
        });
    }

    // 変動カラム
    if (showDiff) {
        baseColumns.push(
            {
                title: '順位変動',
                dataIndex: 'rankDiff',
                key: 'rankDiff',
                align: 'center',
                render: (rankDiff: number) => renderDiff(rankDiff, true),
            },
            {
                title: 'ポイント変動',
                dataIndex: 'pointDiff',
                key: 'pointDiff',
                align: 'center',
                render: (pointDiff: number) => renderDiff(pointDiff, false),
            }
        );
    }

    // 最終カラム構成
    const columns = [...baseColumns, ...extraColumns];

    // データの制限
    const limitedData = maxItems > 0 ? data.slice(0, maxItems) : data;

    // 行のクラス名
    const getRowClassName = (record: RankingPlayer) => {
        const baseClass = `ranking-row rank-${record.rank}`;
        return baseClass;
    };

    const tableStyle: React.CSSProperties = {
        backgroundColor: 'rgba(243, 228, 231, 0.85)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 6px 16px rgba(231, 111, 142, 0.2)',
        ...style,
    };

    return (
        <div style={tableStyle}>
            {title && (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Text variant="h4" weight="bold" color="#880e4f">
                        {title}
                    </Text>
                </div>
            )}
            
            <Table
                columns={columns}
                dataSource={limitedData.map(player => ({ ...player, key: player.id }))}
                loading={loading}
                pagination={pagination}
                bordered
                size="middle"
                rowClassName={getRowClassName}
                onRow={(record) => ({
                    onClick: () => onRowClick?.(record),
                    style: { cursor: onRowClick ? 'pointer' : 'default' }
                })}
                style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            />
            
            <style>
                {`
                    .ranking-table .ant-table-thead > tr > th {
                        background-color: ${themeColor} !important;
                        color: #880e4f;
                        font-weight: 600;
                        font-size: 14px;
                        text-align: center;
                    }
                    
                    .ranking-row:hover {
                        background-color: #f9f9f9 !important;
                    }
                    
                    .rank-1 .ant-table-cell {
                        font-size: 1.2rem !important;
                    }
                    
                    .rank-2 .ant-table-cell {
                        font-size: 1.1rem !important;
                    }
                    
                    .rank-3 .ant-table-cell {
                        font-size: 1.05rem !important;
                    }
                    
                    @media screen and (max-width: 480px) {
                        .ranking-table .ant-table {
                            font-size: 0.75rem;
                        }
                        .ranking-table .ant-table-thead > tr > th {
                            font-size: 0.7rem;
                            padding: 4px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default RankingTable;