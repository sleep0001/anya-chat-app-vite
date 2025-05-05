import { createContext, useContext, useState } from 'react';

type Contexts = {
    isEnter:boolean;
    setIsEnter:(value:boolean) => void;
}

const Contexts = createContext<Contexts | undefined>(undefined);

export const ContextsProvider = ({ children }: { children: React.ReactNode }) => {
    const [isEnter, setIsEnter ] = useState<boolean>(false);
    return (
        <Contexts.Provider
            value = {{
                isEnter,
                setIsEnter
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