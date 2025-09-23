export interface ColorIndicatorProps {
    color: string;
    gradientColor: string;
    size?: 'sm' | 'md';
    visible?: boolean;
}

const ColorIndicator: React.FC<ColorIndicatorProps> = ({
    color,
    gradientColor,
    size = 'md',
    visible = true
}) => {
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4'
    };

    return (
        <div
            className={`${sizeClasses[size]} rounded-full mr-3 transition-all duration-300 ${visible ? 'scale-110 shadow-lg' : 'scale-100 opacity-50'
                }`}
            style={{
                background: `linear-gradient(45deg, ${color}, ${gradientColor})`
            }}
        />
    );
};

export default ColorIndicator;