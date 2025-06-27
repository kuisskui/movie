'use client';
import VideoPreview from '@/components/VideoPreview';
import videos from '@/data'
export default function Home() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {videos.map((video, key) => (
        <div key={key}>
          <VideoPreview id={video.id} src={video.src} />
        </div>
      ))}
    </div>
  );
}
