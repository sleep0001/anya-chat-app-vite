import React, { useState } from 'react';
import { Space } from 'antd';
import { Button, Input } from '../../atoms';

export interface MessageInputProps {
    /** メッセージ送信ハンドラー */
    onSend: (message: string) => void;
    /** プレースホルダー */
    placeholder?: string;
    /** 送信ボタンのラベル */
    sendButtonLabel?: string;
    /** 送信ボタンの色 */
    sendButtonColor?: string;
    /** 最大文字数 */
    maxLength?: number;
    /** 無効状態 */
    disabled?: boolean;
    /** 固定位置（画面下部） */
    fixed?: boolean;
    /** Enterキーで送信するか */
    sendOnEnter?: boolean;
    /** 複数行入力を許可するか */
    multiline?: boolean;
    /** 高さ（multiline時） */
    rows?: number;
}

const MessageInput: React.FC<MessageInputProps> = ({
    onSend,
    placeholder = "メッセージを入力...",
    sendButtonLabel = "送信",
    sendButtonColor = "#1890ff",
    maxLength,
    disabled = false,
    fixed = false,
    sendOnEnter = true,
    multiline = false,
    rows = 3,
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleSend = () => {
        const trimmedValue = inputValue.trim();
        if (!trimmedValue || disabled) return;
        
        onSend(trimmedValue);
        setInputValue("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (sendOnEnter && e.key === 'Enter' && !e.shiftKey && !multiline) {
            e.preventDefault();
            handleSend();
        }
    };

    const isValid = inputValue.trim().length > 0;

    const containerStyle: React.CSSProperties = {
        ...(fixed && {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            padding: '12px 16px',
            zIndex: 1000,
            borderTop: '1px solid #f0f0f0',
            boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
        }),
        ...(!fixed && {
            padding: '12px',
            backgroundColor: '#fafafa',
            borderRadius: '12px',
            border: `2px solid ${isFocused ? sendButtonColor + '40' : '#f0f0f0'}`,
            transition: 'border-color 0.3s ease',
        }),
    };

    const inputContainerStyle: React.CSSProperties = {
        flex: 1,
    };

    const characterCountStyle: React.CSSProperties = {
        fontSize: '12px',
        color: maxLength && inputValue.length > maxLength * 0.8 ? '#ff4d4f' : '#999',
        textAlign: 'right',
        marginTop: '4px',
    };

    // 共通のプロパティ
    const commonInputProps = {
        value: inputValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
            setInputValue(e.target.value),
        onKeyPress: handleKeyPress,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        placeholder,
        disabled,
        maxLength,
    };

    // 基本スタイル（resize を除く）
    const baseInputStyle: React.CSSProperties = {
        borderRadius: '8px',
    };

    return (
        <div style={containerStyle}>
            <Space.Compact style={{ width: '100%', display: 'flex', gap: '8px' }}>
                <div style={inputContainerStyle}>
                    {multiline ? (
                        <Input.TextArea
                            {...commonInputProps}
                            rows={rows}
                            style={{
                                ...baseInputStyle,
                                resize: 'none' as const, // 明示的に型を指定
                            }}
                        />
                    ) : (
                        <Input
                            {...commonInputProps}
                            style={baseInputStyle}
                        />
                    )}
                    {maxLength && (
                        <div style={characterCountStyle}>
                            {inputValue.length}/{maxLength}
                        </div>
                    )}
                </div>
                
                <Button
                    onClick={handleSend}
                    disabled={disabled || !isValid}
                    color={sendButtonColor}
                    size="medium"
                    style={{
                        minWidth: '80px',
                        height: multiline ? 'auto' : '40px',
                        alignSelf: multiline ? 'flex-end' : 'center',
                    }}
                >
                    {sendButtonLabel}
                </Button>
            </Space.Compact>
        </div>
    );
};

export default MessageInput;