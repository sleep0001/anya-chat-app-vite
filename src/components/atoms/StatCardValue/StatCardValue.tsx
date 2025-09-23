export interface StatCardValueProps {
    value: number | string;
    unit?: string;
    size?: 'sm' | 'md' | 'lg';
}

const StatCardValue: React.FC<StatCardValueProps> = ({ value, unit = "", size = 'md' }) => {
    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl'
    };

    return (
        <p className={`${sizeClasses[size]} font-bold text-white`}>
            {value}
            {unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
        </p>
    );
};

export default StatCardValue;