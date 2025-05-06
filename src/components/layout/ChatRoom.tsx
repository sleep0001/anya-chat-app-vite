import { useContexts } from "../../contexts/contexts";
import { useWebSocket } from '../../hooks/useWebSocket';
import { List } from "antd";
import CutieButton from "../common/CutieButton";
import InputChatMessage from "../common/InputChatMessage";

const ChatRoom = () => {
    const {
        entryRoomId,
        showMessage
    } = useContexts();
    const { exitRoom, chatMessage } = useWebSocket();

    return (
        <div>
            <h1>チャットルーム</h1>
            <h2>部屋Id：{entryRoomId}</h2>
            <CutieButton
                label="出てくます！"
                onClick={() => exitRoom(entryRoomId)}
                color="#ff85c0"
                textColor="#ff85c0"
                type="default"
            />
            <CutieButton
                label="アニャ！"
                onClick={() => chatMessage("アニャ！", entryRoomId)}
                color="#ff85c0"
                textColor="#ffffff"
                type="primary"
            />
            <List
                style={{ borderRadius: '16px', overflow: 'auto', boxSizing: 'border-box', border: '1px solid #eee', marginTop: '10px', padding: '10px', marginBottom: '60px', backgroundColor: '#f4b3bb' }}
                itemLayout="horizontal"
                dataSource={showMessage.map(message => ({ title: message.text, description: message.timeStamp, isMe: message.isMe }))}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            padding: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#b58d86";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#f4b3bb";
                        }}
                    >
                        <List.Item.Meta
                            // avatar={<Avatar src={`https://...`} />}アイコンを設定できる。
                            title={<a style={{ color: '#402b28', textDecoration: 'none' }}>{item.title}</a>}
                            description={<p>{item.description}</p>}
                            style={ item.isMe ? {textAlign:'right'} : {}}
                        />
                    </List.Item>
                )}
            />
            <InputChatMessage entryRoomId={entryRoomId} />
        </div>
    )
}

export default ChatRoom;