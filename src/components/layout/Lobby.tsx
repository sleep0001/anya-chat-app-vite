import LobbyButton from "../Button/LobbyButton";
import RoomList from "../common/RoomList";
import "./Lobby.css"
import { useContexts } from '../../contexts/contexts'
import { useEffect } from 'react';
import { fetchRooms } from '../../hooks/Reload';
import { useWebSocket } from '../../hooks/useWebSocket';

const Lobby = () => {
    const {
        setRooms,
        entryRoom,
    } = useContexts();
    const { exitRoom } = useWebSocket();

    useEffect(() => {
        fetchRooms(setRooms);
    }, [])

    useEffect(() => {
        // 退出ボタン以外で退出した場合に強制的に退出を実行。退出ボタンでも呼ばれはするので、まとめるのもありか。
        const isRoomPath:boolean = location.pathname.startsWith("/room/");
        if (!isRoomPath && entryRoom.roomId) {
            exitRoom(entryRoom.roomId);
        }
    }, [location.pathname]);

    return (
        <div className="lobby">
            <LobbyButton/>
            <RoomList />
        </div>
    )
}

export default Lobby;