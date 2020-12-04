import { orderFood } from 'components/actions';
import OrderFood from 'components/OrderFood';
import SectionHeader from 'elements/SectionHeader';
import { Obj } from 'interfaces/common';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { formatNumber } from 'utils/common';
import foodLogo from '../../assets/defaultFood.png';
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
  id_user?: any;
  foodList?: Obj[];
  showHeader?: boolean;
  type?: string;
}

const FoodItem = (props: FoodItemProps) => {
  return (
    <div className={styles.FoodItem}>
      <div className={styles.Image}>
        <img src={props.image.length > 0 ? props.image : foodLogo} alt={props.name} />
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
  const [, redraw] = useState();
  // useEffect(() => {
  //   if (props.type === 'SHOP') {
  //     if (props.id_user) {
  //       const params = {
  //         id_user: props.id_user,
  //       };
  //       console.log(params);

  //       dispatch(queryFoodList(params));
  //     }
  //   } else {
  //     dispatch(queryFoodList());
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(foodList);
  //   if (foodList) {
  //     ref.current.foodList = foodList;
  //     redraw({});
  //   }
  // }, [foodList]);

  const onOrder = (name: string, price: number, image: string, id_food: number | string) => {
    console.log({ name, price, image, id_food });
    dispatch(orderFood({ name, price, image, id_food }));
    redraw({});
  };

  return (
    <div className={styles.RelativeFood}>
      {props.showHeader && <SectionHeader title="CÁC MÓN ĂN LIÊN QUAN" />}
      <div className={styles.FoodsAndOrder}>
        <div className={styles.Foods}>
          {props.foodList &&
            props.foodList.map((food) => {
              return (
                <FoodItem
                  image={food.image_url as string}
                  name={food.name as string}
                  price={formatNumber(parseInt((food.price as String).replace('đ', '').replace(',', '')) as number)}
                  order={Math.floor(Math.random() * 500)}
                  like={Math.floor(Math.random() * 100)}
                  onOrder={() => {
                    onOrder(food.name as string, food.price as number, food.image_url as string, food.id as number);
                  }}
                />
              );
            })}
        </div>
        <OrderFood id_user={props.id_user} />
      </div>
    </div>
  );
};
