import React from 'react';

interface VideoPlayerProps {
  src: string
}

export default function VideoPlayer({ src }: VideoPlayerProps) {

  return (
    <div>
      <div className="aspect-video bg-white flex items-center justify-center overflow-hidden">
        <video className="w-full h-full" controls playsInline>
          <source src={src} type="video/mp4" />
          Your browser does not support the video.
        </video>
      </div>

      <div className="line-clamp-3 text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla voluptatum ipsum, eaque suscipit fugiat expedita porro reiciendis est similique, quod nostrum amet eum qui. Provident ipsam culpa quisquam eos temporibus.
      </div>
    </div>
  );
};
