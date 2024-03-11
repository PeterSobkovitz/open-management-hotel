import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import spa from '../images/spa.png'
const HotelCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const images = [
    spa,
    '/path/to/your/image1.jpg', // Replace these paths with actual paths to your images
    '/path/to/your/image2.jpg',
    '/path/to/your/image3.jpg',
  ];
 
  return (
    <div style={{ position: 'relative', width: '100%', height: '30vh' }}>
      <Slider {...settings} style={{ width: '100%', height: '100%' }}>
        
        {images.map((image, index) => (
          
          <div key={index}>
            <h1></h1>
            <div style={{
              backgroundImage: `url(${image}) center center / cover no-repeat`,
              height: '100%',
            }}>
              {/* Black cover with 10% opacity */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* Header with citations */}
                <h2 style={{ color: 'white', textAlign: 'center' }}>
                  "Exceptional service and stunning views!"
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom arrow components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'rgba(255, 255, 255, 0.5)' }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'rgba(255, 255, 255, 0.5)' }}
      onClick={onClick}
    />
  );
};

export default HotelCarousel;
