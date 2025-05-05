// hooks/useWebSocket.ts
import { useEffect, useRef, useState } from 'react';

export const useWebSocket = () => {
    const url:string = "ws://localhost:8080/ws/game"
    const socketRef = useRef<WebSocket | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<string>('接続中...');
    const reconnectTimeoutRef = useRef<number | null>(null);

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
                    console.log('サーバーからの応答:', event.data);
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

    return {
        connectionStatus,
        sendMessage: (msg: requestMessage) => socketRef.current?.send(JSON.stringify(msg)),
    };
};
export type requestMessage = 
        | { type:"create" }
        | { type:"enter"; roomId:string }
        | { type:"exit"; roomId:string };