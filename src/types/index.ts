// src/types/index.ts - 統合型定義ファイル
// 既存の型定義を統合し、共通インターフェースを作成

export * from "./CardType";
export * from "./DmPlayerStats";
export * from "./DmPlayerLatestStats";
export * from "./Types";
export * from "./RankingGraph";

// 共通の基底型
export interface BaseEntity {
    id: string | number;
    createdAt?: Date;
    updatedAt?: Date;
}

// 共通のAPIレスポンス型
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    timestamp: Date;
}

// 共通のエラー型
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
}

// ページネーション型
export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: Pagination;
}
