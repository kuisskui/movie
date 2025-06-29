import videos from "@/data"
import Pagination from "./Pagination"
import VideoPreview from "./VideoPreview"

export default function VideoGallery() {
    return (
        <div>
            <div className="text-xl font-bold">
                | Latest videos
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 py-2">
                {videos.map((video, key) => (
                    <div key={key}>
                        <VideoPreview 
                            id={video.id} 
                            title={video.title} 
                            likes={video.likes} 
                            views={video.views} 
                            src={video.src} 
                            />
                    </div>
                ))}
            </div>

            <Pagination />
        </div>
    );
}