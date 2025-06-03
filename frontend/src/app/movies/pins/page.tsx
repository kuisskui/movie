'use client';

import { usePinnedVideos } from '@/lib/context/PinnedVideosContext';
import { VideoPlayer } from '@/components/VideoPlayer';
import Link from 'next/link';

export default function Pins() {
    const { pinnedVideos, clearPins } = usePinnedVideos();

    // Determine grid layout based on number of videos
    const getGridClass = () => {
        switch (pinnedVideos.length) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-1 md:grid-cols-2';
            case 3:
                return 'grid-cols-1 md:grid-cols-3';
            case 4:
                return 'grid-cols-1 md:grid-cols-2';
            case 5:
            case 6:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            default:
                return 'grid-cols-1';
        }
    };

    // Calculate height class based on number of videos
    const getHeightClass = () => {
        switch (pinnedVideos.length) {
            case 1:
                return 'h-screen';
            case 2:
            case 3:
                return 'h-1/2';
            case 4:
            case 5:
            case 6:
                return 'h-1/3';
            default:
                return 'h-screen';
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex justify-between items-center p-4 bg-white shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900">Pinned Videos</h1>
                <div className="space-x-4">
                    <Link
                        href="/movies"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Back to Movies
                    </Link>
                    <button
                        onClick={clearPins}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Clear All Pins
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {pinnedVideos.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">No videos pinned yet. Go to the movies page to pin some videos!</p>
                    </div>
                ) : (
                    <div className={`grid ${getGridClass()} h-full`}>
                        {pinnedVideos.map((movie) => (
                            <div key={movie.id} className={`${getHeightClass()} w-full`}>
                                <div className="h-full w-full">
                                    <VideoPlayer movie={movie} hidePin />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}