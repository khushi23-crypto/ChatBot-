import React from 'react'
import BackgroundVideo from '../video/3129671-uhd_3840_2160_30fps.mp4'
import { Button } from 'react-bootstrap';
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
        <p></p>
        <p></p>
        <h3>Supercharge Your Customer Support Efficiency With ChatBot</h3>
        <p></p>
        <p></p>
        <h5>Interactive Conversations, Powered by AI</h5>
        <p></p>
        <p>
          Our goal is to provide you with a tailored solution that addresses your specific challenges.<br />
          Our ChatBots are trained to have human-like conversations using a process known as<br />
          natural language processing, increasing the efficiency of customer support.
        </p>
        <div className="video-section-buttons">
          <Button variant="primary" className="me-4">Get Started</Button>
          <Button variant="outline-light">Learn More</Button>
        </div>
        
      </div>
    </div>
  );
}

export default Background;
