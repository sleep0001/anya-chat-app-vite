import LobbyButton from "../Button/LobbyButton";
import RoomList from "../common/RoomList";
import "./Lobby.css"
import { useContexts } from '../../contexts/contexts'
import { useEffect } from 'react';
import { fetchRooms } from '../../hooks/Reload';

const Lobby = () => {
    const {
        setRoomIds,
    } = useContexts();

    useEffect(() => {
        fetchRooms(setRoomIds);
    }, [])

    return (
        <div className="lobby">
            <LobbyButton/>
            <RoomList />
        </div>
    )
}

export default Lobby;