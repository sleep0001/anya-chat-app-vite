import { useWebSocket } from '../../hooks/useWebSocket';
import { fetchRooms } from '../../hooks/Reload';
import { requestMessage } from '../../hooks/useWebSocket';
import { useContexts } from '../../contexts/contexts'
import './GameSocketClient.css';
import Lobby from './Lobby';
import { useEffect } from 'react';
import ChatRoom from './ChatRoom';

export const GameSocketClient = () => {
    const {
        isEnter,
        setRoomIds,
        entryRoomId
    } = useContexts();

    const { connectionStatus, sendMessage } = useWebSocket();
    const createRequest:requestMessage = {
        type:"create",
    }

    useEffect(() => {
        fetchRooms(setRoomIds);
    }, [])

    return (
        <div>
            <p>WebSocket状態: {connectionStatus}</p>
            <button onClick={() => sendMessage(createRequest)}>
                ルーム作成
            </button>
            <button onClick={() => fetchRooms(setRoomIds)}>
                更新
            </button>
            <Lobby/>
        </div>
    );
};
