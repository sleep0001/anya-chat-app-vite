import React, { useState, useEffect, useMemo } from 'react';
import TableContent from '../../organisms/TableContent/TableContent';

interface SeaTreeEventName {
    id: number;
    name: string;
    isInclude: boolean;
}

interface Credentials {
    username: string;
    password: string;
}

const STORAGE_KEY = 'seatree_admin_session';

const SeaTreeEventAdmin: React.FC = () => {
    const [eventNames, setEventNames] = useState<SeaTreeEventName[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [newEventName, setNewEventName] = useState<string>('');
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isInclude, setIsInclude] = useState<boolean>(true);

    // セッション復元
    useEffect(() => {
        const savedSession = localStorage.getItem(STORAGE_KEY);
        if (savedSession) {
            try {
                const session = JSON.parse(savedSession);
                const now = new Date().getTime();
                
                if (session.expiresAt && now < session.expiresAt) {
                    setCredentials(session.credentials);
                    setIsAuthenticated(true);
                    setRememberMe(true);
                    loadEventNamesWithCredentials(session.credentials);
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            } catch (error) {
                console.error('セッション復元エラー:', error);
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    const saveSession = (creds: Credentials, remember: boolean) => {
        if (remember) {
            const session = {
                credentials: creds,
                expiresAt: new Date().getTime() + (24 * 60 * 60 * 1000)
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        }
    };

    const clearSession = () => {
        localStorage.removeItem(STORAGE_KEY);
    };

    // データをisIncludeで分離
    const includeList: SeaTreeEventName[] = useMemo(() => {
        return eventNames.filter(item => item.isInclude === true);
    }, [eventNames]);

    const excludeList: SeaTreeEventName[] = useMemo(() => {
        return eventNames.filter(item => item.isInclude === false);
    }, [eventNames]);

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
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '24px'
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
        checkboxGroup: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
            gap: '8px'
        },
        checkbox: {
            width: '18px',
            height: '18px',
            cursor: 'pointer'
        },
        checkboxLabel: {
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginLeft: '8px'
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
        }
    };

    const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 4000);
    };

    const createAuthHeaders = (creds?: Credentials): Record<string, string> => {
        const useCreds = creds || credentials;
        return {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${useCreds.username}:${useCreds.password}`)}`
        };
    };

    const loadEventNamesWithCredentials = async (creds: Credentials): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch('https://www.sl33p.net/api/player/admin/seatree-events', {
                headers: createAuthHeaders(creds)
            });

            if (response.ok) {
                const data: SeaTreeEventName[] = await response.json();
                const sortedData = data.sort((a, b) => a.id - b.id);
                console.log('取得したデータ:', sortedData);
                setEventNames(sortedData);
            } else if (response.status === 401) {
                clearSession();
                setIsAuthenticated(false);
                showMessage('error', 'セッションの有効期限が切れました。再ログインしてください。');
            } else {
                showMessage('error', 'データの取得に失敗しました。');
            }
        } catch (error) {
            showMessage('error', 'ネットワークエラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

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
                
                if (rememberMe) {
                    saveSession(credentials, true);
                }
                
                await loadEventNamesWithCredentials(credentials);
            } else if (response.status === 401) {
                showMessage('error', '認証に失敗しました。ユーザー名とパスワードを確認してください。');
            } else {
                showMessage('error', '認証エラーが発生しました。');
            }
        } catch (error) {
            showMessage('error', '認証エラーが発生しました。');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = (): void => {
        setIsAuthenticated(false);
        setCredentials({ username: '', password: '' });
        setEventNames([]);
        setRememberMe(false);
        clearSession();
        showMessage('info', 'ログアウトしました');
    };

    const handleAdd = async (isInclude: boolean): Promise<void> => {
        if (!newEventName.trim()) {
            showMessage('error', 'イベント名を入力してください');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('https://www.sl33p.net/api/player/admin/seatree-events', {
                method: 'POST',
                headers: createAuthHeaders(),
                body: JSON.stringify({ name: newEventName.trim(), isInclude: isInclude })
            });

            if (response.ok) {
                const newEvent: SeaTreeEventName = await response.json();
                console.log('追加されたイベント:', newEvent);
                setEventNames([...eventNames, newEvent].sort((a, b) => a.id - b.id));
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

    const handleUpdate = async (id: number, newName: string, newIsInclude: boolean): Promise<boolean> => {
        if (!newName.trim()) {
            showMessage('error', 'イベント名を入力してください');
            return false;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://www.sl33p.net/api/player/admin/seatree-events/${id}`, {
                method: 'PUT',
                headers: createAuthHeaders(),
                body: JSON.stringify({ name: newName.trim(), isInclude: newIsInclude })
            });

            if (response.ok) {
                const updatedEvent: SeaTreeEventName = await response.json();
                console.log('更新されたイベント:', updatedEvent);
                setEventNames(eventNames.map(event => event.id === id ? updatedEvent : event));
                showMessage('success', 'イベント名を更新しました。');
                return true;
            } else {
                const errorText = await response.text();
                showMessage('error', errorText || '更新に失敗しました。');
                return false;
            }
        } catch (error) {
            showMessage('error', 'ネットワークエラーが発生しました。');
            return false;
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

    if (!isAuthenticated) {
        return (
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

                    <div style={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={styles.checkbox}
                        />
                        <label htmlFor="rememberMe" style={styles.checkboxLabel}>
                            ログイン状態を保持する（24時間）
                        </label>
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
        );
    }

    return (
        <div>
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
                <header style={styles.headerMain}>
                    <div style={styles.headerContent}>
                        <div style={styles.logoArea}>
                            <div style={styles.logoIcon}>
                                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <h1 style={styles.headerTitle}>管理画面</h1>
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

                <main style={styles.mainContent}>
                    <MessageAlert />

                    {/* 含むリスト */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardTitle}>
                                集計に含むCS
                                <span style={styles.badge}>{includeList.length}件</span>
                            </div>
                            <button
                                onClick={() => {
                                    setAddModalVisible(true)
                                    setIsInclude(true)
                                }}
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
                        <TableContent<SeaTreeEventName>
                            data={includeList}
                            loading={loading}
                            onEdit={handleUpdate}
                            onDelete={handleDelete}
                            emptyMessage="含むイベント名がありません"
                            tableHeader="含むイベント名"
                            showIncludeToggle={true}
                        />
                    </div>

                    {/* 除外リスト */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardTitle}>
                                集計から除外するCS
                                <span style={styles.badge}>{excludeList.length}件</span>
                            </div>
                            <button
                                onClick={() => {
                                    setAddModalVisible(true)
                                    setIsInclude(false)
                                }}
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
                        <TableContent<SeaTreeEventName>
                            data={excludeList}
                            loading={loading}
                            onEdit={handleUpdate}
                            onDelete={handleDelete}
                            emptyMessage="除外するイベント名がありません"
                            tableHeader="除外するイベント名"
                            showIncludeToggle={true}
                        />
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
                                        onKeyDown={(e) => e.key === 'Enter' && handleAdd(true)}
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
                                        onClick={() => handleAdd(isInclude)}
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
        </div>
    );
};

export default SeaTreeEventAdmin;