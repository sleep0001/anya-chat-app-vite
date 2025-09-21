import React, { useState } from 'react';
import { Space } from 'antd';
import { Button, Input, Icon } from '../../atoms';

export interface SearchBoxProps {
    /** 検索値 */
    value?: string;
    /** 検索値変更ハンドラー */
    onChange?: (value: string) => void;
    /** 検索実行ハンドラー */
    onSearch: (value: string) => void;
    /** プレースホルダー */
    placeholder?: string;
    /** 検索ボタンのラベル */
    searchButtonLabel?: string;
    /** 検索ボタンを表示するか */
    showSearchButton?: boolean;
    /** クリアボタンを表示するか */
    allowClear?: boolean;
    /** Enterキーで検索するか */
    searchOnEnter?: boolean;
    /** 入力と同時に検索するか */
    searchOnChange?: boolean;
    /** デバウンス時間（ms） */
    debounceMs?: number;
    /** ローディング状態 */
    loading?: boolean;
    /** サイズ */
    size?: 'small' | 'medium' | 'large';
    /** 幅 */
    width?: number | string;
    /** 無効状態 */
    disabled?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    value,
    onChange,
    onSearch,
    placeholder = "検索...",
    searchButtonLabel = "検索",
    showSearchButton = true,
    allowClear = true,
    searchOnEnter = true,
    searchOnChange = false,
    debounceMs = 300,
    loading = false,
    size = 'medium',
    width = '100%',
    disabled = false,
}) => {
    const [inputValue, setInputValue] = useState<string>(value || "");
    // number型のタイマーIDを使用（ブラウザ環境ではwindow.setTimeout）
    const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

    const handleSearch = () => {
        onSearch(inputValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        
        if (onChange) {
            onChange(newValue);
        }

        // デバウンス処理付きの自動検索
        if (searchOnChange) {
            if (debounceTimer) {
                window.clearTimeout(debounceTimer);
            }
            
            const timer = window.setTimeout(() => {
                onSearch(newValue);
            }, debounceMs);
            
            setDebounceTimer(timer);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (searchOnEnter && e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleClear = () => {
        setInputValue("");
        if (onChange) {
            onChange("");
        }
        onSearch("");
    };

    // 制御コンポーネントとして動作させる
    React.useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);

    // クリーンアップ
    React.useEffect(() => {
        return () => {
            if (debounceTimer) {
                window.clearTimeout(debounceTimer);
            }
        };
    }, [debounceTimer]);

    const containerStyle: React.CSSProperties = {
        width,
        display: 'flex',
        gap: '8px',
    };

    const inputStyle: React.CSSProperties = {
        flex: 1,
    };

    return (
        <div style={containerStyle}>
            <div style={inputStyle}>
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    size={size}
                    disabled={disabled}
                    style={{ borderRadius: '8px' }}
                    suffix={
                        <Space size={4}>
                            {loading && (
                                <Icon name="settings" spin size="small" />
                            )}
                            {allowClear && inputValue && (
                                <Icon 
                                    name="close-circle" 
                                    size="small" 
                                    clickable 
                                    onClick={handleClear}
                                    color="#bfbfbf"
                                />
                            )}
                            <Icon 
                                name="search" 
                                size="small" 
                                clickable 
                                onClick={handleSearch}
                                color="#1890ff"
                            />
                        </Space>
                    }
                />
            </div>
            
            {showSearchButton && (
                <Button
                    onClick={handleSearch}
                    disabled={disabled}
                    loading={loading}
                    size={size}
                    style={{ minWidth: '80px' }}
                >
                    {searchButtonLabel}
                </Button>
            )}
        </div>
    );
};

export default SearchBox;