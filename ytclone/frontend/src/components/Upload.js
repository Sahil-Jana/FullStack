// src/components/Upload.js
import React, { useState } from 'react';
import axios from '../axiosConfig';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !thumbnail) {
      setMsg("Both video and thumbnail are required");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('video_file', video);
    formData.append('thumbnail', thumbnail);

    try {
      await axios.post('/videos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMsg("Upload successful!");
    } catch (err) {
      console.error(err);
      setMsg("Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
      {msg && <p className="mb-4 text-center text-sm text-red-600">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
        <input type="file" onChange={e => setVideo(e.target.files[0])} accept="video/*" className="w-full" />
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept="image/*" className="w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
