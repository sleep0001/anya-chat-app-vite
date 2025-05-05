import { List } from "antd";
import { useContexts } from "../../contexts/contexts";


const RoomList = () => {
    const {
        roomIds
    } = useContexts();
    console.log("更新された。" + roomIds);

    return (
        <List
            itemLayout="horizontal"
            dataSource={roomIds.map(roomId => ({ title: roomId }))}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        // avatar={<Avatar src={`https://...`} />}アイコンを設定できる。
                        title={<a>{item.title}</a>}
                    />
                </List.Item>
            )}
        />
    )
}

export default RoomList;