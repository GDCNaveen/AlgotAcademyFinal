
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../components/LoginPage';
import Header from '../components/Header';
import VideoFeed from '../components/VideoFeed';
import Footer from '../components/Footer';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearch={handleSearch}
      />
      <VideoFeed activeTab={activeTab} searchQuery={searchQuery} />
      <Footer />
    </div>
  );
};

export default Index;
