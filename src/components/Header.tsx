
import React, { useState } from 'react';
import { GraduationCap, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    'All',
    'Mathematics',
    'Science', 
    'Social',
    'Telugu',
    'English',
    'Computer Science'
  ];

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Algot Academy
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
             
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`flex-shrink-0 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 border-b-2 border-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-50 to-purple-50'
                    : 'text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-gray-50'
                }`}
                style={activeTab === tab ? {
                  borderImage: 'linear-gradient(to right, #2563eb, #9333ea) 1'
                } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
