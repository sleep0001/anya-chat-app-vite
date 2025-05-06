import { Space } from 'antd';
import { fetchRooms } from '../../hooks/Reload';
import { useContexts } from '../../contexts/contexts'
import { requestMessage } from '../../hooks/useWebSocket';
import { useWebSocket } from '../../hooks/useWebSocket';
import CutieButton from '../common/CutieButton';
import { getMission } from '../../contents/RoomNames';
const LobbyButton = () => {
    const {
        setRooms
    } = useContexts();
    const { sendMessage } = useWebSocket();
    const mission:string = getMission();
    const createRequest: requestMessage = {
        type: "create",
        roomName: mission,
    }
    return (
        <Space wrap>
            <CutieButton
                label="ルーム作成"
                onClick={() => sendMessage(createRequest)}
                color="#ff85c0"
                textColor="#ffffff"
                type="primary"
            />
            <CutieButton
                label="更新"
                onClick={() => fetchRooms(setRooms)}
                color="#ff85c0"
                textColor="#ff85c0"
                type="default"
            />
        </Space>
    );
};

export default LobbyButton;
