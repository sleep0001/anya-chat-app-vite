import { createContext, useContext, useState } from 'react';
import { RoomManager, Room } from '../types/Types';

type Contexts = {
    isEnter: boolean;
    setIsEnter: (value: boolean) => void;
    roomIds: string[];
    setRoomIds: (value: string[]) => void;
    entryRoomId: string;
    setEntryRoomId: (value: string) => void;
    showMessage: string;
    setShowMessage: (value: string) => void;
}

const Contexts = createContext<Contexts | undefined>(undefined);

export const ContextsProvider = ({ children }: { children: React.ReactNode }) => {
    const [isEnter, setIsEnter] = useState<boolean>(false);
    const [roomIds, setRoomIds] = useState<string[]>([]);
    const [entryRoomId, setEntryRoomId] = useState<string>("");
    const [showMessage, setShowMessage] = useState<string>("");
    return (
        <Contexts.Provider
            value={{
                isEnter,
                setIsEnter,
                roomIds,
                setRoomIds,
                entryRoomId,
                setEntryRoomId,
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