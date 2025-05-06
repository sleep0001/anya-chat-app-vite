import { useContexts } from "../../contexts/contexts";
import { useWebSocket } from '../../hooks/useWebSocket';
import { List, Avatar } from "antd";
import CutieButton from "../common/CutieButton";
import InputChatMessage from "../common/InputChatMessage";

const ChatRoom = () => {
    const {
        entryRoom,
        showMessage
    } = useContexts();
    const { exitRoom, chatMessage } = useWebSocket();

    return (
        <div>
            <h1>チャットルーム</h1>
            <h2>ルーム名：{entryRoom.roomName}</h2>
            <CutieButton
                label="出てくます！"
                onClick={() => exitRoom(entryRoom.roomId)}
                color="#ff85c0"
                textColor="#ff85c0"
                type="default"
            />
            <CutieButton
                label="アニャ！"
                onClick={() => chatMessage("アニャ！", entryRoom.roomId)}
                color="#ff85c0"
                textColor="#ffffff"
                type="primary"
            />
            <List
                className="message-container"
                style={{
                    borderRadius: '16px',
                    overflow: 'auto',
                    boxSizing: 'border-box',
                    border: '1px solid #eee',
                    marginTop: '10px',
                    padding: '10px',
                    marginBottom: '60px',
                    backgroundColor: '#f4b3bb',
                }}
                itemLayout="horizontal"
                dataSource={showMessage.map(message => ({ title: message.text, description: message.timeStamp, isMe: message.isMe }))}
                renderItem={(item) => (
                    <List.Item style={{ padding: 0, borderRadius: '8px', overflow: 'hidden' }}>
                        <div
                            className="chat-message"
                            style={{
                                width: '100%',
                                transition: 'background-color 0.3s ease',
                                textAlign: item.isMe ? 'right' : 'left',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#ffbfc2";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#f4b3bb";
                            }}
                        >
                            <List.Item.Meta
                                avatar={ item.isMe ? "" : <Avatar src={`https://spy-family.net/assets/img/special/anya/01.png`} />}
                                title={<p style={{ margin: 0, color: '#402b28' }}>{item.title}</p>}
                                description={<p style={{ margin: 0 }}>{item.description}</p>}
                            />
                        </div>

                    </List.Item>
                )}
            />
            <InputChatMessage entryRoomId={entryRoom.roomId} />
        </div>
    )
}

export default ChatRoom;