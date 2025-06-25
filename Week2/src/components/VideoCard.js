import React from "react";

function VideoCard({ video, isLiked, isSaved, toggleLike, toggleWatchLater }) {
  return (
    <div className="card h-100 shadow-sm" style={{ minHeight: "300px" }}>
      <img src={video.thumbnail} className="card-img-top" alt="Thumbnail" style={{ height: "150px", objectFit: "cover" }} />
      <div className="card-body px-3 py-2">
        <h5 className="card-title">{video.title}</h5>
        <p className="card-text">
          <strong>{video.channel}</strong><br />
          {video.views} • {video.time}
        </p>
        {toggleLike && (
          <button
            className={`btn btn-sm me-2 ${isLiked ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => toggleLike(video.id)}
          >
            ❤️ {isLiked ? "Liked" : "Like"}
          </button>
        )}
        <button
          className={`btn btn-sm ${isSaved ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => toggleWatchLater(video.id)}
        >
          ➕ {isSaved ? "Saved" : "Watch Later"}
        </button>
      </div>
    </div>
  );
}

export default VideoCard;
