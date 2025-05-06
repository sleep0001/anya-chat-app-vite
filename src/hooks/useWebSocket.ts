// hooks/useWebSocket.ts
import { useEffect, useRef } from 'react';
import { useContexts } from '../contexts/contexts';
import { useNavigate } from 'react-router-dom';
import { fetchRooms } from './Reload';
import { v4 as uuidV4 } from 'uuid';
import { Message } from '../types/Types';

export const useWebSocket = () => {
    const url:string = "ws://localhost:8080/ws/game"
    const userId = localStorage.getItem("userId");
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    type response = {
        type:"roomCreated" | "message";
        message:string;
        roomId:string;
        timeStamp:string;
    }
    const {
        setRoomIds,
        setEntryRoomId,
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
                };

                socketRef.current.onmessage = (event) => {
                    if (!isMounted) return;
                    const data:response = JSON.parse(event.data);
                    console.log('サーバーからの応答:', data.message);
                    processServerResponse(data);
                };

                socketRef.current.onerror = (error) => {
                    if (!isMounted) return;
                    console.error('WebSocket エラー:', error);
                };

                socketRef.current.onclose = () => {
                    if (!isMounted) return;
                    console.log('WebSocket接続が閉じられました');
                    setShowMessage([])

                    if (reconnectTimeoutRef.current) {
                        window.clearTimeout(reconnectTimeoutRef.current);
                    }

                    reconnectTimeoutRef.current = window.setTimeout(connect, 3000);
                };
            } catch (error) {
                if (isMounted) {
                    console.error('WebSocket接続エラー:', error);
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

    const processServerResponse = (responseData:response) => {
        switch(responseData.type) {
            case "roomCreated":
                enterRoom(responseData.roomId);
                break;
            case "message":
                console.log("受信しました。")
                reserveMessage(responseData);
                break;
        }
    }

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
        setShowMessage([])
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
    }

    const reserveMessage = (responseData:response) => {
        const id:string = uuidV4();
        const newMessage:Message = { id, text:responseData.message, timeStamp:responseData.timeStamp};
        console.log(newMessage);
        setShowMessage((prev) => {
            const updated = [...prev, newMessage];
            // 削除タイマーはここでスケジュール
            setTimeout(() => {
                setShowMessage((current) => current.filter((m) => m.id !== id));
            }, 3000);
            return updated;
        });
    };

    return {
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