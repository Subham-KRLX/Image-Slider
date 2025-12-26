import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [current, length]); 

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="slider-container">
      {/* Navigation Arrows */}
      <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous Slide">
        <svg viewBox="0 0 24 24" className="nav-icon">
             <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      
      <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next Slide">
         <svg viewBox="0 0 24 24" className="nav-icon">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
         </svg>
      </button>

      {/* Slides */}
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <>
                <img src={slide.image} alt={slide.title} className="slide-image" />
                <div className="text-overlay">
                    <h2 className="overlay-title">{slide.title}</h2>
                    <p className="overlay-description">{slide.description}</p>
                </div>
              </>
            )}
            {/* Preload adjacent images if needed, but for simplicity we rely on browser caching after first load. 
                Actually, rendering all images but hiding them with opacity is better for transitions so they don't 'pop' in */}
             <img src={slide.image} alt={slide.title} className="slide-image" style={{display: index === current ? 'none' : 'block'}} />
          </div>
        );
      })}
       {/* 
          Correction: The above conditional rendering logic for `img` inside `slide.active` is a bit redundant/confusing.
          Better approach for smooth CSS fade opacity: Render ALL slides, toggle class.
       */}
    </div>
  );
};

// Re-write to cleaner render logic for transitions
const ImageSliderRefined = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
  
    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };
  
    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }, [current]);
  
    if (!Array.isArray(slides) || slides.length <= 0) {
      return null;
    }
  
    return (
      <div className="slider-container">
        <button className="nav-btn prev-btn" onClick={prevSlide}>
             {/* Left Arrow */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
        <button className="nav-btn next-btn" onClick={nextSlide}>
            {/* Right Arrow */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
        
        {slides.map((slide, index) => (
          <div className={`slide ${index === current ? 'active' : ''}`} key={index}>
            <img src={slide.image} alt="cyberpunk visual" className="slide-image" />
            <div className="text-overlay">
                <h1 className="overlay-title">{slide.title}</h1>
                <p className="overlay-description">{slide.description}</p>
            </div>
          </div>
        ))}

        <div className="indicators">
            {slides.map((_, index) => (
                <div 
                    key={index} 
                    className={`dot ${index === current ? 'active' : ''}`}
                    onClick={() => setCurrent(index)}
                />
            ))}
        </div>
      </div>
    );
};

export default ImageSliderRefined;
