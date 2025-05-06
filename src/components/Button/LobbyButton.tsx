import { Space } from 'antd';
import { fetchRooms } from '../../hooks/Reload';
import { useContexts } from '../../contexts/contexts'
import { requestMessage } from '../../hooks/useWebSocket';
import { useWebSocket } from '../../hooks/useWebSocket';
import CutieButton from '../common/CutieButton';
const LobbyButton = () => {
    const {
        setRoomIds
    } = useContexts();
    const { sendMessage } = useWebSocket();
    const createRequest: requestMessage = {
        type: "create",
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
                onClick={() => fetchRooms(setRoomIds)}
                color="#ff85c0"
                textColor="#ff85c0"
                type="default"
            />
        </Space>
    );
};

export default LobbyButton;
