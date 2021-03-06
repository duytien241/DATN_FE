import CategoryCard from 'components/CategoryCard';
import { Obj } from 'interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { queryListCategory } from 'components/actions';
import { State } from 'redux-saga/reducers';

export default () => {
  const dispatch = useDispatch();
  const listCategory = useSelector((state: State) => state.listCategory);

  const ref = useRef<{ data: Obj[] }>({
    data: [],
  });

  const [, setRedraw] = useState();

  useEffect(() => {
    dispatch(queryListCategory());
  }, []);

  useEffect(() => {
    console.log(listCategory);
    if (listCategory && listCategory.data) {
      if (typeof listCategory?.data === 'object') {
        ref.current.data = listCategory?.data as Obj[];
      }
    }
    setRedraw({});
  }, [listCategory]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    className: 'center',
  };
  return (
    <div className="CategoryGrid margin_30_60">
      <div className="main_title center">
        <span>
          <em />
        </span>
        <h2>Danh mục</h2>
        <p>Danh mục các món ăn được yêu thích</p>
      </div>
      <Slider {...settings}>
        {ref.current.data.map((item: Obj) => {
          return <CategoryCard categoryItem={item} />;
        })}
      </Slider>
    </div>
  );
};
