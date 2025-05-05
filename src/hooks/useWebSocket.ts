// hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react';
import { useContexts } from '../contexts/contexts';
import { useNavigate } from 'react-router-dom';
import { fetchRooms } from './Reload';

export const useWebSocket = () => {
    const url:string = "ws://localhost:8080/ws/game"
    const userId = localStorage.getItem("userId");
    const socketRef = useRef<WebSocket | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<string>('接続中...');
    const reconnectTimeoutRef = useRef<number | null>(null);
    const {
        setRoomIds,
        setEntryRoomId,
        showMessage,
        setShowMessage
    } = useContexts();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const connect = () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }

            try {
                console.log(url + `?userId=${userId}`);
                socketRef.current = new WebSocket(url + `?userId=${userId}`);

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
                        case "roomCreated":
                            enterRoom(data.roomId);
                            break;
                        case "message":
                            reserveMessage(data.message);
                            break;
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
        // ここで入室判定して、満員ならはじく
        navigate(`/room/${roomId}`);
    }

    const exitRoom = (roomId:string) => {
        const message:requestMessage = {
            // userId:userId,
            type:"exit",
            roomId:roomId
        }
        sendMessage(message);
        setEntryRoomId("");
        navigate(`/`);
        useEffect(() => {
            fetchRooms(setRoomIds);
        }, [])
        
    }

    const sendMessage = (msg: requestMessage) => {
        socketRef.current?.send(JSON.stringify(msg))
    }

    const chatMessage = (msg:string,roomId:string) => {
        const message:requestMessage = {
            type:"message",
            roomId:roomId,
            message:msg
        }
        sendMessage(message);
        console.log(message)
    }

    const reserveMessage = (msg: string) => {
        // どこかにmsgをセットして10秒間くらい表示したい。そのあとゆっくり消したい。
        console.log(msg);
        setShowMessage([...showMessage, msg]);
        setTimeout(() => {
            setShowMessage(showMessage.slice(1));
        }, 50000);
    };

    return {
        connectionStatus,
        sendMessage,
        enterRoom,
        exitRoom,
        chatMessage
    };
};

export type requestMessage =
        | { type:"create" }
        | { type:"enter"; roomId:string }
        | { type:"exit"; roomId:string }
        | { type:"message"; roomId:string; message:string };