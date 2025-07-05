export type DmPlayerStats = {
    name:string;
    dmpId:number;
    currentPoint:number; // 最新ポイント
    pointDiff:number; // 差分ポイント
    currentRank:number; // 最新順位
    rankDiff:number; // 差分順位
}