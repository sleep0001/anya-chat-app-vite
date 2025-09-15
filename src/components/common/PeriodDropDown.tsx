

import { PeriodOption } from '../../types/DmPlayerLatestStats';

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
        <div className="period-selector mb-5">
            <label htmlFor="period-select" className="mr-2">
                対象期間: 
            </label>
            <select 
                id="period-select"
                value={selectedPeriod} 
                onChange={(e) => onPeriodChange(e.target.value)}
                className="ml-2 p-1 border border-gray-300 rounded"
            >
                <option value="">期間を選択してください</option>
                {periodOptions.map(option => (
                    <option key={option.key} value={option.key}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PeriodDropDown;
