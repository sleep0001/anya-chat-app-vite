import { List } from "antd";
import { useContexts } from "../../contexts/contexts";
import { useWebSocket } from "../../hooks/useWebSocket";
import { Room } from "../../types/Types";

const RoomList = () => {
    const {
        rooms
    } = useContexts();
    const { enterRoom } = useWebSocket();

    return (
        <List
            style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee', marginTop: '10px', backgroundColor: '#f4b3bb' }}
            itemLayout="horizontal"
            dataSource={rooms.map((room: Room) => ({ room }))}
            renderItem={(item) => (
                <List.Item
                    onClick={() => enterRoom(item.room)}
                    style={{
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#b58d86";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f4b3bb";
                    }}
                >
                    <List.Item.Meta
                        // avatar={<Avatar src={`https://...`} />}アイコンを設定できる。
                        title={<a style={{ color: '#402b28', textDecoration: 'none' }}>{item.room.roomName}</a>}
                    />
                </List.Item>
            )}
        />
    )
}

export default RoomList;