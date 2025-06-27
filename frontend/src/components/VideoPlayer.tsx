  import React from 'react';

  interface VideoPlayerProps {
    src: string
  }

  export default function VideoPlayer({src}: VideoPlayerProps) {
    
    return (
      <div className="flex flex-col items-center justify-center">
        <video>
          <source src={src} type="video/mp4" />
          Your browser does not support the video.
        </video>
      </div>
    );
  };
