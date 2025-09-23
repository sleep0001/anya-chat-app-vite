import React from 'react';

export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, className = "" }) => (
    <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`hidden ${className}`}
    />
);

export default Checkbox;