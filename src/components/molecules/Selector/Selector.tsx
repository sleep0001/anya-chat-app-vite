import React from 'react';
import { Select } from 'antd';
import { Text } from '../../atoms';

const { Option } = Select;

export interface SelectorOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface SelectorProps {
    /** ラベル */
    label?: string;
    /** 値 */
    value?: string | number;
    /** 変更ハンドラー */
    onChange: (value: string | number) => void;
    /** 選択肢 */
    options: SelectorOption[];
    /** プレースホルダー */
    placeholder?: string;
    /** 空の選択肢を表示するか */
    allowClear?: boolean;
    /** 空の選択肢のラベル */
    clearLabel?: string;
    /** 検索可能かどうか */
    searchable?: boolean;
    /** サイズ */
    size?: 'small' | 'medium' | 'large';
    /** 幅 */
    width?: number | string;
    /** 無効状態 */
    disabled?: boolean;
    /** 必須項目かどうか */
    required?: boolean;
    /** エラーメッセージ */
    error?: string;
    /** ヘルプテキスト */
    helpText?: string;
    /** 複数選択 */
    multiple?: boolean;
    /** 複数選択時の値 */
    multipleValue?: (string | number)[];
    /** 複数選択時の変更ハンドラー */
    onMultipleChange?: (value: (string | number)[]) => void;
}

const Selector: React.FC<SelectorProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = '選択してください',
    allowClear = false,
    clearLabel = 'すべて',
    searchable = false,
    size = 'medium',
    width = 200,
    disabled = false,
    required = false,
    error,
    helpText,
    multiple = false,
    multipleValue,
    onMultipleChange,
}) => {
    // サイズマッピング
    const sizeMap = {
        small: 'small' as const,
        medium: 'middle' as const,
        large: 'large' as const,
    };

    const handleChange = (selectedValue: any) => {
        if (multiple && onMultipleChange) {
            onMultipleChange(selectedValue);
        } else if (!multiple && onChange) {
            onChange(selectedValue);
        }
    };

    const selectStyle = {
        width,
        ...(error && {
            borderColor: '#ff4d4f',
        }),
    };

    const currentValue = multiple ? multipleValue : value;

    return (
        <div className="selector-wrapper">
            {label && (
                <div style={{ marginBottom: '8px' }}>
                    <Text variant="body2" weight="medium" color="text">
                        {label}
                        {required && <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>}
                    </Text>
                </div>
            )}
            
            <Select
                value={currentValue}
                onChange={handleChange}
                style={selectStyle}
                size={sizeMap[size]}
                placeholder={placeholder}
                allowClear={allowClear}
                showSearch={searchable}
                disabled={disabled}
                mode={multiple ? 'multiple' : undefined}
                optionFilterProp={searchable ? 'children' : undefined}
                status={error ? 'error' : undefined}
            >
                {allowClear && !multiple && (
                    <Option value="">{clearLabel}</Option>
                )}
                {options.map((option) => (
                    <Option 
                        key={option.value} 
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </Option>
                ))}
            </Select>
            
            {error && (
                <div style={{ 
                    marginTop: '4px', 
                    fontSize: '12px', 
                    color: '#ff4d4f' 
                }}>
                    {error}
                </div>
            )}
            
            {helpText && !error && (
                <div style={{ 
                    marginTop: '4px', 
                    fontSize: '12px', 
                    color: '#6b7280' 
                }}>
                    {helpText}
                </div>
            )}
        </div>
    );
};

export default Selector;