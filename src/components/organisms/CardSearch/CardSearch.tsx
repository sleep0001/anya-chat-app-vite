import React, { useState } from "react";
import { Slider, Space, Collapse } from 'antd';
import { Button, Input, Text } from '../../atoms';
import { Selector, SelectorOption } from '../../molecules';
import { fetchSearchCards } from "../../../hooks/cardAPI";
import { useContexts } from "../../../contexts/contexts";

const { Panel } = Collapse;

type CardType = "Leader" | "Character" | "Event" | "Stage";

export type SearchRequest = {
    name: string;
    minCost: number;
    maxCost: number;
    minPower: number;
    maxPower: number;
    blocks: string[];
    counters: number[];
    rarities: string[];
    expansions: string[];
    types: CardType[];
    colors: string[];
    features: string[];
    attributes: string[];
}

export interface CardSearchProps {
    /** 検索実行時のコールバック */
    onSearch?: (searchData: SearchRequest) => void;
    /** 初期検索条件 */
    initialValues?: Partial<SearchRequest>;
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const CardSearch: React.FC<CardSearchProps> = ({
    onSearch,
    initialValues,
    style,
    className,
}) => {
    const [formState, setFormState] = useState<SearchRequest>({
        name: initialValues?.name || '',
        minCost: initialValues?.minCost || 0,
        maxCost: initialValues?.maxCost || 10,
        minPower: initialValues?.minPower || 0,
        maxPower: initialValues?.maxPower || 15000,
        blocks: initialValues?.blocks || [],
        counters: initialValues?.counters || [],
        rarities: initialValues?.rarities || [],
        expansions: initialValues?.expansions || [],
        types: initialValues?.types || [],
        colors: initialValues?.colors || [],
        features: initialValues?.features || [],
        attributes: initialValues?.attributes || []
    });

    const { setCards } = useContexts();

    // 選択肢の定義
    const expansionOptions: SelectorOption[] = [
        ...Array.from({ length: 11 }, (_, i) => ({ value: `OP${String(i + 1).padStart(2, '0')}`, label: `OP${String(i + 1).padStart(2, '0')}` })),
        ...Array.from({ length: 20 }, (_, i) => ({ value: `ST${String(i + 1).padStart(2, '0')}`, label: `ST${String(i + 1).padStart(2, '0')}` }))
    ];

    const typeOptions: SelectorOption[] = [
        { value: "Leader", label: "リーダー" },
        { value: "Character", label: "キャラクター" },
        { value: "Event", label: "イベント" },
        { value: "Stage", label: "ステージ" }
    ];

    const colorOptions: SelectorOption[] = [
        { value: "赤", label: "🔴 赤" },
        { value: "青", label: "🔵 青" },
        { value: "緑", label: "🟢 緑" },
        { value: "紫", label: "🟣 紫" },
        { value: "黒", label: "⚫ 黒" },
        { value: "黄", label: "🟡 黄" }
    ];

    const featureOptions: SelectorOption[] = [
        { value: "麦わらの一味", label: "麦わらの一味" },
        { value: "海軍", label: "海軍" },
        { value: "動物", label: "動物" }
    ];

    const attributeOptions: SelectorOption[] = [
        { value: "打", label: "打撃" },
        { value: "斬", label: "斬撃" },
        { value: "射", label: "射撃" }
    ];

    const handleSearch = () => {
        fetchSearchCards(setCards, formState);
        if (onSearch) {
            onSearch(formState);
        }
    };

    const handleReset = () => {
        const resetState: SearchRequest = {
            name: '',
            minCost: 0,
            maxCost: 10,
            minPower: 0,
            maxPower: 15000,
            blocks: [],
            counters: [],
            rarities: [],
            expansions: [],
            types: [],
            colors: [],
            features: [],
            attributes: []
        };
        setFormState(resetState);
    };

    const containerStyle: React.CSSProperties = {
        backgroundColor: '#fafafa',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        ...style,
    };

    const sectionStyle: React.CSSProperties = {
        marginBottom: '16px',
    };

    const sliderContainerStyle: React.CSSProperties = {
        padding: '0 8px',
    };

    return (
        <div className={`card-search-organism ${className || ''}`} style={containerStyle}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Text variant="h4" weight="bold" color="primary" style={{ marginBottom: '8px' }}>
                    🃏 ワンピカード検索
                </Text>
                <Text variant="body2" color="secondary">
                    お好みの条件でカードを検索してね！
                </Text>
            </div>

            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* カード名検索 */}
                <div style={sectionStyle}>
                    <Input
                        label="カード名"
                        placeholder="input card name nya"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        size="medium"
                    />
                </div>

                {/* 基本フィルター */}
                <Collapse defaultActiveKey={['basic']} ghost>
                    <Panel 
                        header={
                            <Text variant="h6" weight="semibold" color="primary">
                                🎯 基本フィルター
                            </Text>
                        } 
                        key="basic"
                    >
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            {/* コスト */}
                            <div style={sectionStyle}>
                                <Text variant="body2" weight="medium" color="text" style={{ marginBottom: '8px' }}>
                                    コスト: {formState.minCost} - {formState.maxCost}
                                </Text>
                                <div style={sliderContainerStyle}>
                                    <Slider
                                        range
                                        min={0}
                                        max={10}
                                        value={[formState.minCost, formState.maxCost]}
                                        onChange={([minCost, maxCost]) => setFormState({ ...formState, minCost, maxCost })}
                                        marks={{
                                            0: '0',
                                            5: '5', 
                                            10: '10'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* パワー */}
                            <div style={sectionStyle}>
                                <Text variant="body2" weight="medium" color="text" style={{ marginBottom: '8px' }}>
                                    パワー: {formState.minPower} - {formState.maxPower}
                                </Text>
                                <div style={sliderContainerStyle}>
                                    <Slider
                                        range
                                        min={0}
                                        max={15000}
                                        step={1000}
                                        value={[formState.minPower, formState.maxPower]}
                                        onChange={([minPower, maxPower]) => setFormState({ ...formState, minPower, maxPower })}
                                        marks={{
                                            0: '0',
                                            7500: '7.5K',
                                            15000: '15K'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* 収録弾・タイプ */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                <Selector
                                    label="収録弾"
                                    multiple={true}
                                    multipleValue={formState.expansions}
                                    onMultipleChange={(expansions) => setFormState({ ...formState, expansions: expansions as string[] })}
                                    options={expansionOptions}
                                    placeholder="収録弾を選択"
                                    width="100%" onChange={function (value: string | number): void {
                                        throw new Error("Function not implemented.");
                                    } }                                />

                                <Selector
                                    label="カードタイプ"
                                    multiple={true}
                                    multipleValue={formState.types}
                                    onMultipleChange={(types) => setFormState({ ...formState, types: types as CardType[] })}
                                    options={typeOptions}
                                    placeholder="タイプを選択"
                                    width="100%" onChange={function (value: string | number): void {
                                        throw new Error("Function not implemented.");
                                    } }                                />
                            </div>
                        </Space>
                    </Panel>

                    {/* 詳細フィルター */}
                    <Panel 
                        header={
                            <Text variant="h6" weight="semibold" color="primary">
                                🔍 詳細フィルター
                            </Text>
                        } 
                        key="advanced"
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                            <Selector
                                label="カラー"
                                multiple={true}
                                multipleValue={formState.colors}
                                onMultipleChange={(colors) => setFormState({ ...formState, colors: colors as string[] })}
                                options={colorOptions}
                                placeholder="カラーを選択"
                                width="100%" onChange={function (value: string | number): void {
                                    throw new Error("Function not implemented.");
                                } }                            />

                            <Selector
                                label="特徴"
                                multiple={true}
                                multipleValue={formState.features}
                                onMultipleChange={(features) => setFormState({ ...formState, features: features as string[] })}
                                options={featureOptions}
                                placeholder="特徴を選択"
                                width="100%" onChange={function (value: string | number): void {
                                    throw new Error("Function not implemented.");
                                } }                            />

                            <Selector
                                label="属性"
                                multiple={true}
                                multipleValue={formState.attributes}
                                onMultipleChange={(attributes) => setFormState({ ...formState, attributes: attributes as string[] })}
                                options={attributeOptions}
                                placeholder="属性を選択"
                                width="100%" onChange={function (value: string | number): void {
                                    throw new Error("Function not implemented.");
                                } }                            />
                        </div>
                    </Panel>
                </Collapse>

                {/* アクションボタン */}
                <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    justifyContent: 'center',
                    marginTop: '20px'
                }}>
                    <Button
                        onClick={handleSearch}
                        color="#1890ff"
                        size="large"
                        style={{ minWidth: '120px' }}
                    >
                        🔍 検索
                    </Button>
                    
                    <Button
                        onClick={handleReset}
                        variant="secondary"
                        color="#f5f5f5"
                        textColor="#666"
                        size="large"
                        style={{ minWidth: '120px' }}
                    >
                        🔄 リセット
                    </Button>
                </div>
            </Space>
        </div>
    );
};

export default CardSearch;