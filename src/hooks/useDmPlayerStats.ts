import axios from "axios";
import { useEffect, useState } from "react";
import { DmPlayerStats } from "../types/DmPlayerStats";

export const useDmPlayerStats = () => {
    const [players, setPlayers] = useState<DmPlayerStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const fetchStats = async () => {
        try {
            const url = "https://sl33p.net/api/player"
            const response = await axios.get<DmPlayerStats[]>(url, {
                headers: { Accept: "application/json" },
                auth: { username: "user", password: "password" },
                withCredentials: true
            });
            setPlayers(response.data);
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
