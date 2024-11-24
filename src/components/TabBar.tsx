import React from 'react';

interface Tab {
  id: number;
  url: string;
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: number;
  onNewTab: () => void;
  onCloseTab: (id: number) => void;
  onSelectTab: (id: number) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onNewTab, onCloseTab, onSelectTab }) => {
  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div 
          key={tab.id} 
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onSelectTab(tab.id)}
        >
          <span>{tab.title}</span>
          <button onClick={() => onCloseTab(tab.id)}>×</button>
        </div>
      ))}
      <button className="new-tab" onClick={onNewTab}>+</button>
    </div>
  );
};

