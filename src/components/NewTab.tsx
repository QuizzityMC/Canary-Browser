import React, { useState } from 'react';
import { Clock } from './Clock';
import { Search } from 'lucide-react';

interface TopSite {
  title: string;
  url: string;
  favicon?: string;
}

interface NewTabProps {
  onNavigate: (url: string) => void;
}

const defaultTopSites: TopSite[] = [
  { title: 'Google', url: 'https://google.com', favicon: 'https://www.google.com/favicon.ico' },
  { title: 'GitHub', url: 'https://github.com', favicon: 'https://github.com/favicon.ico' },
  { title: 'YouTube', url: 'https://youtube.com', favicon: 'https://www.youtube.com/favicon.ico' },
  { title: 'Reddit', url: 'https://reddit.com', favicon: 'https://www.reddit.com/favicon.ico' },
  { title: 'Twitter', url: 'https://twitter.com', favicon: 'https://twitter.com/favicon.ico' },
  { title: 'LinkedIn', url: 'https://linkedin.com', favicon: 'https://www.linkedin.com/favicon.ico' },
];

export const NewTab: React.FC<NewTabProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topSites] = useState<TopSite[]>(defaultTopSites);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="new-tab">
      <div className="new-tab-content">
        <img src="https://app.canarychat.me/logo.png" alt="Canary Browser" className="new-tab-logo" />
        <Clock />
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the web"
              className="search-input"
            />
          </div>
        </form>
        <div className="top-sites">
          {topSites.map((site, index) => (
            <a key={index} href={site.url} className="top-site" onClick={(e) => {
              e.preventDefault();
              onNavigate(site.url);
            }}>
              <div className="top-site-icon">
                {site.favicon ? (
                  <img src={site.favicon} alt={site.title} />
                ) : (
                  <div className="fallback-icon">{site.title[0]}</div>
                )}
              </div>
              <span className="top-site-title">{site.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

