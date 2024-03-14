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

  };

  const images = [
    spa,
    '/path/to/your/image1.jpg', // Replace these paths with actual paths to your images
    '/path/to/your/image2.jpg',
    '/path/to/your/image3.jpg',
  ];
 
  return (
    <div style={{ position: 'relative', width: '100%', height: '30vh',padding:'0px',margin:'0px'}}>
      <Slider {...settings} style={{ width: '100%', height: '100%' }}>
        
        {images.map((image, index) => (
          
          <div key={index}>
          
            <div style={{
              backgroundImage: `url(${image})`,
              
           
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

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%', // Optional: makes the arrow buttons circular
        width: '30px', // Set a width
        height: '30px', // Set a height
       
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%', // Optional: makes the arrow buttons circular
        width: '30px', // Set a width
        height: '30px', // Set a height
       
      }}
      onClick={onClick}
    />
  );
};

export default HotelCarousel;


