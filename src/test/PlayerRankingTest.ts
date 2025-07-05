import { DmPlayerStats } from "../types/DmPlayerStats";

export const testPlayers: DmPlayerStats[] = [
    {
        name: "プレイヤーA",
        dmpId: 1,
        currentPoint: 3250,
        pointDiff: 2050,
        currentRank: 1,
        rankDiff: 10, // 前回2位 → 今回1位（↑）
    },
    {
        name: "プレイヤーB",
        dmpId: 2,
        currentPoint: 1200,
        pointDiff: 1200,
        currentRank: 2,
        rankDiff: 2, // 前回1位 → 今回2位（↓）
    },
    {
        name: "プレイヤーC",
        dmpId: 3,
        currentPoint: 1100,
        pointDiff: 600,
        currentRank: 3,
        rankDiff: 0, // 変動なし（→）
    },
    {
        name: "プレイヤーD",
        dmpId: 4,
        currentPoint: 1080,
        pointDiff: 250,
        currentRank: 4,
        rankDiff: 2, // 前回6位 → 今回4位（↑）
    },
    {
        name: "プレイヤーE",
        dmpId: 5,
        currentPoint: 980,
        pointDiff: 10,
        currentRank: 5,
        rankDiff: -3, // 前回4位 → 今回5位（↓）
    },
];
