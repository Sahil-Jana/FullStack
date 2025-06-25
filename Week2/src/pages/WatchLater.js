import React from "react";
import { videos } from "../data/dummyVideos";
import VideoCard from "../components/VideoCard";

function WatchLater({ watchLater, setWatchLater }) {
  const savedVideos = videos.filter((vid) => watchLater.includes(vid.id));

  const toggleWatchLater = (id) => {
    setWatchLater((prev) => prev.filter((vid) => vid !== id));
  };

  return (
    <div>
      <h3 className="text-center mb-4">Watch Later</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5 g-3">
        {savedVideos.map((video) => (
          <div key={video.id} className="col">
            <VideoCard
              video={video}
              isSaved={true}
              toggleWatchLater={toggleWatchLater}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchLater;
