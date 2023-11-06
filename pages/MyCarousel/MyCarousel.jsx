import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const MyCarousel = ({ images }) => {
  return (
    <Carousel showThumbs={false} autoPlay interval={2500} infiniteLoop>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            style={{
              width: "750px",
              height: "400px",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
