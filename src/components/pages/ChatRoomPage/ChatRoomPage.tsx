import React from 'react';
import { ChatRoom } from '../../organisms';

export interface ChatRoomPageProps {
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const ChatRoomPage: React.FC<ChatRoomPageProps> = ({
    style,
    className,
}) => {
    return (
        <div className={`chatroom-page ${className || ''}`} style={style}>
            <ChatRoom maxHeight="calc(100vh - 200px)" />
        </div>
    );
};

export default ChatRoomPage;