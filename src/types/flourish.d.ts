declare global {
    interface Window {
        Flourish?: {
            initializeEmbeds: () => void;
        };
    }
}

export {};
