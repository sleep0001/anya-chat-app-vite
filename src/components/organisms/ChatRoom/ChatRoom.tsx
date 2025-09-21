import React from 'react';
import { List } from 'antd';
import { useContexts } from '../../../contexts/contexts';
import { useWebSocket } from '../../../hooks/useWebSocket';
import { Button, Text, Avatar } from '../../atoms';
import { ChatMessageInput } from '../../molecules';

export interface ChatRoomProps {
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
    /** メッセージリストの最大高さ */
    maxHeight?: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
    style,
    className,
    maxHeight = 'calc(100vh - 200px)',
}) => {
    const { entryRoom, showMessage } = useContexts();
    const { exitRoom, chatMessage } = useWebSocket();

    const handleExitRoom = () => {
        exitRoom(entryRoom.roomId);
    };

    const handleAnyaMessage = () => {
        chatMessage("アニャ！", entryRoom.roomId);
    };

    const containerStyle: React.CSSProperties = {
        padding: '20px',
        paddingBottom: '80px', // ChatMessageInputの固定領域分のスペースを確保
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        ...style,
    };

    const headerStyle: React.CSSProperties = {
        marginBottom: '20px',
        textAlign: 'center',
        padding: '16px',
        backgroundColor: 'rgba(244, 179, 187, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(244, 179, 187, 0.3)',
    };

    const buttonGroupStyle: React.CSSProperties = {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
    };

    const messageListStyle: React.CSSProperties = {
        flex: 1,
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #eee',
        backgroundColor: '#f4b3bb',
        maxHeight,
        overflowY: 'auto',
        boxShadow: '0 4px 12px rgba(244, 179, 187, 0.3)',
    };

    const messageContainerStyle: React.CSSProperties = {
        padding: '16px',
        minHeight: '200px',
    };

    const getMessageItemStyle = (isMe: boolean): React.CSSProperties => ({
        padding: '12px 16px',
        borderRadius: '12px',
        marginBottom: '12px',
        transition: 'all 0.3s ease',
        backgroundColor: isMe ? 'rgba(255, 133, 192, 0.15)' : 'rgba(255, 255, 255, 0.2)',
        border: `1px solid ${isMe ? 'rgba(255, 133, 192, 0.3)' : 'rgba(255, 255, 255, 0.3)'}`,
        textAlign: isMe ? 'right' : 'left',
        marginLeft: isMe ? '20%' : '0',
        marginRight: isMe ? '0' : '20%',
    });

    const emptyStateStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#666',
    };

    return (
        <div className={`chatroom-organism ${className || ''}`} style={containerStyle}>
            {/* ヘッダー部分 */}
            <div style={headerStyle}>
                <Text variant="h5" weight="medium" color="secondary" style={{ marginBottom: '12px' }}>
                    ROOM：{entryRoom.roomName}
                </Text>
                <Text variant="body2" color="info">
                    ひみつつうしん、ワクワク！！
                </Text>
            </div>

            {/* ボタン群 */}
            <div style={buttonGroupStyle}>
                <Button
                    onClick={handleExitRoom}
                    variant="secondary"
                    color="#ff85c0"
                    textColor="#ff85c0"
                    size="medium"
                    shape="round"
                    style={{ minWidth: '120px' }}
                >
                    🚪 出てくます！
                </Button>
                
                <Button
                    onClick={handleAnyaMessage}
                    color="#ff85c0"
                    textColor="#ffffff"
                    size="medium"
                    shape="round"
                    style={{ minWidth: '120px' }}
                >
                    🥜 アニャ！
                </Button>
            </div>

            {/* メッセージリスト */}
            <div style={messageListStyle}>
                <div style={messageContainerStyle}>
                    {showMessage.length === 0 ? (
                        <div style={emptyStateStyle}>
                            <Text variant="h6" color="secondary" style={{ marginBottom: '8px' }}>
                                まだメッセージがありません
                            </Text>
                            <Text variant="body2" color="secondary">
                                最初のメッセージを送信してみましょう！
                            </Text>
                        </div>
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={showMessage.map(message => ({
                                id: message.id,
                                title: message.text,
                                description: message.timeStamp,
                                isMe: message.isMe
                            }))}
                            renderItem={(item) => (
                                <div
                                    style={getMessageItemStyle(item.isMe)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = item.isMe 
                                            ? "rgba(255, 133, 192, 0.25)" 
                                            : "rgba(255, 255, 255, 0.35)";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = item.isMe 
                                            ? "rgba(255, 133, 192, 0.15)" 
                                            : "rgba(255, 255, 255, 0.2)";
                                        e.currentTarget.style.transform = "translateY(0px)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <List.Item style={{ 
                                        padding: 0, 
                                        border: 'none',
                                        marginBottom: 0,
                                    }}>
                                        <List.Item.Meta
                                            avatar={!item.isMe ? (
                                                <Avatar 
                                                    src="https://spy-family.net/assets/img/special/anya/01.png"
                                                    size="medium"
                                                    alt="Anya"
                                                    style={{
                                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                                        border: '2px solid #ffffff'
                                                    }}
                                                />
                                            ) : undefined}
                                            title={
                                                <Text 
                                                    variant="body1" 
                                                    weight="medium" 
                                                    color="#402b28"
                                                    style={{ 
                                                        margin: 0,
                                                        wordBreak: 'break-word'
                                                    }}
                                                >
                                                    {item.title}
                                                </Text>
                                            }
                                            description={
                                                <Text 
                                                    variant="caption" 
                                                    color="secondary"
                                                    style={{ 
                                                        margin: 0,
                                                        opacity: 0.7,
                                                        marginTop: '4px'
                                                    }}
                                                >
                                                    {item.description}
                                                    {item.isMe && " (あなた)"}
                                                </Text>
                                            }
                                        />
                                    </List.Item>
                                </div>
                            )}
                        />
                    )}
                </div>
            </div>

            {/* メッセージ入力 */}
            <ChatMessageInput 
                entryRoomId={entryRoom.roomId}
                placeholder="send message to anya"
                sendButtonLabel="送るます"
                sendButtonColor="#ff85c0"
                maxLength={500}
                fixed={true}
            />
        </div>
    );
};

export default ChatRoom;