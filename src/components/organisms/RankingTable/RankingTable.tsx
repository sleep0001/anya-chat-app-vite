import React from 'react';
import { Table, Progress } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
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
    pagination?: false | TablePaginationConfig;
    /** テーマカラー */
    themeColor?: string;
    /** カスタムカラム */
    extraColumns?: ColumnsType<RankingPlayer>;
    /** 行クリックハンドラー */
    onRowClick?: (player: RankingPlayer) => void;
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** ポイント進捗バーを表示するか */
    showPointProgress?: boolean;
    /** 順位の色分けを強化するか */
    enhancedRankColors?: boolean;
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
    showPointProgress = false,
    enhancedRankColors = false,
}) => {
    // 最大ポイント数を取得（進捗バー用）
    const maxPoints = Math.max(...data.map(player => player.point));

    // 順位レンダー（拡張版）
    const renderRank = (rank: number) => {
        const getRankStyle = () => {
            if (!enhancedRankColors) {
                // 従来の1-3位のみ
                if (rank === 1) return { color: '#d4af37', icon: 'crown' as const };
                if (rank === 2) return { color: '#c0c0c0', icon: 'crown' as const };
                if (rank === 3) return { color: '#cd7f32', icon: 'crown' as const };
                return { color: '#1f2937', icon: null };
            }
            
            // 拡張版：より多くの順位に色付け（利用可能なアイコンのみ使用）
            if (rank === 1) return { color: '#d4af37', icon: 'crown' as const };
            if (rank === 2) return { color: '#c0c0c0', icon: 'crown' as const };
            if (rank === 3) return { color: '#cd7f32', icon: 'crown' as const };
            if (rank <= 5) return { color: '#7c3aed', icon: 'star' as const };
            if (rank <= 10) return { color: '#dc2626', icon: 'heart' as const }; // flame → heart に変更
            if (rank <= 20) return { color: '#ea580c', icon: null };
            if (rank <= 50) return { color: '#059669', icon: null };
            return { color: '#6b7280', icon: null };
        };

        const rankStyle = getRankStyle();
        const rankElement = (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text 
                    variant="body1" 
                    weight="bold" 
                    style={{ color: rankStyle.color }}
                >
                    {rank}
                </Text>
            </div>
        );
        
        if (rankStyle.icon) {
            return (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center', 
                    gap: '4px',
                    color: rankStyle.color
                }}>
                    <Icon name={rankStyle.icon} color={rankStyle.color} size="small" />
                    <Text 
                        variant="body1" 
                        weight="bold" 
                        style={{ color: rankStyle.color }}
                    >
                        {rank}
                    </Text>
                </div>
            );
        }
        
        return rankElement;
    };

    // ポイントレンダー（拡張版）
    const renderPoint = (point: number) => {
        const pointElement = (
            <Text variant="body1" weight="bold" color="#1b5e20">
                {point.toLocaleString()} pt
            </Text>
        );

        if (!showPointProgress) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {pointElement}
                </div>
            );
        }

        const percentage = Math.round((point / maxPoints) * 100);
        
        return (
            <div style={{ minWidth: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {pointElement}
                <Progress 
                    percent={percentage}
                    size="small"
                    strokeColor={{
                        '0%': '#f0f9ff',
                        '50%': '#0ea5e9',
                        '100%': '#0369a1',
                    }}
                    showInfo={false}
                    style={{ marginTop: '4px', width: '100%' }}
                />
            </div>
        );
    };

    // 変動レンダー（順位変動の段階的カラー版）
    const renderDiff = (diff: number, isRank: boolean = false) => {
        if (diff === 2147483647) {
            return (
                <Badge 
                    variant="success"
                    style={{ 
                        backgroundColor: '#52c41a', 
                        color: 'white',
                        border: '1px solid #52c41a'
                    }}
                >
                    new!!
                </Badge>
            );
        }
        
        if (diff === 0) {
            return <Badge variant="default">±0</Badge>;
        }
        
        const isPositive = diff > 0;
        const absValue = Math.abs(diff);
        const icon = isRank 
            ? (isPositive ? 'arrow-up' as const : 'arrow-down' as const)
            : (isPositive ? 'arrow-up' as const : 'arrow-down' as const);
        
        // 順位変動の場合のカスタムスタイル
        if (isRank) {
            if (isPositive) {
                // 順位上昇（数値が大きいほど順位が下がっている）：値に応じて段階的に赤の濃度を変更
                const getUpColor = (value: number) => {
                    if (value >= 11) {
                        // 11以上：濃いめの赤
                        return { 
                            backgroundColor: '#991b1b', 
                            border: '1px solid #991b1b',
                            color: 'white'
                        };
                    } else if (value >= 5) {
                        // 5-10：赤
                        return { 
                            backgroundColor: '#dc2626', 
                            border: '1px solid #dc2626',
                            color: 'white'
                        };
                    } else {
                        // 1-4：薄めの赤
                        return { 
                            backgroundColor: '#f87171', 
                            border: '1px solid #f87171',
                            color: 'white'
                        };
                    }
                };
                
                const colors = getUpColor(absValue);
                return (
                    <Badge 
                        variant="error"
                        icon={<Icon name={icon} size="small" />}
                        style={colors}
                    >
                        {absValue}
                    </Badge>
                );
            } else {
                // 順位下降（順位が上がっている）：青系
                return (
                    <Badge 
                        variant="default"
                        icon={<Icon name={icon} size="small" />}
                        style={{
                            backgroundColor: '#538bd4ff',
                            color: 'white',
                            border: '1px solid #538bd4ff'
                        }}
                    >
                        {absValue}
                    </Badge>
                );
            }
        }
        
        // ポイント変動の場合は従来通り
        return (
            <Badge 
                variant={'positive'}
                icon={<Icon name={icon} size="small" />}
            >
                {absValue}
            </Badge>
        );
    };

    // 基本カラム構成
    const getColumns = (): ColumnsType<RankingPlayer> => {
        const columns: ColumnsType<RankingPlayer> = [
            {
                title: '順位',
                dataIndex: 'rank',
                key: 'rank',
                width: enhancedRankColors ? 100 : 80,
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
            columns.push({
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
        columns.push({
            title: 'ポイント',
            dataIndex: 'point',
            key: 'point',
            align: 'center',
            width: showPointProgress ? 180 : undefined,
            render: renderPoint,
            sorter: (a, b) => b.point - a.point,
        });

        // 全国順位カラム
        if (showAllRank) {
            columns.push({
                title: '全国順位',
                dataIndex: 'allRank',
                key: 'allRank',
                align: 'center',
                render: (allRank: number) => {
                    if (allRank === null || allRank === undefined || allRank === 0) {
                        return (
                            <Text variant="body2" color="secondary">
                                -
                            </Text>
                        );
                    }
                    
                    return (
                        <Text variant="body1" weight="bold" color="#1f2937">
                            全国{allRank}位
                        </Text>
                    );
                },
                sorter: (a, b) => {
                    const aRank = a.allRank || 0;
                    const bRank = b.allRank || 0;
                    return aRank - bRank;
                },
            });
        }

        // 変動カラム
        if (showDiff) {
            columns.push(
                {
                    title: '順位変動',
                    dataIndex: 'rankDiff',
                    key: 'rankDiff',
                    align: 'center',
                    render: (rankDiff: number) => {
                        if (rankDiff === null || rankDiff === undefined) {
                            return (
                                <Text variant="body2" color="secondary">
                                    -
                                </Text>
                            );
                        }
                        return renderDiff(rankDiff, true);
                    },
                },
                {
                    title: 'ポイント変動',
                    dataIndex: 'pointDiff',
                    key: 'pointDiff',
                    align: 'center',
                    render: (pointDiff: number) => {
                        if (pointDiff === null || pointDiff === undefined) {
                            return (
                                <Text variant="body2" color="secondary">
                                    -
                                </Text>
                            );
                        }
                        return renderDiff(pointDiff, false);
                    },
                }
            );
        }

        return [...columns, ...extraColumns];
    };

    // データの制限
    const limitedData = maxItems > 0 ? data.slice(0, maxItems) : data;

    // 行のクラス名（拡張版）
    const getRowClassName = (record: RankingPlayer) => {
        const baseClass = `ranking-row rank-${record.rank}`;
        
        if (!enhancedRankColors) return baseClass;
        
        // 拡張された行スタイル
        if (record.rank <= 3) return `${baseClass} top-3`;
        if (record.rank <= 5) return `${baseClass} top-5`;
        if (record.rank <= 10) return `${baseClass} top-10`;
        if (record.rank <= 20) return `${baseClass} top-20`;
        
        return baseClass;
    };

    // テーブルのスタイル
    const tableStyle: React.CSSProperties = {
        backgroundColor: 'rgba(243, 228, 231, 0.85)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 6px 16px rgba(231, 111, 142, 0.2)',
        ...style,
    };

    // 動的スタイルの生成（拡張版）
    const dynamicStyles = `
        .ranking-table .ant-table-thead > tr > th {
            background-color: ${themeColor} !important;
            color: #880e4f !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            text-align: center !important;
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
        
        ${enhancedRankColors ? `
        .top-3 {
            background-color: rgba(255, 215, 0, 0.1) !important;
        }
        
        .top-5 {
            background-color: rgba(124, 58, 237, 0.05) !important;
        }
        
        .top-10 {
            background-color: rgba(220, 38, 38, 0.05) !important;
        }
        
        .top-20 {
            background-color: rgba(234, 88, 12, 0.03) !important;
        }
        ` : ''}
        
        @media screen and (max-width: 480px) {
            .ranking-table .ant-table {
                font-size: 0.75rem !important;
            }
            .ranking-table .ant-table-thead > tr > th {
                font-size: 0.7rem !important;
                padding: 4px !important;
            }
        }
    `;

    return (
        <div style={tableStyle} className="ranking-table">
            <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
            
            {title && (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Text variant="h4" weight="bold" color="#880e4f">
                        {title}
                    </Text>
                </div>
            )}
            
            <Table<RankingPlayer>
                columns={getColumns()}
                dataSource={limitedData.map(player => ({ ...player, key: player.id }))}
                loading={loading}
                pagination={pagination}
                bordered
                size="small"
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
        </div>
    );
};

export default RankingTable;