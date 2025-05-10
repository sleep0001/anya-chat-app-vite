// hooks/useWebSocket.ts
import { useEffect, useRef } from 'react';
import { useContexts } from '../contexts/contexts';
import { useNavigate } from 'react-router-dom';
import { fetchRooms } from './Reload';
import { v4 as uuidV4 } from 'uuid';
import { Message, Room } from '../types/Types';
import dayjs from "dayjs";

export const useWebSocket = () => {
    const url:string = "wss://www.sl33p.net/ws/game"
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    type response = {
        type:"roomCreated" | "message" | "enterAccepted" | "enterRejected";
        message:string;
        room:Room;
        timeStamp:string;
        userId:string;
        roomName:string;
    }
    const {
        userId,
        setUserId,
        setRooms,
        setEntryRoom,
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
                let finalUserId:string = userId;
                const localStorageUserId:string = localStorage.getItem("userId") ?? "";
                if (!userId && !localStorageUserId) {
                    // どちらも空or未定義
                    finalUserId = uuidV4();
                    setUserId(finalUserId);
                    localStorage.setItem("userId", finalUserId);
                } else if(!userId && localStorageUserId) {
                    // userIdが空or未定義
                    finalUserId = localStorageUserId;
                    setUserId(localStorageUserId);
                } else if (userId && !localStorageUserId) {
                    // ローカルストレージが空or未定義
                    localStorage.setItem("userId", finalUserId);
                }

                socketRef.current = new WebSocket(url + `?userId=${finalUserId}`);

                socketRef.current.onopen = () => {
                    if (!isMounted) return;
                    console.log('WebSocket接続成功');
                };

                socketRef.current.onmessage = (event) => {
                    if (!isMounted) return;
                    const data:response = JSON.parse(event.data);
                    console.log('サーバーからの応答:', event);
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
                enterRoom(responseData.room);
                break;
            case "message":
                console.log("受信しました。")
                reserveMessage(responseData);
                break;
            case "enterAccepted":
                console.log("入室許可");
                navigate(`/room/${responseData.room.roomId}`);
                break;
            case "enterRejected":
                console.log("入室拒否");
                // フラッシュメッセージにしたい。
                alert("満席ます。");
                break;
        }
    }

    const enterRoom = (room:Room) => {
        const message:requestMessage = {
            type:"enter",
            roomId:room.roomId,
        }
        console.log(message);
        sendMessage(message);
        setEntryRoom(room);
    }

    const exitRoom = (roomId:string) => {
        const message:requestMessage = {
            // userId:userId,
            type:"exit",
            roomId:roomId
        }
        sendMessage(message);
        setEntryRoom({roomId:"", roomName:""});
        setShowMessage([])
        navigate(`/`);
        useEffect(() => {
            fetchRooms(setRooms);
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
        const timeStamp:string = dayjs(responseData.timeStamp.replace(/\.\d+Z$/, 'Z')).format("HH:mm:ss");
        const isMe:boolean = responseData.userId == userId;
        const newMessage:Message = { id, text:responseData.message, timeStamp, isMe };
        console.log(newMessage);
        setShowMessage((prev) => {
            const updated = [...prev, newMessage];
            console.log(updated);
            // 削除タイマーはここでスケジュール 日付をまたぐ場合にはparseTodayTimeに考慮が必要
            setTimeout(() => {
                setShowMessage((current) => current.filter((m) => m.id !== id));
            }, 100000);
            const sorted = [...updated].sort((a, b) =>
                parseTodayTime(b.timeStamp).getTime() - parseTodayTime(a.timeStamp).getTime()
            );
            console.log(sorted);
            return sorted;
        });
    };

    const parseTodayTime = (timeStr:string):Date => {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        const now = new Date();
        now.setHours(hours, minutes, seconds);
        return now;
    }

    return {
        sendMessage,
        enterRoom,
        exitRoom,
        chatMessage
    };
};

export type requestMessage =
        | { type:"create"; roomName:string }
        | { type:"enter"; roomId:string }
        | { type:"exit"; roomId:string }
        | { type:"message"; roomId:string; message:string };