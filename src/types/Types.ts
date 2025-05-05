export type RoomManager = {
    rooms:Room;
}

export type Room = {
    roomId:string;
    sessions:string[];
}