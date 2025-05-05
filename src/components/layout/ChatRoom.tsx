import { useContexts } from "../../contexts/contexts";

const ChatRoom = () => {
    const {
        entryRoomId
    } = useContexts();
    return (
        <div>
            <h1>チャットルーム</h1>
            <h2>部屋Id：{entryRoomId}</h2>

        </div>
    )
}

export default ChatRoom;