import React from 'react';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

export interface ErrorDisplayProps {
    /** エラーメッセージ */
    message?: string;
    /** エラータイトル */
    title?: string;
    /** 詳細エラー情報（開発者向け） */
    details?: string;
    /** リトライボタンを表示するか */
    showRetry?: boolean;
    /** リトライハンドラー */
    onRetry?: () => void;
    /** リトライボタンのラベル */
    retryLabel?: string;
    /** エラーアイコンを表示するか */
    showIcon?: boolean;
    /** サイズ */
    size?: 'small' | 'medium' | 'large';
    /** 中央揃えにするか */
    centered?: boolean;
    /** 詳細表示を折りたたみ可能にするか */
    collapsible?: boolean;
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    message = 'エラーが発生しました',
    title = 'エラー',
    details,
    showRetry = false,
    onRetry,
    retryLabel = '再試行',
    showIcon = true,
    size = 'medium',
    centered = true,
    collapsible = true,
    style,
    className,
}) => {
    const [showDetails, setShowDetails] = React.useState(false);

    const getSizeConfig = (size: string) => {
        const sizeMap = {
            small: { 
                iconSize: 'medium' as const, 
                titleVariant: 'h6' as const, 
                messageVariant: 'body2' as const,
                padding: '12px'
            },
            medium: { 
                iconSize: 'large' as const, 
                titleVariant: 'h5' as const, 
                messageVariant: 'body1' as const,
                padding: '16px'
            },
            large: { 
                iconSize: 'xlarge' as const, 
                titleVariant: 'h4' as const, 
                messageVariant: 'body1' as const,
                padding: '20px'
            },
        };
        return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
    };

    const sizeConfig = getSizeConfig(size);

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        textAlign: centered ? 'center' : 'left',
        padding: sizeConfig.padding,
        borderRadius: '12px',
        border: '1px solid #ffcdd2',
        backgroundColor: '#ffeef0',
        gap: '12px',
        maxWidth: '500px',
        ...style,
    };

    const iconContainerStyle: React.CSSProperties = {
        color: '#f44336',
        marginBottom: '8px',
    };

    const detailsStyle: React.CSSProperties = {
        backgroundColor: '#f5f5f5',
        padding: '12px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#666',
        whiteSpace: 'pre-wrap',
        maxHeight: '200px',
        overflowY: 'auto',
        width: '100%',
        textAlign: 'left',
    };

    const toggleButtonStyle: React.CSSProperties = {
        fontSize: '12px',
        padding: '4px 8px',
        marginTop: '8px',
    };

    return (
        <div className={`error-display-atom ${className || ''}`} style={containerStyle}>
            {showIcon && (
                <div style={iconContainerStyle}>
                    <Icon name="exclamation-circle" size={sizeConfig.iconSize} color="#f44336" />
                </div>
            )}

            <Text variant={sizeConfig.titleVariant} weight="bold" color="error">
                {title}
            </Text>

            <Text variant={sizeConfig.messageVariant} color="secondary">
                {message}
            </Text>

            {showRetry && onRetry && (
                <Button
                    onClick={onRetry}
                    color="#f44336"
                    size="medium"
                    style={{ marginTop: '8px' }}
                >
                    {retryLabel}
                </Button>
            )}

            {details && collapsible && (
                <>
                    <Button
                        onClick={() => setShowDetails(!showDetails)}
                        variant="ghost"
                        size="small"
                        style={toggleButtonStyle}
                    >
                        {showDetails ? '詳細を隠す' : '詳細を表示'}
                    </Button>
                    {showDetails && (
                        <div style={detailsStyle}>
                            {details}
                        </div>
                    )}
                </>
            )}

            {details && !collapsible && (
                <div style={detailsStyle}>
                    {details}
                </div>
            )}
        </div>
    );
};

export default ErrorDisplay;