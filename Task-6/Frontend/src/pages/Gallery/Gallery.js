import React, { useState, useEffect } from 'react';
import './style.css';
import { FaTimes, FaArrowRight, FaArrowLeft, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import myImage1 from './857365.jpg';
import myImage2 from './862688.jpg';
import myImage3 from './Fullmetal-Alchemist-Brotherhood-Laptop-Desktop.jpg';
import myImage4 from './gon-freecss-wallpaper-57.jpg';
import myImage5 from './itachi-sharingan-face-clvcvb372t9dv83n.jpg';
import myImage6 from './wallpapersden.com_itachi-uchiha-naruto-4k-minimal_3840x2400.jpg';
import myImage7 from './WhatsApp Image 2024-06-18 at 20.32.53_cc110972.jpg';
import myImage8 from './2907598.jpeg';
import myImage9 from './Assets2/akame_ga_kill-.jpeg';
import myImage10 from './Assets2/attack-titan-and-levi.png';
import myImage11 from './Assets2/f86bce0a2c29f90e1f7e1bcaa990a75e.jpg';
import myImage12 from './Assets2/hunter-x-hunter-gon-cs-killua-zoldyck-hd-wallpaper-preview.jpg';
import myImage13 from './Assets2/photo_2018-12-30_14-09-01.jpg';
import myImage14 from './Assets2/photo_2021-08-11_12-24-35.jpg';
import myImage15 from './Assets2/photo_2022-09-09_20-28-49.jpg';
import myImage16 from './Assets2/photo_2022-12-22_10-29-42.jpg';
import myImage17 from './Assets2/qXsVayNBGNZejBMQeYNiHa.jpg';
import myImage18 from './Assets2/The_Colossal_Titan_appears.png';
import myImage19 from './Assets2/the-way-of-the-househusband-ed1-e1618739009951.jpg';

const images = [
  myImage1, myImage2, myImage3, myImage4, myImage5, myImage6,
  myImage7, myImage8, myImage9, myImage10, myImage11, myImage12,
  myImage13, myImage14, myImage15, myImage16, myImage17, myImage18, myImage19
];

const MyComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setZoomLevel(1);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleZoomIn = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel * 1.2);
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel / 1.2);
  };

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
    setZoomLevel(1);
  };

  const handlePrevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentIndex(prevIndex);
    setZoomLevel(1);
  };

  const handleKeyDown = (e) => {
    if (selectedImage) {
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === '+') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, currentIndex]);

  return (
    <div className="display">
      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" style={{ transform: `scale(${zoomLevel})` }} onClick={(e) => e.stopPropagation()}>
            <FaTimes className="close" onClick={handleCloseModal} />
            <FaArrowLeft className="nav-arrow left-arrow" onClick={handlePrevImage} />
            <FaArrowRight className="nav-arrow right-arrow" onClick={handleNextImage} />
            <FaSearchPlus className="zoom-icon zoom-in" onClick={handleZoomIn} />
            <FaSearchMinus className="zoom-icon zoom-out" onClick={handleZoomOut} />
            <img src={selectedImage} alt="Full Size" />
          </div>
        </div>
      )}
      <div className="gallery">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Gallery Image ${index + 1}`} onClick={() => handleImageClick(image, index)} />
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
