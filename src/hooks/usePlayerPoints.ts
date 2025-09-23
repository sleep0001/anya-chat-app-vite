import { useEffect, useState } from "react";
import { ResponseGraph } from "../types";
import axios from "axios";

export const usePlayerPoints = () => {
    const [data, setData] = useState<ResponseGraph[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/player/graph');
                console.log(response.data)
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