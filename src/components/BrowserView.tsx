import React from 'react';
import { NewTab } from './NewTab.tsx';

interface BrowserViewProps {
  url: string;
  onTitleChange?: (title: string) => void;
  onUrlChange?: (url: string) => void;
}

export const BrowserView: React.FC<BrowserViewProps> = ({ url, onTitleChange, onUrlChange }) => {
  const handleLoad = (event: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    const iframe = event.target as HTMLIFrameElement;
    onTitleChange?.(iframe.contentDocument?.title || '');
    onUrlChange?.(iframe.src);
  };

  if (url === 'about:blank') {
    return <NewTab onNavigate={onUrlChange || (() => {})} />;
  }

  return (
    <div className="browser-view">
      <iframe
        src={url}
        className="webview"
        onLoad={handleLoad}
        title="Browser View"
      />
    </div>
  );
};

