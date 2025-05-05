import { useContexts } from "../../contexts/contexts";
import { useWebSocket } from '../../hooks/useWebSocket';

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
            <button onClick={() => exitRoom(entryRoomId)}>退出</button>
            <p>{showMessage}</p>
            <button onClick={() => chatMessage("テスト送信メッセージ送信", entryRoomId)} >メッセージ送信</button>
        </div>
    )
}

export default ChatRoom;