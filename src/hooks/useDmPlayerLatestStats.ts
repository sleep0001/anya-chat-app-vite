import axios from "axios";
import { useEffect, useState } from "react";
import { DmPlayerLatestStats, RankingPlayerData } from "../types/DmPlayerLatestStats.ts";
// import { DmPlayerLatestStatsTest } from "../test/DmPlayerLatestStatsTest.ts";

export const useDmPlayerLatestStats = () => {
    const [latestUpDate, setLatestUpDate] = useState<Date>(new Date());
    const [rankingPlayerData, setRankingPlayerData] = useState<RankingPlayerData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const url = "https://sl33p.net/api/player/rank"
                const requestBody = {
                    startDate: "2025-04-01",
                    endDate: "2025-09-30"
                };
                const response = await axios.post<DmPlayerLatestStats>(
                    url,
                    requestBody,
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        auth: {
                            username: "user",
                            password: "password"
                        },
                        withCredentials: true
                    }
                );
                setLatestUpDate(new Date(response.data.latestUpDate));
                setRankingPlayerData(response.data.rankingPlayerData);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                // setLatestUpDate(DmPlayerLatestStatsTest.latestUpDate)
                // setRankingPlayerData(DmPlayerLatestStatsTest.rankingPlayerData)
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { latestUpDate, rankingPlayerData, loading, error };
};