import { useContexts } from "../../contexts/contexts";
import { useWebSocket } from '../../hooks/useWebSocket';

const ChatRoom = () => {
    const {
        entryRoomId
    } = useContexts();
    const { exitRoom } = useWebSocket();

    return (
        <div>
            <h1>チャットルーム</h1>
            <h2>部屋Id：{entryRoomId}</h2>
            <button onClick={() => exitRoom(entryRoomId)}>退出</button>

        </div>
    )
}

export default ChatRoom;