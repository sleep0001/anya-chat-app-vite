import axios from "axios";
import { useEffect, useState } from "react";
import { DmPlayerLatestStats } from "../types/DmPlayerLatestStats.ts";
// import { DmPlayerLatestStatsTest } from "../test/DmPlayerLatestStatsTest.ts";

export const useDmPlayerLatestStats = () => {
    /** レスポンス */
    const [allRankingData, setAllRankingData] = useState<DmPlayerLatestStats>({});
    
    // const [latestUpDate, setLatestUpDate] = useState<Date>(new Date());
    // const [rankingPlayerData, setRankingPlayerData] = useState<RankingPlayerData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const url = "/api/player/rank"
                const response = await axios.get<any>(
                    url,
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
                console.log('リクエストした。');
                // 日付文字列をDate型に変換
                const convertedData: DmPlayerLatestStats = {};
                Object.keys(response.data).forEach(key => {
                    convertedData[key] = {
                        latestUpDate: new Date(response.data[key].latestUpDate),
                        rankingPlayerData: response.data[key].rankingPlayerData
                    };
                });
                setAllRankingData(convertedData);
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

    return { allRankingData, loading, error };
};