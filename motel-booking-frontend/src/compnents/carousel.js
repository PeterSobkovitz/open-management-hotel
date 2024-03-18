import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import spa from '../images/spa.png';

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
    spa, // Assuming this is an imported image
    '/path/to/your/image1.jpg', // Replace these paths with actual paths to your images
    '/path/to/your/image2.jpg',
    '/path/to/your/image3.jpg',
  ];

   return (
    <div style={{ position: 'relative', width: '100vw', height: '30vh' }}>
       <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Background Image */}
            <div style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '30vh',
            }} />
            {/* Dark Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.1)', // Adjust the opacity as needed
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* Text Centered on Overlay */}
              <h2 style={{ color: 'white', textAlign: 'center', margin: 0 }}>
                "Exceptional service and stunning views!"
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const arrowStyle = {
  display: 'block', 
  background: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '50%', 
  width: '30px', 
  height: '30px', 
  zIndex: 25,
  position: 'absolute', 
  top: '50%', 
  transform: 'translateY(-50%)', // Vertically center arrow
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ ...arrowStyle, right: '5%' }} // 5% from the right edge
    />
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ ...arrowStyle, left: '5%' }} // 5% from the left edge
    />
  );
};

export default HotelCarousel;



