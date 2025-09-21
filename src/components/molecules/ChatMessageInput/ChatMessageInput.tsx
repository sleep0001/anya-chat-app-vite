import React from 'react';
import MessageInput from '../MessageInput/MessageInput';
import { useWebSocket } from '../../../hooks/useWebSocket';

export interface ChatMessageInputProps {
    /** 入室しているルームID */
    entryRoomId: string;
    /** カスタムプレースホルダー */
    placeholder?: string;
    /** 送信ボタンのラベル */
    sendButtonLabel?: string;
    /** 送信ボタンの色 */
    sendButtonColor?: string;
    /** 最大文字数 */
    maxLength?: number;
    /** 固定位置で表示するか */
    fixed?: boolean;
    /** 無効状態 */
    disabled?: boolean;
}

const ChatMessageInput: React.FC<ChatMessageInputProps> = ({ 
    entryRoomId,
    placeholder = "send message to anya",
    sendButtonLabel = "送るます",
    sendButtonColor = "#ff85c0",
    maxLength = 500,
    fixed = true,
    disabled = false
}) => {
    const { chatMessage } = useWebSocket();

    const handleSendMessage = (message: string) => {
        if (!entryRoomId || !message.trim()) {
            console.warn('Room ID or message is empty');
            return;
        }
        chatMessage(message, entryRoomId);
    };

    return (
        <MessageInput
            onSend={handleSendMessage}
            placeholder={placeholder}
            sendButtonLabel={sendButtonLabel}
            sendButtonColor={sendButtonColor}
            maxLength={maxLength}
            fixed={fixed}
            disabled={disabled}
            sendOnEnter={true}
            multiline={false}
        />
    );
};

export default ChatMessageInput;