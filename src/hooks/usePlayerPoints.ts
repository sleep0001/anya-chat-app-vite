import { useEffect, useState } from "react";
import { PlayerData } from "../types";
import axios from "axios";

export const usePlayerPoints = () => {
    const [data, setData] = useState<PlayerData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/player-points');
                setData(response.data);
            } catch (err) {
                setError('データの取得に失敗しました');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, loading, error };
};