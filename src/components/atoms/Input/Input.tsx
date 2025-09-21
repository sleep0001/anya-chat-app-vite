import React from 'react';
import { Input as AntdInput } from 'antd';
import { InputProps as AntdInputProps, TextAreaProps as AntdTextAreaProps } from 'antd/es/input';

export interface InputProps extends Omit<AntdInputProps, 'size'> {
    /** ラベル */
    label?: string;
    /** エラーメッセージ */
    error?: string;
    /** ヘルプテキスト */
    helpText?: string;
    /** サイズ */
    size?: 'small' | 'medium' | 'large';
    /** 必須項目かどうか */
    required?: boolean;
}

export interface TextAreaProps extends Omit<AntdTextAreaProps, 'size'> {
    /** ラベル */
    label?: string;
    /** エラーメッセージ */
    error?: string;
    /** ヘルプテキスト */
    helpText?: string;
    /** サイズ */
    size?: 'small' | 'medium' | 'large';
    /** 必須項目かどうか */
    required?: boolean;
}

// Input コンポーネントの型を定義（TextAreaを含む）
interface InputComponent extends React.FC<InputProps> {
    TextArea: React.FC<TextAreaProps>;
}

const InputBase: React.FC<InputProps> = ({
    label,
    error,
    helpText,
    size = 'medium',
    required = false,
    className,
    style,
    ...props
}) => {
    // サイズマッピング
    const sizeMap = {
        small: 'small' as const,
        medium: 'middle' as const,
        large: 'large' as const,
    };

    const inputStyle = {
        borderRadius: '8px',
        ...style,
        ...(error && {
            borderColor: '#ff4d4f',
            boxShadow: '0 0 0 2px rgba(255, 77, 79, 0.2)',
        }),
    };

    return (
        <div className={`input-wrapper ${className || ''}`}>
            {label && (
                <label 
                    style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151'
                    }}
                >
                    {label}
                    {required && <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>}
                </label>
            )}
            
            <AntdInput
                size={sizeMap[size]}
                style={inputStyle}
                status={error ? 'error' : undefined}
                {...props}
            />
            
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

// TextArea コンポーネント
const TextArea: React.FC<TextAreaProps> = ({
    label,
    error,
    helpText,
    size = 'medium',
    required = false,
    className,
    style,
    ...props
}) => {
    // サイズマッピング
    const sizeMap = {
        small: 'small' as const,
        medium: 'middle' as const,
        large: 'large' as const,
    };

    const textAreaStyle = {
        borderRadius: '8px',
        ...style,
        ...(error && {
            borderColor: '#ff4d4f',
            boxShadow: '0 0 0 2px rgba(255, 77, 79, 0.2)',
        }),
    };

    return (
        <div className={`textarea-wrapper ${className || ''}`}>
            {label && (
                <label 
                    style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151'
                    }}
                >
                    {label}
                    {required && <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>}
                </label>
            )}
            
            <AntdInput.TextArea
                size={sizeMap[size]}
                style={textAreaStyle}
                status={error ? 'error' : undefined}
                {...props}
            />
            
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

// Input に TextArea を型安全に追加
const Input = InputBase as InputComponent;
Input.TextArea = TextArea;

export default Input;
export { TextArea };