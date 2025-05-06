export type RoomManager = {
    rooms:Room;
}

export type Room = {
    roomId:string;
    sessions:string[];
}

export type Message = {
    id:string;
    text:string;
    timeStamp:string;
}