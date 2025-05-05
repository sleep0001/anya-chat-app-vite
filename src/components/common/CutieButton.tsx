import { Button } from 'antd';
import { CSSProperties, ReactNode, useState } from 'react';

type CutieButtonProps = {
    label: ReactNode;
    onClick?: () => void;
    color?: string;
    textColor?: string;
    type?: "primary" | "default";
}

const CutieButton = ({
    label,
    onClick,
    color,
    textColor,
    type = "primary"
}: CutieButtonProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const baseStyle: CSSProperties = {
        backgroundColor: type === "primary" ? color : "transparent",
        color: textColor,
        borderColor: color,
        boxShadow: `0 4px 10px ${color}40`,
        transition: "all 0.3s ease",
    };

    const hoverStyle: CSSProperties = {
        backgroundColor: type === "primary" ? color : "#fff0f6",
        color: textColor,
        borderColor: color,
        boxShadow: `0 6px 12px ${color}80`,
    };

    return (
        <Button
            type={type}
            shape="round"
            size="large"
            onClick={onClick}
            style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {label}
        </Button>
    )
}

export default CutieButton;