import React from 'react'
import BackgroundVideo from '../video/3129595-uhd_3840_2160_30fps.mp4'
import './Background.css'
function Background({ darkMode }) {
  return (
    <div className={`video-section ${darkMode ? "dark-mode" : "light-mode"}`}>
      <video autoPlay loop muted className="video-section-video">
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export default Background;