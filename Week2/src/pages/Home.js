import React, { useState, useEffect } from "react";
import { videos } from "../data/dummyVideos";
import VideoCard from "../components/VideoCard";

function Home({ likedVideos, setLikedVideos, watchLater, setWatchLater }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (id) => {
    setLikedVideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const toggleWatchLater = (id) => {
    setWatchLater((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  return (
    <>
      <h2 className="text-center mb-2">Mini YouTube Clone</h2>
      <p className="text-center text-muted">Time on site: {seconds} sec</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5 g-3">
        {videos.map((video) => (
          <div key={video.id} className="col">
            <VideoCard
              video={video}
              isLiked={likedVideos.includes(video.id)}
              isSaved={watchLater.includes(video.id)}
              toggleLike={toggleLike}
              toggleWatchLater={toggleWatchLater}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
