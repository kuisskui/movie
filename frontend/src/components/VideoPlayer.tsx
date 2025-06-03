interface VideoPlayerProps {
  src: string;
  type?: string;
  onAction?: () => void;
}

export function VideoPlayer({
  src,
  type = 'video/mp4',
  onAction = () => alert('Action not implemented'),
}: VideoPlayerProps) {
  return (
    <div className="relative aspect-w-16 aspect-h-9">
      <video
        className="w-full h-full object-contain"
        controls
        preload="metadata"
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>

      <button
        onClick={onAction}
        className="
          absolute right-3 top-3            /* 2 – position */
          z-10                              /* 3 – above video */
          rounded-full bg-white/70          /* glassy circle */
          backdrop-blur px-3 py-2
          text-sm font-medium hover:bg-white
          transition
        "
      >
        Pin
      </button>
    </div>
  );
} 