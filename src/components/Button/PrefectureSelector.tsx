import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
type PrefectureSelectorProps = {
    value?: string;
    onChange: (prefecture: string) => void;
};

const PREFECTURES = [
    "北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島",
    "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川",
    "新潟", "富山", "石川", "福井", "山梨", "長野",
    "岐阜", "静岡", "愛知", "三重",
    "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山",
    "鳥取", "島根", "岡山", "広島", "山口",
    "徳島", "香川", "愛媛", "高知",
    "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"
];

const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({ value = "", onChange }) => {
    return (
        <Select
            value={value || undefined}
            onChange={onChange}
            style={{ width: 200 }}
            placeholder="都道府県を選択"
            allowClear
            showSearch
            optionFilterProp="children"
        >
            <Option value="">全国</Option>
            {PREFECTURES.map((pref) => (
                <Option key={pref} value={pref}>
                    {pref}
                </Option>
            ))}
        </Select>
    );
};

export default PrefectureSelector;
