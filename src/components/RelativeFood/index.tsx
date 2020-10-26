import { orderFood, queryFoodList } from 'components/actions';
import OrderFood from 'components/OrderFood';
import SectionHeader from 'elements/SectionHeader';
import { Obj } from 'interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { Icon } from 'semantic-ui-react';
import { formatNumber } from 'utils/common';
import styles from './styles.scss';

interface FoodItemProps {
  image: string;
  name: string;
  price: string | number;
  order: number;
  like: number;
  onOrder?: () => void;
}

interface RelativeFoodProps {
  id_food?: string;
  foodList?: Obj[];
  showHeader?: boolean;
}

const FoodItem = (props: FoodItemProps) => {
  return (
    <div className={styles.FoodItem}>
      <div className={styles.Image}>
        <img src={`https://drive.google.com/uc?export=view&id=${props.image}`} alt={props.name} />
      </div>
      <div className={styles.Info}>
        <div className={styles.General}>
          <div className={styles.Name}>{props.name}</div>
          <div className="Detail">
            <div>
              {`Đã được đặt `}
              <span>{props.order}+</span>
              {` lần`}
            </div>
            <div>
              <Icon name="thumbs up" /> <span>{props.like}</span>
            </div>
          </div>
        </div>
        <div className={styles.PriceAndOrder}>
          <span className={styles.Price}>
            {props.price}
            <sup>đ</sup>
          </span>
          <span onClick={props.onOrder}>
            <Icon name="add square" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default (props: RelativeFoodProps) => {
  const dispatch = useDispatch();
  const foodList = props.foodList ? props.foodList : useSelector((state: State) => state.foodList?.data as Obj[]);
  const [, redraw] = useState();
  const ref = useRef<{ foodList?: Obj[] }>({});

  useEffect(() => {
    if (props.foodList == null) {
      dispatch(queryFoodList());
    }
  }, []);

  useEffect(() => {
    if (foodList) {
      if (foodList.length > 1) {
        ref.current.foodList = foodList;
        redraw({});
      }
    }
  }, [foodList]);

  const onOrder = (name: string, price: number, image: string, id_food: number | string) => {
    console.log({ name, price, image, id_food });
    dispatch(orderFood({ name, price, image, id_food }));
  };

  return (
    <div className={styles.RelativeFood}>
      {props.showHeader && <SectionHeader title="CÁC MÓN ĂN LIÊN QUAN" />}
      <div className={styles.FoodsAndOrder}>
        <div className={styles.Foods}>
          {ref.current.foodList &&
            ref.current.foodList.map((food) => {
              if (food.id_food != props.id_food) {
                return (
                  <FoodItem
                    image={food.image as string}
                    name={food.name as string}
                    price={formatNumber(food.price as number)}
                    order={Math.floor(Math.random() * 500)}
                    like={Math.floor(Math.random() * 100)}
                    onOrder={() => {
                      onOrder(food.name as string, food.price as number, food.image as string, food.id_food as number);
                    }}
                  />
                );
              } else {
                return null;
              }
            })}
        </div>
        <OrderFood />
      </div>
    </div>
  );
};
