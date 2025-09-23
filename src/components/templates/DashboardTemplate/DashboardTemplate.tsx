export interface DashboardTemplateProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
    title,
    subtitle,
    children
}) => {
    const containerStyle: React.CSSProperties = {
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', // Safari対応
        borderRadius: '24px', // rounded-3xl相当
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '32px',
        margin: '0 auto',
        maxWidth: '80rem' // max-w-7xl相当
    };

    const innerContainerStyle: React.CSSProperties = {
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '16px', // rounded-2xl相当
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '24px'
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '2.25rem', // text-4xl
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '8px',
        filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1))'
    };

    const subtitleStyle: React.CSSProperties = {
        color: '#9ca3af', // text-gray-400
        fontSize: '1.125rem', // text-lg
        filter: 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))'
    };

    return (
        <div style={containerStyle}>
            <div className="text-center mb-8">
                <h1 style={titleStyle}>
                    {title}
                </h1>
                <p style={subtitleStyle}>{subtitle}</p>
            </div>
            <div style={innerContainerStyle}>
                {children}
            </div>
        </div>
    );
};

export default DashboardTemplate;