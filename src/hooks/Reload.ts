import axios from 'axios';

export const getRoomManager = async() => {
    const url:string = "http://localhost:8080";
    type RoomManager = {
        rooms:Room;
    }
    type Room = {
        roomId:string;
        sessions:string[];
    }
    try {
        const response:RoomManager = await axios.get(url + "/api/reload", {
            headers: {
                Accept: "application/json"
            },
            auth: {
                username: "user",
                password: "password"
            },
            withCredentials: false
        });
        console.log(response);
    } catch (error) {
        console.error("Roomの取得エラーです。")
    }
}