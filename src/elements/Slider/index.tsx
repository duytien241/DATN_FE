import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.scss';

interface SliderProps {
  slidesToShow?: number;
  comp?: React.ReactNode;
}

export default (props: SliderProps) => {
  const { slidesToShow } = props;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 3,
    className: 'center',
    centerMode: true,
    centerPadding: '300px',
  };
  return (
    <Slider {...settings} className="SliderBanner">
      <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201026171903.jpg" />
      <img src="https://images.foody.vn/biz_banner/foody-upload-api-food-biz-201027113805.jpg" />
      <img src="https://images.foody.vn/biz_banner/foody-upload-api-food-biz-201027175017.jpg" />
      <img src="https://images.foody.vn/biz_banner/foody-upload-api-food-biz-201023134322.jpg" />
      <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201026171903.jpg" />
      <img src="https://media.foody.vn/images/beauty-upload-api-675x355-201001154629.jpg" />
    </Slider>
  );
};
