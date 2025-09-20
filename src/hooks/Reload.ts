import axios from 'axios';
import { RoomManager } from '../types/Types';

export const fetchRooms = async(setRooms: (rooms: RoomManager) => void) => {
    const url:string = "https://www.sl33p.net/anyaApp";

    try {
        const response = await axios.get<Record<string, string>>(url + "/api/reload", {
            headers: { Accept: "application/json" },
            auth: { username: "user", password: "password" }
        });
        const roomArray: RoomManager = Object.entries(response.data).map(([roomId, roomName]) => ({
            roomId,
            roomName
        }));
        setRooms(roomArray);
    } catch (error) {
        console.error("Roomの取得エラーです。")
    }
}