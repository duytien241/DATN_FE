import React from 'react';
import restaurantImage from 'assets/defaultFood.png';
import { Icon, Rating } from 'semantic-ui-react';
import { formatNumber } from 'utils/common';
import styles from './styles.scss';

interface FoodInfoProps {
  image: string;
  name: string;
  address: string;
  rate: number;
  open?: string;
  close?: string;
  price?: string | number;
  describe?: string;
  id_food: string;
}

export default (props: FoodInfoProps) => {
  return (
    <div className={styles.RestaurantInfo}>
      <div className={styles.FoodContent}>
        <div className={styles.Image}>
          {props.image ? (
            <img src={`https://drive.google.com/uc?export=view&id=${props.image}`} alt={props.name} />
          ) : (
            <img src={restaurantImage} alt="restaurantImage" />
          )}
        </div>
        <div className={styles.Info}>
          <h3>{props.name}</h3>
          <p>{props.address}</p>
          <div className={'Rate'}>
            <Rating icon="star" defaultRating={Math.ceil(props.rate)} maxRating={5} />
            <div>
              <span>999+</span> <span>lượt đánh giá từ TM FOOD</span>
            </div>
          </div>
          <div className={styles.OpenTime}>
            <Icon name="dot circle" />
            <span>{'Giờ mở cửa: '}</span>
            <span>
              {props.open}-{props.close}
            </span>
          </div>
          <div className={styles.Price}>
            {`Giá: ${formatNumber(props.price as number)}`}
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
