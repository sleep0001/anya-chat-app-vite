export interface DashboardTemplateProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
    title,
    subtitle,
    children
}) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {title}
            </h1>
            <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>
        {children}
    </div>
);

export default DashboardTemplate;