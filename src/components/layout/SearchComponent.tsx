import { useState } from "react";
import { Input, Select, Slider, Button, Space } from 'antd';
import { fetchSearchCards } from "../../hooks/cardAPI";
import { useContexts } from "../../contexts/contexts";

const { Option } = Select;

type CardType = "Leader" | "Character" | "Event" | "Stage";

export type SearchRequest = {
    name: string;
    minCost: number;
    maxCost: number;
    minPower: number;
    maxPower: number;
    blocks:string[];
    counters: number[];
    rarities:string[];
    expansions: string[];
    types:CardType[];
    colors: string[];
    features: string[];
    attributes: string[];
}

const SearchComponent = () => {
    const [formState, setFormState] = useState<SearchRequest>({
        name: '',
        minCost: 0,
        maxCost: 10,
        minPower: 0,
        maxPower: 15000,
        blocks:[],
        counters: [],
        rarities:[],
        expansions: [],
        types: [],
        colors: [],
        features: [],
        attributes: []
    });

    const {
        setCards
    } = useContexts();

    const handleSearch = () => {
        fetchSearchCards(setCards, formState);
    }

    return (
        <div>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Input
                    placeholder="input card name nya"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <div>
                    <label>Cost:</label>
                    <Slider
                        range
                        min={0}
                        max={10}
                        defaultValue={[formState.minCost, formState.maxCost]}
                        onChange={([minCost, maxCost]) => setFormState({ ...formState, minCost, maxCost })}
                    />
                </div>
                <div>
                    <label>パワー:</label>
                    <Slider
                        range
                        min={0}
                        max={15000}
                        step={1000}
                        defaultValue={[formState.minPower, formState.maxPower]}
                        onChange={([minPower, maxPower]) => setFormState({ ...formState, minPower, maxPower })}
                    />
                </div>
                <Select
                    mode="multiple"
                    placeholder="収録弾"
                    value={formState.expansions}
                    onChange={value => setFormState({ ...formState, expansions: value })}
                    style={{ width: 200 }}
                >
                    <Option value="OP01">OP01</Option>
                    <Option value="OP02">OP02</Option>
                    <Option value="OP03">OP03</Option>
                    <Option value="OP04">OP04</Option>
                    <Option value="OP05">OP05</Option>
                    <Option value="OP06">OP06</Option>
                    <Option value="OP07">OP07</Option>
                    <Option value="OP08">OP08</Option>
                    <Option value="OP09">OP09</Option>
                    <Option value="OP10">OP10</Option>
                    <Option value="OP11">OP11</Option>
                    <Option value="ST01">ST01</Option>
                    <Option value="ST02">ST02</Option>
                    <Option value="ST03">ST03</Option>
                    <Option value="ST04">ST04</Option>
                    <Option value="ST05">ST05</Option>
                    <Option value="ST06">ST06</Option>
                    <Option value="ST07">ST07</Option>
                    <Option value="ST08">ST08</Option>
                    <Option value="ST09">ST09</Option>
                    <Option value="ST10">ST10</Option>
                    <Option value="ST11">ST11</Option>
                    <Option value="ST12">ST12</Option>
                    <Option value="ST13">ST13</Option>
                    <Option value="ST14">ST14</Option>
                    <Option value="ST15">ST15</Option>
                    <Option value="ST16">ST16</Option>
                    <Option value="ST17">ST17</Option>
                    <Option value="ST18">ST18</Option>
                    <Option value="ST19">ST19</Option>
                    <Option value="ST20">ST20</Option>
                </Select>
                <Select
                    mode="multiple"
                    placeholder="カードタイプ"
                    value={formState.types}
                    onChange={value => setFormState({ ...formState, types: value })}
                    style={{ width: 200 }}
                >
                    <Option value="Leader">Leader</Option>
                    <Option value="Character">Character</Option>
                    <Option value="Event">Event</Option>
                    <Option value="Stage">Stage</Option>
                </Select>
                <Select
                    mode="multiple"
                    placeholder="カラー（複数選択可）"
                    value={formState.colors}
                    onChange={(colors) => setFormState({ ...formState, colors })}
                    style={{ width: '100%' }}
                >
                    <Option value="赤">赤</Option>
                    <Option value="青">青</Option>
                    <Option value="緑">緑</Option>
                    <Option value="紫">紫</Option>
                    <Option value="黒">黒</Option>
                    <Option value="黄">黄</Option>
                </Select>
                <Select
                    mode="multiple"
                    placeholder="特徴"
                    value={formState.features}
                    onChange={(features) => setFormState({ ...formState, features })}
                    style={{ width: '100%' }}
                >
                    <Option value="麦わらの一味">麦わらの一味</Option>
                    <Option value="海軍">海軍</Option>
                    <Option value="動物">動物</Option>
                    {/* 適宜追加 */}
                </Select>
                <Select
                    mode="multiple"
                    placeholder="属性"
                    value={formState.attributes}
                    onChange={(attributes) => setFormState({ ...formState, attributes })}
                    style={{ width: '100%' }}
                >
                    <Option value="打">打</Option>
                    <Option value="斬">斬</Option>
                    <Option value="射">射</Option>
                    {/* 適宜追加 */}
                </Select>

                <Button type="primary" onClick={handleSearch}>検索</Button>
            </Space>
        </div>
    )
}

export default SearchComponent;