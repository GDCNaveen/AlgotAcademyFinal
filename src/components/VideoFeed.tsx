
import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from './VideoPlayer';

interface Video {
  id: string;
  title: string;
  vimeoUrl: string;
  category: string;
  hash: string;
  description?: string;
}

interface VideoFeedProps {
  activeTab: string;
  searchQuery: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ activeTab, searchQuery }) => {
  const [videos] = useState<Video[]>([
    {
      id: '1095495803',
      title: 'Advanced Mathematics Concepts - Part 1',
      vimeoUrl: 'https://player.vimeo.com/video/1095495803',
      category: 'Mathematics',
      hash: '55eac0fa5a',
      description: 'Learn fundamental mathematical concepts including algebra, geometry, and calculus. This comprehensive lesson covers key topics that will help you excel in your studies. Master complex equations, understand geometric principles, and explore the fascinating world of mathematical analysis through practical examples and step-by-step explanations.'
    },
    {
      id: '1095510347', 
      title: 'Computer Operations and Basic Programming',
      vimeoUrl: 'https://player.vimeo.com/video/1095510347',
      category: 'Computer Science',
      hash: 'adbdfa174b',
      description: 'Introduction to computer operations and basic programming concepts. Learn how to operate a computer effectively and understand fundamental programming principles for beginners. Discover the basics of coding, software development, and digital literacy skills that are essential in today\'s technology-driven world.'
    },
     {
      id: '1095495803',
      title: 'Advanced Mathematics Concepts - Part 1',
      vimeoUrl: 'https://player.vimeo.com/video/1095495803',
      category: 'Mathematics',
      hash: '55eac0fa5a',
      description: 'Learn fundamental mathematical concepts including algebra, geometry, and calculus. This comprehensive lesson covers key topics that will help you excel in your studies. Master complex equations, understand geometric principles, and explore the fascinating world of mathematical analysis through practical examples and step-by-step explanations.'
    },
    {
      id: '1095510347', 
      title: 'Computer Operations and Basic Programming',
      vimeoUrl: 'https://player.vimeo.com/video/1095510347',
      category: 'Computer Science',
      hash: 'adbdfa174b',
      description: 'Introduction to computer operations and basic programming concepts. Learn how to operate a computer effectively and understand fundamental programming principles for beginners. Discover the basics of coding, software development, and digital literacy skills that are essential in today\'s technology-driven world.'
    },
  ]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtered = videos;

    // Filter by category
    if (activeTab !== 'All') {
      filtered = filtered.filter(video => video.category === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.description && video.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredVideos(filtered);
    setActiveVideoIndex(0);
  }, [activeTab, searchQuery, videos]);

  const handleVideoClick = (index: number) => {
    setActiveVideoIndex(index);
  };

  if (filteredVideos.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-gray-50 py-6"
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <div className="max-w-4xl mx-auto px-4">
        {filteredVideos.map((video, index) => (
          <VideoPlayer
            key={video.id}
            video={video}
            isActive={index === activeVideoIndex}
            onVideoClick={() => handleVideoClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;
