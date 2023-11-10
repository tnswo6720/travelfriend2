import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const MyCarousel = ({ images }) => {
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedItem(1);
    }, 2000); // 1초 후에 두 번째 슬라이드로 전환

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 제거
  }, []);

  return (
    <Carousel
      showThumbs={false}
      autoPlay
      interval={2200}
      infiniteLoop
      selectedItem={selectedItem}
    >
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
