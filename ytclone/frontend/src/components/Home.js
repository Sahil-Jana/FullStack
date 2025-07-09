// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('/videos/')
      .then(res => setVideos(res.data))
      .catch(err => console.error('Failed to fetch videos', err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
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
  );
};

export default Home;
