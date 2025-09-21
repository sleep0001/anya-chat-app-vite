import React, { useEffect } from 'react';
import { List } from 'antd';
import { useContexts } from '../../../contexts/contexts';
import { useWebSocket } from '../../../hooks/useWebSocket';
import { fetchRooms } from '../../../hooks/Reload';
import { LobbyActions } from '../../molecules';
import { Text, Avatar } from '../../atoms';
import { Room } from '../../../types/Types';

export interface LobbyProps {
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
    /** 最大幅 */
    maxWidth?: number | string;
    /** ルーム一覧の最大高さ */
    maxHeight?: string;
}

const Lobby: React.FC<LobbyProps> = ({
    style,
    className,
    maxWidth = 800,
    maxHeight = '60vh',
}) => {
    const { rooms, setRooms } = useContexts();
    const { enterRoom } = useWebSocket();

    useEffect(() => {
        fetchRooms(setRooms);
    }, [setRooms]);

    const handleRoomClick = (room: Room) => {
        enterRoom(room);
    };

    const containerStyle: React.CSSProperties = {
        maxWidth,
        width: '100%',
        display: 'block',
        margin: '0 auto',
        padding: '20px',
        ...style,
    };

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        marginBottom: '24px',
    };

    const roomListStyle: React.CSSProperties = {
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #eee',
        marginTop: '16px',
        backgroundColor: '#f4b3bb',
        boxShadow: '0 4px 12px rgba(244, 179, 187, 0.3)',
        maxHeight,
        overflowY: 'auto',
    };

    const emptyStateStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: '40px 20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        marginTop: '16px',
    };

    if (rooms.length === 0) {
        return (
            <div className={`lobby-organism ${className || ''}`} style={containerStyle}>
                {/* ヘッダー */}
                <div style={headerStyle}>
                    <Text variant="h3" weight="bold" color="primary" style={{ marginBottom: '12px' }}>
                        アニャチャットロビー
                    </Text>
                    <Text variant="body1" color="secondary">
                        新しいルームを作成するか、既存のルームに参加しよう！
                    </Text>
                </div>

                {/* アクションボタン */}
                <LobbyActions />

                {/* 空の状態 */}
                <div style={emptyStateStyle}>
                    <Text variant="h6" color="secondary" style={{ marginBottom: '8px' }}>
                        現在アクティブなルームはありません
                    </Text>
                    <Text variant="body2" color="secondary">
                        「ルーム作成」ボタンで新しいチャットルームを作成できます
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div className={`lobby-organism ${className || ''}`} style={containerStyle}>
            {/* ヘッダー */}
            <div style={headerStyle}>
                <Text variant="h3" weight="bold" color="primary" style={{ marginBottom: '12px' }}>
                    アニャチャットロビー
                </Text>
                <Text variant="body1" color="secondary" style={{ marginBottom: '8px' }}>
                    新しいルームを作成するか、既存のルームに参加しよう！
                </Text>
                <Text variant="body2" weight="medium" color="success">
                    {rooms.length}個のアクティブルーム
                </Text>
            </div>

            {/* アクションボタン */}
            <LobbyActions />

            {/* ルーム一覧 */}
            <List
                style={roomListStyle}
                itemLayout="horizontal"
                dataSource={rooms.map((room: Room) => ({ room }))}
                renderItem={(item, index) => (
                    <List.Item
                        onClick={() => handleRoomClick(item.room)}
                        style={{
                            padding: '16px 20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            borderBottom: index < rooms.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                            backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#b58d86";
                            e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.transform = "translateX(0px)";
                        }}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    size="medium"
                                    backgroundColor="#ff85c0"
                                    textColor="#ffffff"
                                    style={{ 
                                        fontSize: '18px', 
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 8px rgba(255, 133, 192, 0.3)'
                                    }}
                                >
                                    {item.room.roomName.charAt(0)}
                                </Avatar>
                            }
                            title={
                                <Text 
                                    variant="body1" 
                                    weight="semibold" 
                                    color="#402b28"
                                    style={{ 
                                        textDecoration: 'none',
                                        display: 'block',
                                        marginBottom: '4px'
                                    }}
                                >
                                    {item.room.roomName}
                                </Text>
                            }
                            description={
                                <Text 
                                    variant="caption" 
                                    color="secondary"
                                    style={{ opacity: 0.8 }}
                                >
                                    ルームID: {item.room.roomId.substring(0, 8)}...
                                </Text>
                            }
                        />
                        
                        {/* 参加インジケーター */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Text 
                                variant="caption" 
                                weight="medium"
                                color="#402b28"
                            >
                                参加する →
                            </Text>
                        </div>
                    </List.Item>
                )}
            />

            {/* フッター情報 */}
            <div style={{ 
                textAlign: 'center', 
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'rgba(244, 179, 187, 0.1)',
                borderRadius: '8px'
            }}>
                <Text variant="caption" color="secondary">
                    💡 ヒント: ルームをクリックして参加、または新しいルームを作成してお友達を招待しよう！
                </Text>
            </div>
        </div>
    );
};

export default Lobby;