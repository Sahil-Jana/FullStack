// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('/videos/')
      .then(res => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const userVideos = res.data.filter(v => v.uploader.username === currentUser.username);
        setVideos(userVideos);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Uploaded Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map(video => (
          <Link to={`/video/${video.id}`} key={video.id} className="shadow-md border rounded overflow-hidden">
            <img src={video.thumbnail} alt="Thumbnail" className="w-full h-48 object-cover" />
            <div className="p-2">
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description.slice(0, 50)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
