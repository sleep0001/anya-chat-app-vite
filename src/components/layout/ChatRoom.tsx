import { useContexts } from "../../contexts/contexts";
import { useWebSocket } from '../../hooks/useWebSocket';

const ChatRoom = () => {
    const {
        entryRoomId
    } = useContexts();
    const { exitRoom } = useWebSocket();

    // メッセージ表示（3秒で消す）
    function showMessageTemporarily(msg) {
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => {
            setMessages((prev) => prev.filter(m => m !== msg));
        }, 3000);
    }

    return (
        <div>
            <h1>チャットルーム</h1>
            <h2>部屋Id：{entryRoomId}</h2>
            <button onClick={() => exitRoom(entryRoomId)}>退出</button>

        </div>
    )
}

export default ChatRoom;