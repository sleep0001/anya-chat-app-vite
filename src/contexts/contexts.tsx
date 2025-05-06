import { createContext, useContext, useState } from 'react';
import { Message } from '../types/Types';

type Contexts = {
    roomIds: string[];
    setRoomIds: React.Dispatch<React.SetStateAction<string[]>>;
    entryRoomId: string;
    setEntryRoomId: React.Dispatch<React.SetStateAction<string>>;
    showMessage: Message[];
    setShowMessage: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Contexts = createContext<Contexts | undefined>(undefined);

export const ContextsProvider = ({ children }: { children: React.ReactNode }) => {
    const [roomIds, setRoomIds] = useState<string[]>([]);
    const [entryRoomId, setEntryRoomId] = useState<string>("");
    const [showMessage, setShowMessage] = useState<Message[]>([]);
    return (
        <Contexts.Provider
            value={{
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