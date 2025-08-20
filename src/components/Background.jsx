import React from 'react'
import BackgroundVideo from '../video/3130284-uhd_3840_2160_30fps.mp4'
import './Background.css'
function Background() {
  
    return (
        <div className="video-section">
  <video autoPlay loop muted className="video-section-video">
    <source src={BackgroundVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="video-section-content">
    <h1>ChatBot App</h1>
    <p>Interactive Conversations, Powered by AI</p>
  </div>
</div>

    );
}
export default Background