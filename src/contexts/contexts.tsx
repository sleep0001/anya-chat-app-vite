import { createContext, useContext, useState } from 'react';
import { Message, Room, RoomManager } from '../types/Types';

type Contexts = {
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    rooms: RoomManager;
    setRooms: React.Dispatch<React.SetStateAction<RoomManager>>;
    entryRoom: Room;
    setEntryRoom: React.Dispatch<React.SetStateAction<Room>>;
    showMessage: Message[];
    setShowMessage: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Contexts = createContext<Contexts | undefined>(undefined);

export const ContextsProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string>("");
    const [rooms, setRooms] = useState<RoomManager>([]);
    const [entryRoom, setEntryRoom] = useState<Room>({roomId:"", roomName:""});
    const [showMessage, setShowMessage] = useState<Message[]>([]);
    return (
        <Contexts.Provider
            value={{
                userId,
                setUserId,
                rooms,
                setRooms,
                entryRoom,
                setEntryRoom,
                showMessage,
                setShowMessage
            }}
        >
            {children}
        </Contexts.Provider>
    )
}

export const useContexts = (): Contexts => {
    const context = useContext(Contexts);
    if (!context) { throw new Error('ContextsProviderの外でuseContextsが使われています。'); }
    return context;
}