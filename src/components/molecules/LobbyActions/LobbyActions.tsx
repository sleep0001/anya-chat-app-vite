import React from 'react';
import { Space } from 'antd';
import { Button } from '../../atoms';
import { fetchRooms } from '../../../hooks/Reload';
import { useContexts } from '../../../contexts/contexts';
import { requestMessage } from '../../../hooks/useWebSocket';
import { useWebSocket } from '../../../hooks/useWebSocket';
import { getMission } from '../../../contents/RoomNames';

const LobbyActions: React.FC = () => {
    const { setRooms } = useContexts();
    const { sendMessage } = useWebSocket();
    
    const mission: string = getMission();
    const createRequest: requestMessage = {
        type: "create",
        roomName: mission,
    };

    const handleCreateRoom = () => {
        sendMessage(createRequest);
    };

    const handleRefreshRooms = () => {
        fetchRooms(setRooms);
    };

    return (
        <Space wrap size="middle">
            <Button
                onClick={handleCreateRoom}
                color="#ff85c0"
                size="large"
                shape="round"
            >
                ルーム作成
            </Button>
            
            <Button
                onClick={handleRefreshRooms}
                variant="secondary"
                color="#ff85c0"
                textColor="#ff85c0"
                size="large"
                shape="round"
            >
                更新
            </Button>
        </Space>
    );
};

export default LobbyActions;