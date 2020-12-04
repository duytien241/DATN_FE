import React, { useEffect, useRef, useState } from 'react';
import Cookie from 'js-cookie';
import restaurantImage from 'assets/defaultFood.png';
import { Icon, Rating, RatingProps } from 'semantic-ui-react';
import styles from './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import { rating, queryRating } from 'components/actions';

interface FoodInfoProps {
  image: string;
  name: string;
  address: string;
  rate: number;
  time?: string;
  price?: string | number;
  describe?: string;
  id_res: string;
}

export default (props: FoodInfoProps) => {
  const dispatch = useDispatch();
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null;
  const ratingValue = useSelector((state: State) => state.rating);
  const ratingResult = useSelector((state: State) => state.ratingResult);
  const [, setRedraw] = useState();
  const foodInfoRef = useRef<{
    rating: number;
  }>({
    rating: 0,
  });

  useEffect(() => {
    requestDataRating();
  }, []);

  useEffect(() => {
    if (ratingResult && ratingResult.data) {
      requestDataRating();
    }
  }, [ratingResult]);

  useEffect(() => {
    if (ratingValue && ratingValue.data) {
      console.log(ratingValue.data);

      foodInfoRef.current.rating = (ratingValue?.data as Obj[])[0].value as number;
    }
    setRedraw({});
  }, [ratingValue]);

  const requestDataRating = () => {
    const params = {
      id_user: props.id_res,
    };

    dispatch(queryRating(params));
  };
  const onChangeRate = (event: React.MouseEvent<HTMLDivElement>, data: RatingProps) => {
    const params = {
      ratingLevel: data.rating,
      id_user: props.id_res,
      id_cus: userLogin.id,
    };
    dispatch(rating(params));
  };

  return (
    <div className={styles.RestaurantInfo}>
      <div className={styles.FoodContent}>
        <div className={styles.Image}>
          {props.image ? (
            <img src={props.image} alt={props.name} />
          ) : (
            <img src={restaurantImage} alt="restaurantImage" />
          )}
        </div>
        <div className={styles.Info}>
          <h3>{props.name}</h3>
          <p>{props.address}</p>
          <div className={'Rate'}>
            <Rating
              icon="star"
              disabled={userLogin == null}
              defaultRating={Math.ceil(props.rate / 2)}
              maxRating={5}
              onRate={onChangeRate}
            />
            <div>
              <span>999+</span> <span>lượt đánh giá từ TM FOOD</span>
            </div>
          </div>
          <div className={styles.OpenTime}>
            <Icon name="dot circle" />
            <span>{'Giờ mở cửa: '}</span>
            <span>{props.time}</span>
          </div>
          <div className={styles.Price}>
            {`Giá: ${props.price as number}`}
            <sup>đ</sup>
          </div>
          <div className={styles.Describe}>
            <span>{props.describe}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
