import { useWebSocket } from '../../hooks/useWebSocket';
import { getRoomManager } from '../../hooks/Reload';
import { requestMessage } from '../../hooks/useWebSocket';
import './GameSocketClient.css';

export const GameSocketClient = () => {
    const { connectionStatus, sendMessage } = useWebSocket();
    const createRequest:requestMessage = {
        type:"create",
    }

    return (
        <div>
            <p>WebSocket状態: {connectionStatus}</p>
            <button onClick={() => sendMessage(createRequest)}>
                ルーム作成
            </button>
            <button onClick={() => getRoomManager()}>
                更新
            </button>
        </div>
    );
};
