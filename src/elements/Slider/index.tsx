import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SliderProps {
  slidesToShow?: number;
  comp?: React.ReactNode;
}

export function SliderComp(props: SliderProps) {
  const { slidesToShow } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201001154629.jpg" />
        <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201001154629.jpg" />
        <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201001154629.jpg" />
        <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201001154629.jpg" />
        <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201001154629.jpg" />
        <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201001154629.jpg" />
      </Slider>
    </div>
  );
}
