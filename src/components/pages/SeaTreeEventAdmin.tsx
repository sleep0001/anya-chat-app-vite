import React, { useState } from 'react';

interface SeaTreeEventName {
    id: number;
    name: string;
}

interface Credentials {
    username: string;
    password: string;
}

const SeaTreeEventAdmin: React.FC = () => {
    const [eventNames, setEventNames] = useState<SeaTreeEventName[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editingKey, setEditingKey] = useState<number | null>(null);
    const [editingName, setEditingName] = useState<string>('');
    const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [newEventName, setNewEventName] = useState<string>('');
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

    // スタイル定義
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        },
        loginCard: {
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            padding: '40px'
        },
        header: {
            textAlign: 'center' as const,
            marginBottom: '32px'
        },
        icon: {
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
        },
        title: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            margin: '0 0 8px'
        },
        subtitle: {
            color: '#666',
            fontSize: '16px'
        },
        inputGroup: {
            marginBottom: '24px'
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '2px solid #e5e7eb',
            fontSize: '16px',
            transition: 'all 0.2s',
            outline: 'none'
        },
        inputFocus: {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
        },
        button: {
            width: '100%',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed'
        },
        mainContainer: {
            minHeight: '100vh',
            backgroundColor: '#f9fafb'
        },
        headerMain: {
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        },
        headerContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px'
        },
        logoArea: {
            display: 'flex',
            alignItems: 'center'
        },
        logoIcon: {
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
        },
        headerTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937'
        },
        userArea: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        },
        avatar: {
            width: '32px',
            height: '32px',
            backgroundColor: '#d1d5db',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        logoutBtn: {
            padding: '8px 16px',
            color: '#6b7280',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        mainContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '32px 24px'
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        },
        cardHeader: {
            padding: '24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        cardTitle: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        badge: {
            padding: '4px 12px',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
        },
        addButton: {
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse' as const
        },
        th: {
            padding: '12px 24px',
            backgroundColor: '#f9fafb',
            color: '#374151',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            textAlign: 'left' as const
        },
        td: {
            padding: '16px 24px',
            borderTop: '1px solid #f3f4f6'
        },
        tr: {
            transition: 'background-color 0.2s'
        },
        trHover: {
            backgroundColor: '#f9fafb'
        },
        idBadge: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: '#dbeafe',
            color: '#1e40af'
        },
        editInput: {
            width: '100%',
            padding: '8px 12px',
            border: '2px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s'
        },
        actionButton: {
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginLeft: '8px'
        },
        editButton: {
            backgroundColor: '#3b82f6',
            color: 'white'
        },
        deleteButton: {
            backgroundColor: '#ef4444',
            color: 'white'
        },
        saveButton: {
            backgroundColor: '#10b981',
            color: 'white'
        },
        cancelButton: {
            backgroundColor: '#6b7280',
            color: 'white'
        },
        modal: {
            position: 'fixed' as const,
            inset: '0',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 50
        },
        modalContent: {
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            maxWidth: '500px',
            width: '100%'
        },
        modalHeader: {
            padding: '24px',
            borderBottom: '1px solid #e5e7eb'
        },
        modalTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937'
        },
        modalBody: {
            padding: '24px'
        },
        modalFooter: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '24px'
        },
        secondaryButton: {
            padding: '10px 20px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
        },
        loadingSpinner: {
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '3px solid #f3f4f6',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        messageAlert: {
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid'
        },
        successAlert: {
            backgroundColor: '#f0fdf4',
            borderColor: '#bbf7d0',
            color: '#166534'
        },
        errorAlert: {
            backgroundColor: '#fef2f2',
            borderColor: '#fecaca',
            color: '#991b1b'
        },
        infoAlert: {
            backgroundColor: '#eff6ff',
            borderColor: '#bfdbfe',
            color: '#1e40af'
        },
        emptyState: {
            padding: '48px 24px',
            textAlign: 'center' as const
        },
        emptyIcon: {
            width: '64px',
            height: '64px',
            color: '#d1d5db',
            margin: '0 auto 16px'
        },
        emptyText: {
            fontSize: '18px',
            color: '#6b7280'
        }
    };

    // メッセージ表示
    const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    };

    // Basic認証ヘッダーの生成
    const createAuthHeaders = (): Record<string, string> => ({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
    });

    // ログイン処理
    const handleLogin = async (): Promise<void> => {
        if (!credentials.username || !credentials.password) {
            showMessage('error', 'ユーザー名とパスワードを入力してください');
            return;
        }

        setLoginLoading(true);

        try {
            const response = await fetch('https://www.sl33p.net/api/player/admin/seatree-events', {
                headers: createAuthHeaders()
            });

            if (response.ok) {
                setIsAuthenticated(true);
                showMessage('success', 'ログインしました');
                await loadEventNames();
            } else if (response.status === 401) {
                showMessage('error', '認証に失敗しました。ユーザー名とパスワードを確認してください。');
            } else {
                showMessage('error', '認証エラーが発生しました。');
            }
        } catch (error) {
            showMessage('error', '接続エラーが発生しました。');
        } finally {
            setLoginLoading(false);
        }
    };

    // その他の関数（変更なし）
    const handleLogout = (): void => {
        setIsAuthenticated(false);
        setCredentials({ username: '', password: '' });
        setEventNames([]);
        showMessage('info', 'ログアウトしました');
    };

    const loadEventNames = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch('https://www.sl33p.net/api/player/admin/seatree-events', {
                headers: createAuthHeaders()
            });

            if (response.ok) {
                const data: SeaTreeEventName[] = await response.json();
                setEventNames(data);
            } else {
                showMessage('error', 'データの取得に失敗しました。');
            }
        } catch (error) {
            showMessage('error', 'ネットワークエラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (): Promise<void> => {
        if (!newEventName.trim()) {
            showMessage('error', 'イベント名を入力してください');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('https://www.sl33p.net/api/player/admin/seatree-events', {
                method: 'POST',
                headers: createAuthHeaders(),
                body: JSON.stringify({ name: newEventName.trim() })
            });

            if (response.ok) {
                const newEvent: SeaTreeEventName = await response.json();
                setEventNames([...eventNames, newEvent]);
                setAddModalVisible(false);
                setNewEventName('');
                showMessage('success', 'イベント名を追加しました。');
            } else {
                const errorText = await response.text();
                showMessage('error', errorText || '追加に失敗しました。');
            }
        } catch (error) {
            showMessage('error', 'ネットワークエラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: number): Promise<void> => {
        if (!editingName.trim()) {
            showMessage('error', 'イベント名を入力してください');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://www.sl33p.net/api/player/admin/seatree-events/${id}`, {
                method: 'PUT',
                headers: createAuthHeaders(),
                body: JSON.stringify({ name: editingName.trim() })
            });

            if (response.ok) {
                const updatedEvent: SeaTreeEventName = await response.json();
                setEventNames(eventNames.map(event => event.id === id ? updatedEvent : event));
                setEditingKey(null);
                setEditingName('');
                showMessage('success', 'イベント名を更新しました。');
            } else {
                const errorText = await response.text();
                showMessage('error', errorText || '更新に失敗しました。');
            }
        } catch (error) {
            showMessage('error', 'ネットワークエラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, name: string): Promise<void> => {
        if (!confirm(`「${name}」を削除しますか？`)) return;

        setLoading(true);
        try {
            const response = await fetch(`https://www.sl33p.net/api/player/admin/seatree-events/${id}`, {
                method: 'DELETE',
                headers: createAuthHeaders()
            });

            if (response.ok) {
                setEventNames(eventNames.filter(event => event.id !== id));
                showMessage('success', 'イベント名を削除しました。');
            } else {
                const errorText = await response.text();
                showMessage('error', errorText || '削除に失敗しました。');
            }
        } catch (error) {
            showMessage('error', 'ネットワークエラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (event: SeaTreeEventName): void => {
        setEditingKey(event.id);
        setEditingName(event.name);
    };

    const cancelEdit = (): void => {
        setEditingKey(null);
        setEditingName('');
    };

    // メッセージコンポーネント
    const MessageAlert = () => {
        if (!message) return null;

        const alertStyle = message.type === 'success' ? styles.successAlert :
            message.type === 'error' ? styles.errorAlert :
                styles.infoAlert;

        return (
            <div style={{ ...styles.messageAlert, ...alertStyle }}>
                {message.text}
            </div>
        );
    };

    // ログインフォーム
    if (!isAuthenticated) {
        return (
            <>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <div style={styles.container}>
                    <div style={styles.loginCard}>
                        <div style={styles.header}>
                            <div style={styles.icon}>
                                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <h1 style={styles.title}>管理者ログイン</h1>
                            <p style={styles.subtitle}>SeaTreeイベント名管理システム</p>
                        </div>

                        <MessageAlert />

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>ユーザー名</label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                style={styles.input}
                                placeholder="ユーザー名を入力"
                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>パスワード</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                style={styles.input}
                                placeholder="パスワードを入力"
                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loginLoading}
                            style={{
                                ...styles.button,
                                ...(loginLoading ? styles.buttonDisabled : {})
                            }}
                        >
                            {loginLoading ? 'ログイン中...' : 'ログイン'}
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // メイン管理画面
    return (
        <>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                tr:hover {
                    background-color: #f9fafb !important;
                }
                button:hover {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }
            `}</style>
            <div style={styles.mainContainer}>
                {/* ヘッダー */}
                <header style={styles.headerMain}>
                    <div style={styles.headerContent}>
                        <div style={styles.logoArea}>
                            <div style={styles.logoIcon}>
                                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <h1 style={styles.headerTitle}>SeaTreeイベント管理</h1>
                        </div>
                        <div style={styles.userArea}>
                            <div style={styles.avatar}>
                                <svg width="20" height="20" fill="#6b7280" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{credentials.username}</span>
                            <button
                                onClick={handleLogout}
                                style={styles.logoutBtn}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                ログアウト
                            </button>
                        </div>
                    </div>
                </header>

                {/* メインコンテンツ */}
                <main style={styles.mainContent}>
                    <MessageAlert />

                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardTitle}>
                                イベント名一覧
                                <span style={styles.badge}>{eventNames.length}件</span>
                            </div>
                            <button
                                onClick={() => setAddModalVisible(true)}
                                style={styles.addButton}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                            >
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                新規追加
                            </button>
                        </div>

                        {loading ? (
                            <div style={styles.emptyState}>
                                <div style={styles.loadingSpinner}></div>
                                <p style={{ ...styles.emptyText, marginTop: '16px' }}>読み込み中...</p>
                            </div>
                        ) : eventNames.length === 0 ? (
                            <div style={styles.emptyState}>
                                <svg style={styles.emptyIcon} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <p style={styles.emptyText}>登録されているイベント名がありません</p>
                            </div>
                        ) : (
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>ID</th>
                                        <th style={styles.th}>イベント名</th>
                                        <th style={{ ...styles.th, textAlign: 'right' }}>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventNames.map((event) => (
                                        <tr key={event.id} style={styles.tr}>
                                            <td style={styles.td}>
                                                <span style={styles.idBadge}>{event.id}</span>
                                            </td>
                                            <td style={styles.td}>
                                                {editingKey === event.id ? (
                                                    <input
                                                        type="text"
                                                        value={editingName}
                                                        onChange={(e) => setEditingName(e.target.value)}
                                                        style={{
                                                            ...styles.editInput,
                                                            borderColor: '#3b82f6'
                                                        }}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleUpdate(event.id)}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                                                        {event.name}
                                                    </div>
                                                )}
                                            </td>
                                            <td style={{ ...styles.td, textAlign: 'right' }}>
                                                {editingKey === event.id ? (
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <button
                                                            onClick={() => handleUpdate(event.id)}
                                                            disabled={loading}
                                                            style={{
                                                                ...styles.actionButton,
                                                                ...styles.saveButton,
                                                                opacity: loading ? 0.5 : 1
                                                            }}
                                                        >
                                                            保存
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            style={{ ...styles.actionButton, ...styles.cancelButton }}
                                                        >
                                                            キャンセル
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <button
                                                            onClick={() => startEdit(event)}
                                                            disabled={editingKey !== null}
                                                            style={{
                                                                ...styles.actionButton,
                                                                ...styles.editButton,
                                                                opacity: editingKey !== null ? 0.5 : 1
                                                            }}
                                                        >
                                                            編集
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(event.id, event.name)}
                                                            disabled={editingKey !== null}
                                                            style={{
                                                                ...styles.actionButton,
                                                                ...styles.deleteButton,
                                                                opacity: editingKey !== null ? 0.5 : 1
                                                            }}
                                                        >
                                                            削除
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>

                {/* 新規追加モーダル */}
                {addModalVisible && (
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>新しいイベント名を追加</h3>
                            </div>
                            <div style={styles.modalBody}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>イベント名</label>
                                    <input
                                        type="text"
                                        value={newEventName}
                                        onChange={(e) => setNewEventName(e.target.value)}
                                        style={styles.input}
                                        placeholder="例: 樹海CS"
                                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                        autoFocus
                                    />
                                </div>
                                <div style={styles.modalFooter}>
                                    <button
                                        onClick={() => {
                                            setAddModalVisible(false);
                                            setNewEventName('');
                                        }}
                                        style={styles.secondaryButton}
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        onClick={handleAdd}
                                        disabled={loading || !newEventName.trim()}
                                        style={{
                                            ...styles.addButton,
                                            opacity: (loading || !newEventName.trim()) ? 0.5 : 1
                                        }}
                                    >
                                        {loading ? '追加中...' : '追加'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SeaTreeEventAdmin;