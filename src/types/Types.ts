export type RoomManager = Room[];

export type Room = {
    roomId:string;
    roomName:string;
}

export type Message = {
    id:string;
    text:string;
    timeStamp:string;
    isMe:boolean;
}