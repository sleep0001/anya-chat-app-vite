export interface PlayerDataPoint {
    date: string;
    point: number;
}

export interface PlayerData {
    name: string;
    data: PlayerDataPoint[];
}

export interface PlayerConfig {
    id: string;
    name: string;
    color: string;
    gradientColor: string;
    visible: boolean;
}

export interface ChartDataPoint {
    date: string;
    [key: string]: string | number;
}