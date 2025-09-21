// Atomic Design Component Exports

// Atoms
export * from './atoms';

// Molecules  
export * from './molecules';

// Organisms
export * from './organisms';

// Templates
export { default as PageLayout } from './templates/PageLayout/PageLayout';
export type { PageLayoutProps } from './templates/PageLayout/PageLayout';

// Pages
export { default as RankingLatestPage } from './pages/RankingLatestPage/RankingLatestPage';
export { default as HomePage } from './pages/HomePage/HomePage';
export { default as CardSearchPage } from './pages/CardSearchPage/CardSearchPage';
export { default as SeaTreesPage } from './pages/SeaTreesPage/SeaTreesPage';

// Templates (legacy support)
export { default as DmpRankingPage } from './templates/DmpRankingPage/DmpRankingPage';

// Legacy Components (Backward Compatibility)
// これらは段階的にアトミックデザインの新しいコンポーネントに置き換える予定
export { default as ErrorBoundary } from './ErrorBoundary';