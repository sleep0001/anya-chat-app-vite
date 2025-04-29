import { useWebSocket } from '../hooks/useWebSocket';

export const GameSocketClient = () => {
    const { connectionStatus, sendMessage } = useWebSocket();
    const requestMessage = {
        type:"create"
    }

    return (
        <div>
            <p>WebSocket状態: {connectionStatus}</p>
            <button onClick={() => sendMessage(requestMessage)}>
                メッセージ送信
            </button>
        </div>
    );
};
