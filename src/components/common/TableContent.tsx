// TableContent.tsx
import React, { useState } from 'react';

interface BaseTableItem {
    id: number;
    name: string;
    isInclude: boolean;
}

interface TableContentProps<T extends BaseTableItem> {
    data: T[];
    loading: boolean;
    onEdit?: (id: number, newName: string, isInclude: boolean) => Promise<boolean>;
    onDelete?: (id: number, name: string) => Promise<void>;
    emptyMessage?: string;
    tableHeader?: string;
    showIncludeToggle?: boolean;
}

const TableContent = <T extends BaseTableItem>({
    data,
    loading,
    onEdit,
    onDelete,
    emptyMessage = "データがありません",
    tableHeader = "イベント名",
    showIncludeToggle = false,
}: TableContentProps<T>): React.ReactElement => {
    const [editingKey, setEditingKey] = useState<number | null>(null);
    const [editingName, setEditingName] = useState<string>('');
    const [editingInclude, setEditingInclude] = useState<boolean>(true);

    const styles: { [key: string]: React.CSSProperties } = {
        emptyState: {
            padding: '48px 24px',
            textAlign: 'center'
        },
        loadingSpinner: {
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
        },
        emptyIcon: {
            width: '64px',
            height: '64px',
            color: '#d1d5db',
            margin: '0 auto 16px'
        },
        emptyText: {
            fontSize: '18px',
            color: '#6b7280',
            margin: 0
        },
        loadingText: {
            fontSize: '18px',
            color: '#6b7280',
            margin: '16px 0 0 0'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            padding: '12px 24px',
            backgroundColor: '#f9fafb',
            color: '#374151',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textAlign: 'left'
        },
        tr: {
            borderTop: '1px solid #f3f4f6',
            transition: 'background-color 0.2s'
        },
        td: {
            padding: '16px 24px'
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
        includeBadge: {
            marginLeft: '8px',
            padding: '2px 6px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '500'
        },
        includeTrue: {
            backgroundColor: '#dcfce7',
            color: '#16a34a'
        },
        includeFalse: {
            backgroundColor: '#fee2e2',
            color: '#dc2626'
        }
    };

    const startEdit = (item: T): void => {
        setEditingKey(item.id);
        setEditingName(item.name);
        setEditingInclude(item.isInclude);
    };

    const cancelEdit = (): void => {
        setEditingKey(null);
        setEditingName('');
        setEditingInclude(true);
    };

    const handleSave = async (id: number): Promise<void> => {
        if (!editingName.trim()) {
            return;
        }

        if (onEdit) {
            const success = await onEdit(id, editingName.trim(), editingInclude);
            if (success) {
                // 成功時のみ編集状態をクリア
                setEditingKey(null);
                setEditingName('');
                setEditingInclude(true);
            }
        }
    };

    const handleDelete = async (id: number, name: string): Promise<void> => {
        if (onDelete) {
            await onDelete(id, name);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number): void => {
        if (e.key === 'Enter') {
            handleSave(id);
        }
    };

    if (loading) {
        return (
            <div style={styles.emptyState}>
                <div style={styles.loadingSpinner}></div>
                <p style={styles.loadingText}>読み込み中...</p>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div style={styles.emptyState}>
                <svg style={styles.emptyIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <p style={styles.emptyText}>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <>
            <style>
                {`
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
                `}
            </style>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>{tableHeader}</th>
                        <th style={styles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} style={styles.tr}>
                            <td style={styles.td}>
                                {editingKey === item.id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            style={{
                                                ...styles.editInput,
                                                borderColor: '#3b82f6'
                                            }}
                                            onKeyDown={(e) => handleKeyDown(e, item.id)}
                                            autoFocus
                                        />
                                    </div>
                                ) : (
                                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                                        {item.name}
                                        {showIncludeToggle && (
                                            <span style={{
                                                ...styles.includeBadge,
                                                ...(item.isInclude ? styles.includeTrue : styles.includeFalse)
                                            }}>
                                                {item.isInclude ? '含む' : '除外'}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </td>
                            <td style={{ ...styles.td, textAlign: 'right' }}>
                                {editingKey === item.id ? (
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button
                                            onClick={() => handleSave(item.id)}
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
                                        {onEdit && (
                                            <button
                                                onClick={() => startEdit(item)}
                                                disabled={editingKey !== null}
                                                style={{
                                                    ...styles.actionButton,
                                                    ...styles.editButton,
                                                    opacity: editingKey !== null ? 0.5 : 1
                                                }}
                                            >
                                                編集
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => handleDelete(item.id, item.name)}
                                                disabled={editingKey !== null}
                                                style={{
                                                    ...styles.actionButton,
                                                    ...styles.deleteButton,
                                                    opacity: editingKey !== null ? 0.5 : 1
                                                }}
                                            >
                                                削除
                                            </button>
                                        )}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TableContent;