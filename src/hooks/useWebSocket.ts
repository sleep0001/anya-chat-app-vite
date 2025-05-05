// hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react';
import { useContexts } from '../contexts/contexts';
import { useNavigate } from 'react-router-dom';

export const useWebSocket = () => {
    const url:string = "ws://localhost:8080/ws/game"
    const socketRef = useRef<WebSocket | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<string>('接続中...');
    const reconnectTimeoutRef = useRef<number | null>(null);
    const {
        setEntryRoomId
    } = useContexts();
    const navigate = useNavigate();
    const handleEnterRoom = (roomId: string) => {
        navigate(`/room/${roomId}`);
    };

    useEffect(() => {
        let isMounted = true;

        const connect = () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }

            try {
                socketRef.current = new WebSocket(url);

                socketRef.current.onopen = () => {
                    if (!isMounted) return;
                    console.log('WebSocket接続成功');
                    setConnectionStatus('接続済み');
                };

                socketRef.current.onmessage = (event) => {
                    if (!isMounted) return;
                    const data = JSON.parse(event.data);
                    console.log('サーバーからの応答:', data);
                    switch(data.type) {
                        case "room_created":
                            enterRoom(data.roomId);
                    }
                };

                socketRef.current.onerror = (error) => {
                    if (!isMounted) return;
                    console.error('WebSocket エラー:', error);
                    setConnectionStatus('接続エラー');
                };

                socketRef.current.onclose = () => {
                    if (!isMounted) return;
                    console.log('WebSocket接続が閉じられました');
                    setConnectionStatus('切断されました');

                    if (reconnectTimeoutRef.current) {
                        window.clearTimeout(reconnectTimeoutRef.current);
                    }

                    reconnectTimeoutRef.current = window.setTimeout(connect, 3000);
                };
            } catch (error) {
                if (isMounted) {
                    console.error('WebSocket接続エラー:', error);
                    setConnectionStatus('接続エラー');
                }
            }
        };

        connect();

        return () => {
            isMounted = false;
            if (reconnectTimeoutRef.current) {
                window.clearTimeout(reconnectTimeoutRef.current);
            }
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [url]);

    const enterRoom = (roomId:string) => {
        const message:requestMessage = {
            type:"enter",
            roomId:roomId
        }
        sendMessage(message);
        setEntryRoomId(roomId);
        handleEnterRoom(roomId);
    }

    const sendMessage = (msg: requestMessage) => {
        socketRef.current?.send(JSON.stringify(msg))
    }

    return {
        connectionStatus,
        sendMessage,
    };
};


export type requestMessage = 
        | { type:"create" }
        | { type:"enter"; roomId:string }
        | { type:"exit"; roomId:string };