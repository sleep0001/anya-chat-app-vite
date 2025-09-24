import React from 'react';

export interface ReleaseDateProps {
    date: string | Date;
    format?: 'short' | 'long';
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({ date, format = 'long' }) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const formatDate = () => {
        if (format === 'short') {
            return dateObj.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }
        return dateObj.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
    };

    return (
        <time
            dateTime={dateObj.toISOString()}
            style={{
                fontSize: '14px',
                color: '#6b7280',
            }}
        >
            {formatDate()}
        </time>
    );
};

export default ReleaseDate;