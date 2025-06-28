"use client"
import VideoPlayer from '@/components/VideoPlayer';
import videos from '@/data';
import VideoGallery from '@/components/VideoGallery';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const video = videos.find(video => video.id == id)

  if (!video) {
    return
  }

  return (
    <div className="container py-2">
      <VideoPlayer src={video.src} />
      <VideoGallery/>
    </div>
  );
}
