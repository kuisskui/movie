import Link from 'next/link';

interface VideoPreviewProps {
  id: string;
  src: string;
}

export default function VideoPreview({ id, src }: VideoPreviewProps) {
  return (
    <Link href={`/videos?id=${id}`}>
      <div className="aspect-video bg-white flex items-center justify-center overflow-hidden">
        <video className="w-full h-full">
          <source src={src} type="video/mp4" />
        </video>
      </div>
      
      <div className="line-clamp-3 text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus tempore eum illo quidem vel quibusdam dolor, quasi exercitationem, soluta expedita accusantium earum, porro dolore adipisci molestiae iure minima. Perspiciatis, laboriosam.
      </div>
    </Link>
  );
}
