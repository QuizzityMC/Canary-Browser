import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, X, Lock, Shield, Search, Star, Download } from 'lucide-react';

interface AddressBarProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onRefresh: () => void;
  onStop: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  isLoading: boolean;
  isSecure: boolean;
}

export const AddressBar: React.FC<AddressBarProps> = ({
  currentUrl,
  onNavigate,
  onRefresh,
  onStop,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  isLoading,
  isSecure
}) => {
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputUrl(currentUrl);
    }
  }, [currentUrl, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    let url = inputUrl;
    
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      if (url.includes('.') && !url.includes(' ')) {
        url = `https://${url}`;
      } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    
    onNavigate(url);
  };

  return (
    <div className="address-bar">
      <div className="navigation-buttons">
        <button 
          onClick={onGoBack} 
          disabled={!canGoBack}
          className="nav-button"
        >
          <ArrowLeft size={16} />
        </button>
        <button 
          onClick={onGoForward} 
          disabled={!canGoForward}
          className="nav-button"
        >
          <ArrowRight size={16} />
        </button>
        <button 
          onClick={isLoading ? onStop : onRefresh}
          className="nav-button"
        >
          {isLoading ? <X size={16} /> : <RefreshCw size={16} />}
        </button>
      </div>

      <div className="url-bar">
        <div className="security-indicator">
          {isSecure ? (
            <Lock size={16} className="text-green-500" />
          ) : (
            <Shield size={16} className="text-gray-400" />
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex-grow">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            className="url-input"
            spellCheck="false"
          />
        </form>

        <div className="action-buttons">
          <button className="action-button">
            <Star size={16} />
          </button>
          <button className="action-button">
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

