import React from 'react';
import { Select } from 'antd';
import { Text } from '../../atoms';

const { Option } = Select;

export interface SelectorOption<T = string | number> {
    value: T;
    label: string;
    disabled?: boolean;
}

// 基本のSelectorProps（ジェネリック対応）
export interface SelectorProps<T = string | number> {
    /** ラベル */
    label?: string;
    /** 値 */
    value?: T;
    /** 変更ハンドラー */
    onChange: (value: T) => void;
    /** 選択肢 */
    options: SelectorOption<T>[];
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
    multipleValue?: T[];
    /** 複数選択時の変更ハンドラー */
    onMultipleChange?: (value: T[]) => void;
}

// 文字列専用のSelectorProps
export interface StringSelectorProps {
    /** ラベル */
    label?: string;
    /** 値（文字列） */
    value?: string;
    /** 変更ハンドラー（文字列） */
    onChange: (value: string) => void;
    /** 選択肢（文字列値） */
    options: Array<{ value: string; label: string; disabled?: boolean }>;
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
    multipleValue?: string[];
    /** 複数選択時の変更ハンドラー */
    onMultipleChange?: (value: string[]) => void;
}

const Selector = <T extends string | number = string | number>({
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
}: SelectorProps<T>): React.ReactElement => {
    // サイズマッピング
    const sizeMap = {
        small: 'small' as const,
        medium: 'middle' as const,
        large: 'large' as const,
    };

    const handleChange = (selectedValue: T | T[]) => {
        if (multiple && onMultipleChange && Array.isArray(selectedValue)) {
            onMultipleChange(selectedValue);
        } else if (!multiple && onChange && !Array.isArray(selectedValue)) {
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
                    <Option value={'' as T}>{clearLabel}</Option>
                )}
                {options.map((option) => (
                    <Option 
                        key={String(option.value)} 
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

// 型安全な文字列専用Selector
export const StringSelector: React.FC<StringSelectorProps> = ({
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

    const handleChange = (selectedValue: string | string[]) => {
        if (multiple && onMultipleChange && Array.isArray(selectedValue)) {
            onMultipleChange(selectedValue);
        } else if (!multiple && onChange && typeof selectedValue === 'string') {
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