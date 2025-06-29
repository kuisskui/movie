import React from 'react';

interface VideoPlayerProps {
  title: string;
  likes: number;
  views: number;
  src: string;
}

export default function VideoPlayer({ title, likes, views, src }: VideoPlayerProps) {

  return (
    <div className="flex flex-col gap-1">
      <div className="aspect-video bg-white flex items-center justify-center overflow-hidden">
        <video className="w-full h-full" controls playsInline>
          <source src={src} type="video/mp4" />
          Your browser does not support the video.
        </video>
      </div>

      <div className="flex flex-col gap-1 h-[4rem]">
        <div className="line-clamp-2 font-bold text-xl">
          {title}
        </div>
        <div className="flex grow justify-between items-end">
          <div className="flex gap-2">
            <div>
              VIEWS: {views}
            </div>
            <div>
              LIKES: {likes}
            </div>
          </div>

          <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
            Like
          </button>
        </div>
      </div>
    </div>
  );
};
