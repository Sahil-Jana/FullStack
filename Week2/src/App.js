import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";

function App() {
  const [watchLater, setWatchLater] = useState(() => {
    return JSON.parse(sessionStorage.getItem("watchLater")) || [];
  });

  const [likedVideos, setLikedVideos] = useState(() => {
    return JSON.parse(sessionStorage.getItem("likes")) || [];
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    sessionStorage.setItem("likes", JSON.stringify(likedVideos));
  }, [likedVideos]);

  return (
    <div
      className={
        darkMode
          ? "bg-dark text-white d-flex flex-column min-vh-100"
          : "bg-light text-dark d-flex flex-column min-vh-100"
      }
    >
      <Router>
        <Navbar
          watchLaterCount={watchLater.length}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="flex-grow-1 container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  likedVideos={likedVideos}
                  setLikedVideos={setLikedVideos}
                  watchLater={watchLater}
                  setWatchLater={setWatchLater}
                />
              }
            />
            <Route
              path="/watch-later"
              element={
                <WatchLater
                  watchLater={watchLater}
                  setWatchLater={setWatchLater}
                />
              }
            />
          </Routes>
        </div>

        <footer className="text-center p-3 bg-dark text-white mt-auto">
          Made by Sahil © 2025 —{" "}
          <a
            href="https://github.com/yourusername"
            className="text-white text-decoration-underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </footer>
      </Router>
    </div>
  );
}

export default App;
