// src/components/VideoPlayer.js
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  const fetchVideo = useCallback(async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(`/videos/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  const toggleLike = async () => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(`/videos/${id}/like/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVideo();
    } catch {
      alert("Login required");
    }
  };

  const toggleSave = async () => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(`/videos/${id}/save/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVideo();
    } catch {
      alert("Login required");
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/video/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Video URL copied to clipboard!");
  };

  if (!video) return <p className="p-4 text-gray-600">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">{video.title}</h2>
      <video
        className="w-full rounded-md mb-4"
        controls
        src={`http://127.0.0.1:8000${video.video}`}
      />
      <p className="mb-4 text-gray-700">{video.description}</p>
      <p className="mb-2">Likes: {video.likes_count}</p>

      <div className="flex gap-3">
        <button
          onClick={toggleLike}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          {video.is_liked ? "Unlike" : "Like"}
        </button>

        <button
          onClick={toggleSave}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          {video.is_saved ? "Remove from Watch Later" : "Watch Later"}
        </button>

        <button
          onClick={handleShare}
          className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
