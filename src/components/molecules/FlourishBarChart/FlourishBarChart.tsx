import { useEffect, useRef } from 'react';

const FlourishBarChart = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Flourishのスクリプトを動的に読み込む
        const script = document.createElement('script');
        script.src = 'https://public.flourish.studio/resources/embed.js';
        script.async = true;

        // スクリプトが読み込まれたら、Flourishの初期化を実行
        script.onload = () => {
            if (window.Flourish) {
                window.Flourish.initializeEmbeds();
            }
        };

        document.body.appendChild(script);

        // クリーンアップ
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="flourish-embed flourish-bar-chart-race"
            data-src="visualisation/25346424"
        >
            <noscript>
                <img
                    src="https://public.flourish.studio/visualisation/25346424/thumbnail"
                    width="100%"
                    alt="bar-chart-race visualization"
                />
            </noscript>
        </div>
    );
};

export default FlourishBarChart;