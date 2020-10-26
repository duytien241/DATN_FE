import { orderFood } from 'components/actions';
import React from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

  const onOrder = (name: string, price: number, image: string, id_food: number | string) => {
    dispatch(orderFood({ name, price, image, id_food }));
  };

  return (
    <div className={styles.FoodInfo}>
      <div className={styles.FoodContent}>
        <div className={styles.Image}>
          <img src={`https://drive.google.com/uc?export=view&id=${props.image}`} alt={props.name} />
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
          <button
            className={styles.Add}
            onClick={() => onOrder(props.name, props.price as number, props.image, props.id_food)}
          >
            Thêm món này!
          </button>
        </div>
      </div>
    </div>
  );
};
