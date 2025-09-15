// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 border border-red-300 bg-red-50 rounded">
                    <h2 className="text-red-700 font-bold">エラーが発生しました</h2>
                    <details className="mt-2">
                        <summary className="cursor-pointer text-red-600">詳細を表示</summary>
                        <pre className="mt-2 text-sm text-red-800 overflow-auto">
                            {this.state.error?.stack}
                        </pre>
                    </details>
                    <button 
                        onClick={() => this.setState({ hasError: false, error: undefined })}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        再試行
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;