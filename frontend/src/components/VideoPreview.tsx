import Link from 'next/link';
import Image from 'next/image';

interface VideoPreviewProps {
  id: string;
  src: string;
}

export default function VideoPreview({ id, src }: VideoPreviewProps) {
  return (
    <div>
      <Link href={`/videos?id=${id}`}>
        <video>
          <source src={src} type="video/mp4" />
        </video>
      </Link>
    </div>
  );
}
