import React from 'react';
import { Lobby } from '../../organisms';

export interface HomePageProps {
    /** カスタムスタイル */
    style?: React.CSSProperties;
    /** カスタムクラス名 */
    className?: string;
}

const HomePage: React.FC<HomePageProps> = ({
    style,
    className,
}) => {
    return (
        <div className={`homepage ${className || ''}`} style={style}>
            <Lobby 
                maxWidth="800px"
                maxHeight="60vh"
            />
        </div>
    );
};

export default HomePage;