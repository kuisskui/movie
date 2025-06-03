interface VideoPlayerProps {
  src: string;
  type?: string;
}

export function VideoPlayer({ src, type = 'video/mp4' }: VideoPlayerProps) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <video
        className="w-full h-full rounded-lg object-cover"
        controls
        preload="metadata"
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 