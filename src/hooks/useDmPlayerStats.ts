import { useEffect, useState } from "react";
import { DmPlayerStats } from "../types/DmPlayerStats";

export const useDmPlayerStats = () => {
    const [players, setPlayers] = useState<DmPlayerStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const fetchStats = async () => {
        try {
            const res = await fetch("https://sl33p.net/api/player");
            if (!res.ok) throw new Error("Failed to fetch player data");
            const data = await res.json();
            setPlayers(data);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
        };

        fetchStats();
    }, []);

    return { players, loading, error };
};
