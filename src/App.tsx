import React, { useState, useCallback } from 'react';
import { AddressBar } from './components/AddressBar.tsx';
import { TabBar } from './components/TabBar.tsx';
import { BrowserView } from './components/BrowserView.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import './App.css';

interface Tab {
  id: number;
  url: string;
  title: string;
  favicon?: string;
  isLoading?: boolean;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, url: 'about:blank', title: 'New Tab', isLoading: false }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleNavigate = (url: string) => {
    setTabs(tabs.map(tab =>
      tab.id === activeTab ? { ...tab, url, isLoading: true } : tab
    ));
  };

  const handleNewTab = useCallback(() => {
    const newTab = { 
      id: Date.now(), 
      url: 'about:blank', 
      title: 'New Tab',
      isLoading: false
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
  }, []);

  const handleCloseTab = (id: number) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    if (newTabs.length === 0) {
      handleNewTab();
    } else {
      setTabs(newTabs);
      if (activeTab === id) {
        setActiveTab(newTabs[newTabs.length - 1].id);
      }
    }
  };

  const handleTitleChange = (id: number, title: string) => {
    setTabs(tabs.map(tab =>
      tab.id === id ? { ...tab, title } : tab
    ));
  };

  const handleGoBack = () => {
    // Implement go back functionality
    console.log('Go back');
  };

  const handleGoForward = () => {
    // Implement go forward functionality
    console.log('Go forward');
  };

  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-content">
        <div className="titlebar">
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onNewTab={handleNewTab}
            onCloseTab={handleCloseTab}
            onSelectTab={setActiveTab}
          />
        </div>
        <AddressBar
          currentUrl={currentTab.url}
          onNavigate={handleNavigate}
          onRefresh={() => handleNavigate(currentTab.url)}
          onStop={() => {/* Implement stop loading */}}
          canGoBack={currentTab.canGoBack || false}
          canGoForward={currentTab.canGoForward || false}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          isLoading={currentTab.isLoading || false}
          isSecure={currentTab.url.startsWith('https://')}
        />
        <BrowserView
          url={currentTab.url}
          onTitleChange={(title) => handleTitleChange(currentTab.id, title)}
          onUrlChange={(url) => handleNavigate(url)}
        />
      </div>
    </div>
  );
}

