import React, { useEffect, useRef, useState } from 'react';

export const GameSocketClient = () => {
    const socketRef = useRef<WebSocket | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<string>('接続中...');
    const reconnectTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        let isComponentMounted = true;
        
        const connectWebSocket = () => {
            // 既存の接続があれば閉じる
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
            
            try {
                socketRef.current = new WebSocket("ws://localhost:8080/ws/game");

                socketRef.current.onopen = () => {
                    if (isComponentMounted) {
                        console.log("WebSocket接続成功");
                        setConnectionStatus('接続済み');
                        socketRef.current?.send("こんにちは Spring Boot！");
                    }
                };

                socketRef.current.onmessage = (event) => {
                    if (isComponentMounted) {
                        console.log("サーバーからの応答:", event.data);
                    }
                };

                socketRef.current.onerror = (error) => {
                    if (isComponentMounted) {
                        console.error("WebSocket エラー:", error);
                        setConnectionStatus('接続エラー');
                    }
                };

                socketRef.current.onclose = () => {
                    if (isComponentMounted) {
                        console.log("WebSocket接続が閉じられました");
                        setConnectionStatus('切断されました');
                        
                        // 再接続タイマーをクリア
                        if (reconnectTimeoutRef.current) {
                            window.clearTimeout(reconnectTimeoutRef.current);
                            reconnectTimeoutRef.current = null;
                        }
                        
                        // 3秒後に再接続を試みる
                        reconnectTimeoutRef.current = window.setTimeout(connectWebSocket, 3000);
                    }
                };
            } catch (error) {
                if (isComponentMounted) {
                    console.error("WebSocket接続エラー:", error);
                    setConnectionStatus('接続エラー');
                }
            }
        };

        // 初回接続
        connectWebSocket();

        // クリーンアップ関数
        return () => {
            isComponentMounted = false;
            
            // 再接続タイマーをクリア
            if (reconnectTimeoutRef.current) {
                window.clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
            
            // WebSocket接続を閉じる
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, []);

    return <div>WebSocket状態: {connectionStatus}</div>;
};