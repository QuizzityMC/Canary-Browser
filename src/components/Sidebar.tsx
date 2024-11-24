import React from 'react';
import { Home, Bookmark, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <img src="https://app.canarychat.me/logo.png" alt="Canary Browser" className="sidebar-logo" />
        <button onClick={onToggle} className="sidebar-toggle">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="sidebar-link">
          <Home size={24} />
          <span className="sidebar-link-text">Home</span>
        </a>
        <a href="#" className="sidebar-link">
          <Bookmark size={24} />
          <span className="sidebar-link-text">Bookmarks</span>
        </a>
        <a href="#" className="sidebar-link">
          <Settings size={24} />
          <span className="sidebar-link-text">Settings</span>
        </a>
      </nav>
    </div>
  );
};

