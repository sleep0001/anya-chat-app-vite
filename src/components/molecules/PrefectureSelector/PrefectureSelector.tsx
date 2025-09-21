import React from 'react';
import { StringSelector } from '../Selector/Selector';

interface PrefectureSelectorProps {
    value?: string;
    onChange: (prefecture: string) => void;
    label?: string;
    required?: boolean;
    error?: string;
}

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

const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({
    value,
    onChange,
    label = "都道府県",
    required = false,
    error,
}) => {
    const options = PREFECTURES.map(prefecture => ({
        value: prefecture,
        label: prefecture,
    }));

    return (
        <StringSelector
            label={label}
            value={value || ""}
            onChange={onChange}
            options={options}
            placeholder="都道府県を選択"
            allowClear={true}
            clearLabel="全国"
            searchable={true}
            width={200}
            required={required}
            error={error}
        />
    );
};

export default PrefectureSelector;