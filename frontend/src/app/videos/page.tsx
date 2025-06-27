"use client"
import VideoPlayer from '@/components/VideoPlayer';
import videos from '@/data';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const video = videos.find(video => video.id == id)

  if (!video) {
    return
  }

  return (
    <div className="container mx-auto my-auto">
      <VideoPlayer src={video.src} />
    </div>
  );
}
