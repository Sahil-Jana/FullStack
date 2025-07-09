// src/components/VideoPlayer.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null); // Assuming you're storing user info

  useEffect(() => {
    fetchVideo();
    fetchComments();
    getUser();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`/videos/${id}/`);
      setVideo(res.data);
    } catch (err) {
      console.error('Error fetching video:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/videos/${id}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const getUser = () => {
    const userInfo = localStorage.getItem('user'); // or however you store it
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `/videos/${id}/comment/`,
        { content: newComment },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <video
        width="100%"
        height="auto"
        controls
        src={video.video_file}
        poster={video.thumbnail}
      />

      <h2 className="text-2xl font-bold mt-4">{video.title}</h2>
      <p className="text-gray-700 mb-4">{video.description}</p>

      <hr className="my-4" />

      <h3 className="text-xl font-semibold mb-2">Comments</h3>

      {user && (
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      )}

      {!user && (
        <p className="text-gray-500 italic">Login to post a comment</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-2">
            <p className="font-semibold">{comment.user.username}</p>
            <p className="text-gray-700">{comment.content}</p>
            <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
