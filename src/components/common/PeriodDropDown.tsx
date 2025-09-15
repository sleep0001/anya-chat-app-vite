import React from 'react';
import { Select } from 'antd';
import { PeriodOption } from '../../types/DmPlayerLatestStats';

const { Option } = Select;

interface PeriodDropDownProps {
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
    periodOptions: PeriodOption[];
}

const PeriodDropDown: React.FC<PeriodDropDownProps> = ({ 
    selectedPeriod, 
    onPeriodChange, 
    periodOptions 
}) => {
    return (
        <Select
            value={selectedPeriod || undefined}
            onChange={onPeriodChange}
            style={{ width: 300 }}
            placeholder="対象期間を選択"
            allowClear
            showSearch
            optionFilterProp="children"
        >
            {periodOptions.map(option => (
                <Option key={option.key} value={option.key}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default PeriodDropDown;