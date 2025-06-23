
import React, { useRef, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  vimeoUrl: string;
  category: string;
  hash: string;
  description?: string;
}

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onVideoClick: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive, onVideoClick }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract video ID from Vimeo URL
  const getVimeoId = (url: string) => {
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : '';
  };

  const vimeoId = getVimeoId(video.vimeoUrl);
  
  // Create Vimeo embed URL with controls enabled
  const embedUrl = `https://player.vimeo.com/video/${vimeoId}?h=${video.hash}&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;

  useEffect(() => {
    if (!isActive) {
      // Send pause command to Vimeo player when not active
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage('{"method":"pause"}', 'https://player.vimeo.com');
      }
    }
  }, [isActive]);

  return (
    <div className="bg-white shadow-sm border border-gray-100 mb-6 overflow-hidden">
      {/* Video Section */}
      <div className="relative aspect-video bg-black">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          title={video.title}
        />
      </div>

      {/* Content Section - Way2News Style */}
      <div className="p-4 bg-white">
        {/* Headline with gradient color */}
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight mb-3 font-serif">
          {video.title}
        </h2>
        
        {/* Description/Content */}
        {video.description && (
          <div className="text-gray-700 text-base leading-relaxed font-light">
            <p className="mb-3">
              {video.description}
            </p>
            
            {/* Additional content styling similar to Way2News */}
            <div className="text-sm text-gray-600 pt-2 border-t border-gray-100">
              <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                {video.category}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
