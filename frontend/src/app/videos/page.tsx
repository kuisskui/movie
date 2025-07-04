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
    <div className="container flex flex-col gap-2">
      <VideoPlayer title={video.title} likes={video.likes} views={video.views} src={video.src} />
      <VideoGallery/>
    </div>
  );
}
