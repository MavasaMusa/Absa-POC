import absa1 from './absa_img1.jpg';
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './home.css';
import Navbar from '../../navbar/navbar';

function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      setIsModelLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (webcamRef.current && canvasRef.current && isModelLoaded) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      faceapi.matchDimensions(canvas, {
        width: video.width,
        height: video.height,
      });

      const handleVideoPlay = async () => {
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks().withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(detections, {
            width: video.width,
            height: video.height,
          });
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }, 100);
      };

      video.addEventListener('play', handleVideoPlay);

      return () => {
        video.removeEventListener('play', handleVideoPlay);
      };
    }
  }, [isModelLoaded]);

  return (
    <>
    <Navbar />
    <div style={containerStyle}>
      {/* Left Section with Image */}
      <section style={{ ...sectionStyle, ...leftSectionStyle }}>
        <img src='' alt="Left Section" style={imageStyle} />
      </section>

      {/* Right Section */}
      <section style={sectionStyle}>
        <div className='scan'>
          <h2>Scan Face To Login</h2>
        </div>
        <div className='face-detection'>
          
          <Webcam
            ref={webcamRef}
            style={webcamStyle}
            screenshotFormat="image/jpeg"
          />
          <canvas
            ref={canvasRef}
            style={canvasStyle}
          />
        </div>
      </section>
    </div>
    </>
  );
}

// CSS styles
const containerStyle = {
  display: 'flex',
  height: '100vh', // Full viewport height
};

const sectionStyle = {
  flex: 1, // Equal width
  height: '100%', // Full height of the container
  padding: '20px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxSizing: 'border-box',
  position: 'relative', // Make sure the section is positioned relative for absolute positioning of child elements
};

const leftSectionStyle = {
  padding: 0, // Remove padding so image covers entire section
  margin: 0, // Remove margin
  border: 'none', // Remove border
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Cover the entire section without distortion
  borderRadius: '5px',
};

const webcamStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9,
  width: '100%',
  height: '100%',
};

const canvasStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 10,
  width: '100%',
  height: '100%',
};

export default Home;
