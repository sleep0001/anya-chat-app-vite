import axios from 'axios';

export const fetchRooms = async(setRoomIds: (ids: string[]) => void) => {
    const url:string = "http://localhost:8080";
    

    try {
        const response = await axios.get<string[]>(url + "/api/reload", {
            headers: {
                Accept: "application/json"
            },
            auth: {
                username: "user",
                password: "password"
            }
        });
        console.log(response);
        setRoomIds(response.data);
    } catch (error) {
        console.error("Roomの取得エラーです。")
    }
}