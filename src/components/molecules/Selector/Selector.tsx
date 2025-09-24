import React, { useState, useRef, useEffect } from 'react';
import { Text } from '../../atoms';

export interface SelectorOption<T = string | number> {
    value: T;
    label: string;
    disabled?: boolean;
}

export interface SelectorProps<T = string | number> {
    label?: string;
    value?: T;
    onChange: (value: T) => void;
    options: SelectorOption<T>[];
    placeholder?: string;
    allowClear?: boolean;
    clearLabel?: string;
    size?: 'small' | 'medium' | 'large';
    width?: number | string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    helpText?: string;
    multiple?: boolean;
    multipleValue?: T[];
    onMultipleChange?: (value: T[]) => void;
}

export interface StringSelectorProps {
    label?: string;
    value?: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string; disabled?: boolean }>;
    placeholder?: string;
    allowClear?: boolean;
    clearLabel?: string;
    size?: 'small' | 'medium' | 'large';
    width?: number | string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    helpText?: string;
    multiple?: boolean;
    multipleValue?: string[];
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
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // モバイル判定
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 外部クリックで閉じる
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen && !isMobile) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, isMobile]);

    const handleSelect = (optionValue: T) => {
        if (multiple && onMultipleChange) {
            const currentValues = multipleValue || [];
            const newValues = currentValues.includes(optionValue)
                ? currentValues.filter(v => v !== optionValue)
                : [...currentValues, optionValue];
            onMultipleChange(newValues);
        } else {
            onChange(optionValue);
            setIsOpen(false);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple && onMultipleChange) {
            onMultipleChange([]);
        } else {
            onChange('' as T);
        }
    };

    const getDisplayValue = () => {
        if (multiple && multipleValue && multipleValue.length > 0) {
            const labels = multipleValue.map(val => 
                options.find(opt => opt.value === val)?.label || ''
            ).filter(Boolean);
            return labels.length > 2 
                ? `${labels.slice(0, 2).join(', ')}... (+${labels.length - 2})`
                : labels.join(', ');
        }
        if (value !== undefined && value !== '') {
            const selected = options.find(opt => opt.value === value);
            return selected?.label || '';
        }
        return '';
    };

    const displayOptions = allowClear && !multiple
        ? [{ value: '' as T, label: clearLabel }, ...options]
        : options;

    const sizeStyles = {
        small: { height: '32px', fontSize: '14px', padding: '4px 12px' },
        medium: { height: '40px', fontSize: '16px', padding: '8px 12px' },
        large: { height: '48px', fontSize: '18px', padding: '12px 16px' },
    };

    const hasValue = multiple 
        ? (multipleValue && multipleValue.length > 0)
        : (value !== undefined && value !== '');

    const styles = `
        .custom-selector {
            position: relative;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            width: ${typeof width === 'number' ? `${width}px` : width};
        }

        .selector-trigger {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            border: 1px solid ${error ? '#ff4d4f' : '#d9d9d9'};
            border-radius: 8px;
            background: ${disabled ? '#f5f5f5' : '#fff'};
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
            transition: all 0.3s;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        .selector-trigger:hover:not(:disabled) {
            border-color: ${error ? '#ff4d4f' : '#40a9ff'};
        }

        .selector-trigger.open {
            border-color: ${error ? '#ff4d4f' : '#40a9ff'};
            box-shadow: 0 0 0 2px ${error ? 'rgba(255, 77, 79, 0.2)' : 'rgba(24, 144, 255, 0.2)'};
        }

        .selector-value {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: ${hasValue ? '#000' : '#bfbfbf'};
        }

        .selector-icons {
            display: flex;
            align-items: center;
            gap: 4px;
            margin-left: 8px;
        }

        .selector-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #bfbfbf;
            transition: color 0.3s;
        }

        .selector-icon:hover {
            color: #595959;
        }

        .clear-icon {
            cursor: pointer;
            border-radius: 50%;
            background: transparent;
            transition: background 0.3s;
        }

        .clear-icon:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        .dropdown-container {
            position: ${isMobile ? 'fixed' : 'absolute'};
            top: ${isMobile ? '0' : 'calc(100% + 4px)'};
            left: ${isMobile ? '0' : '0'};
            right: ${isMobile ? '0' : 'auto'};
            bottom: ${isMobile ? '0' : 'auto'};
            width: ${isMobile ? '100%' : '100%'};
            min-width: ${isMobile ? '100vw' : `${typeof width === 'number' ? `${width}px` : width}`};
            background: white;
            border: ${isMobile ? 'none' : '1px solid #d9d9d9'};
            border-radius: ${isMobile ? '0' : '8px'};
            box-shadow: ${isMobile ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.15)'};
            z-index: ${isMobile ? '9999' : '1050'};
            overflow: hidden;
            animation: ${isMobile ? 'slideUp' : 'fadeIn'} 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideUp {
            from {
                transform: translateY(100%);
            }
            to {
                transform: translateY(0);
            }
        }

        .mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            border-bottom: 1px solid #f0f0f0;
            background: #fafafa;
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .mobile-title {
            font-size: 18px;
            font-weight: 600;
            color: #000;
        }

        .mobile-close {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: transparent;
            cursor: pointer;
            transition: background 0.3s;
            font-size: 20px;
            color: #666;
        }

        .mobile-close:active {
            background: rgba(0, 0, 0, 0.1);
        }

        .options-container {
            max-height: ${isMobile ? 'calc(100vh - 68px)' : '300px'};
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
        }

        .option-item {
            padding: ${isMobile ? '16px' : '10px 12px'};
            cursor: pointer;
            transition: background 0.2s;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: ${isMobile ? '52px' : 'auto'};
            border-bottom: ${isMobile ? '1px solid #f5f5f5' : 'none'};
        }

        .option-item:last-child {
            border-bottom: none;
        }

        .option-item:active {
            background: ${isMobile ? '#e6f7ff' : '#f5f5f5'};
        }

        @media (hover: hover) {
            .option-item:hover:not(.disabled) {
                background: #f5f5f5;
            }
        }

        .option-item.selected {
            background: #e6f7ff;
            font-weight: 500;
        }

        .option-item.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .option-label {
            flex: 1;
            font-size: ${isMobile ? '16px' : '14px'};
            line-height: 1.5;
            color: #000;
        }

        .option-checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid #d9d9d9;
            border-radius: 4px;
            margin-left: 12px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .option-checkbox.checked {
            background: #1890ff;
            border-color: #1890ff;
        }

        .option-checkbox.checked::after {
            content: '✓';
            color: white;
            font-size: 14px;
            font-weight: bold;
        }

        .mobile-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.45);
            z-index: 9998;
            animation: fadeInBackdrop 0.3s ease;
        }

        @keyframes fadeInBackdrop {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .empty-message {
            padding: 32px;
            text-align: center;
            color: #999;
            font-size: 14px;
        }

        /* スクロールバーのスタイリング */
        .options-container::-webkit-scrollbar {
            width: 6px;
        }

        .options-container::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        .options-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
        }

        .options-container::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="selector-wrapper">
                {label && (
                    <div style={{ marginBottom: '8px' }}>
                        <Text variant="body2" weight="medium" color="text">
                            {label}
                            {required && <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>}
                        </Text>
                    </div>
                )}
                
                <div className="custom-selector" ref={containerRef}>
                    <div 
                        className={`selector-trigger ${isOpen ? 'open' : ''}`}
                        style={sizeStyles[size]}
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                    >
                        <div className="selector-value">
                            {getDisplayValue() || placeholder}
                        </div>
                        <div className="selector-icons">
                            {allowClear && hasValue && !disabled && (
                                <div 
                                    className="selector-icon clear-icon"
                                    onClick={handleClear}
                                >
                                    ✕
                                </div>
                            )}
                            <div className="selector-icon">
                                {isOpen ? '▲' : '▼'}
                            </div>
                        </div>
                    </div>

                    {isOpen && (
                        <>
                            {isMobile && <div className="mobile-backdrop" onClick={() => setIsOpen(false)} />}
                            <div className="dropdown-container">
                                {isMobile && (
                                    <div className="mobile-header">
                                        <div className="mobile-title">
                                            {label || '選択してください'}
                                        </div>
                                        <div className="mobile-close" onClick={() => setIsOpen(false)}>
                                            ✕
                                        </div>
                                    </div>
                                )}
                                
                                <div className="options-container">
                                    {displayOptions.length > 0 ? (
                                        displayOptions.map((option) => {
                                            const isSelected = multiple
                                                ? multipleValue?.includes(option.value)
                                                : option.value === value;
                                            
                                            return (
                                                <div
                                                    key={String(option.value)}
                                                    className={`option-item ${isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`}
                                                    onClick={() => !option.disabled && handleSelect(option.value)}
                                                >
                                                    <span className="option-label">{option.label}</span>
                                                    {multiple && (
                                                        <div className={`option-checkbox ${isSelected ? 'checked' : ''}`} />
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="empty-message">
                                            選択肢がありません
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                
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
        </>
    );
};

// 型安全な文字列専用Selector
export const StringSelector: React.FC<StringSelectorProps> = (props) => {
    return <Selector<string> {...props} />;
};

export default Selector;