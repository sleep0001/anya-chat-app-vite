import { Space, Input, Button } from "antd";
import { useWebSocket } from "../../hooks/useWebSocket";
import React, { useState } from "react";

type Props = {
    entryRoomId: string;
};

const InputChatMessage: React.FC<Props> = ({ entryRoomId }) => {
    const { chatMessage } = useWebSocket();
    const [inputValue, setInputValue] = useState<string>("");

    const handleSend = () => {
        if (!inputValue?.trim()) return;
        chatMessage(inputValue, entryRoomId);
        setInputValue("");
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '10vh',  // フッターの高さに合わせて下げる
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                padding: '8px',
                zIndex: 1000,
                borderTop: '1px solid #ccc',
                
                // position: 'fixed',
                // bottom: '10vh',
                // left: 0,
                // right: 0,
                // padding: '8px',
                // backgroundColor: '#fff',
                // borderTop: '1px solid #ccc',
                // zIndex: 1000, // 必要に応じて
            }}>
            <Space.Compact style={{ width: '100%' }}>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder="send message to anya"
                />
                <Button
                    type="primary"
                    onClick={handleSend}
                >
                    送るます
                </Button>
            </Space.Compact>
        </div>
    )
}

export default InputChatMessage;