// export interface CachedRankingResponse {
//     [key: string]: {
//         DmPlayerLatestStats:DmPlayerLatestStats;
//     };
// }

export interface PeriodOption {
    key: string;
    label: string;
    startDate:Date;
    endDate:Date;
}

export type DmPlayerLatestStats = {
    [key: string]: {
        latestUpDate:Date;
        rankingPlayerData:RankingPlayerData[];
    };
}

export type RankingPlayerData = {
    name:string; // プレイヤー名
    dmpId:number; // dmpId URLに使う
    prefecture:string; // 都道府県名 絞り込みに使う
    point:number; // ポイント
    rank?:number;
    allRank?:number;
}