import Link from 'next/link';

interface VideoPreviewProps {
  id: string;
  title: string;
  likes: number;
  views: number;
  src: string;
}

export default function VideoPreview({ id, src, title, likes, views }: VideoPreviewProps) {

  return (
    <Link href={`/videos?id=${id}`}>
      <div className="flex flex-col gap-1">
        <div className="relative aspect-video bg-white flex items-center justify-center overflow-hidden group">
          <video className="w-full h-full pointer-events-none">
            <source src={src} type="video/mp4" />
          </video>
        </div>
        <div className="flex flex-col text-sm gap-1 h-[4rem]">
          <div className="line-clamp-2 font-bold">
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
            <div>
              ...
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
