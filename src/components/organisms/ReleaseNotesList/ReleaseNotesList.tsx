import React, { useState } from 'react';
import ReleaseNote from '../ReleaseNote/ReleaseNote';
import { ReleaseNoteProps } from '../ReleaseNote/ReleaseNote';

export interface ReleaseNotesListProps {
    releases: ReleaseNoteProps[];
    showSearch?: boolean;
    showFilter?: boolean;
    title?: string;
}

const ReleaseNotesList: React.FC<ReleaseNotesListProps> = ({
    releases,
    showSearch = true,
    showFilter = true,
    title = 'リリースノート',
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');

    const filteredReleases = releases.filter((release) => {
        const matchesSearch = searchTerm === '' || 
            release.version.includes(searchTerm) ||
            release.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            release.summary?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterType === 'all' || 
            (filterType === 'major' && release.version.endsWith('.0.0')) ||
            (filterType === 'minor' && !release.version.endsWith('.0.0') && release.version.includes('.0')) ||
            (filterType === 'micro' && !release.version.includes('.0'));

        return matchesSearch && matchesFilter;
    });

    return (
        <div
            style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '24px',
            }}
        >
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>
                    {title}
                </h1>
                
                {(showSearch || showFilter) && (
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {showSearch && (
                            <input
                                type="text"
                                placeholder="バージョンやキーワードで検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    flex: 1,
                                    minWidth: '200px',
                                    padding: '10px 16px',
                                    fontSize: '15px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    outline: 'none',
                                }}
                            />
                        )}
                        
                        {showFilter && (
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                style={{
                                    padding: '10px 16px',
                                    fontSize: '15px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                <option value="all">すべてのリリース</option>
                                <option value="major">メジャーリリース</option>
                                <option value="minor">マイナーリリース</option>
                                <option value="micro">マイクロリリース</option>
                            </select>
                        )}
                    </div>
                )}
            </header>

            <div>
                {filteredReleases.length > 0 ? (
                    filteredReleases.map((release, index) => (
                        <ReleaseNote key={index} {...release} />
                    ))
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '48px',
                            color: '#6b7280',
                            fontSize: '16px',
                        }}
                    >
                        該当するリリースが見つかりませんでした。
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReleaseNotesList;