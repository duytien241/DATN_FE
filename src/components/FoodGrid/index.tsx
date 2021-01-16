import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoodCard from 'elements/FoodCard';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import styles from './styles.scss';
import { Card } from 'semantic-ui-react';
import { queryFoodList } from 'components/actions';
import { Link } from 'react-router-dom';

interface FoodGridProps {
  limit?: number;
}

export default (props: FoodGridProps) => {
  const { limit } = props;
  const dispatch = useDispatch();

  const foodList = useSelector((state: State) => state.foodList);
  const ref = useRef<{ foodList: Obj[] }>({
    foodList: [],
  });
  const [, setRedraw] = useState();

  useEffect(() => {
    dispatch(queryFoodList());
  }, []);

  useEffect(() => {
    if (foodList && foodList.data) {
      if (typeof foodList?.data === 'object') {
        ref.current.foodList = (foodList.data as Obj).results as Obj[];
      }
    }
    console.log(ref.current.foodList);
    setRedraw({});
  }, [foodList]);

  return (
    <div className={styles.FoodGrid}>
      <div className="main_title">
        <span>
          <em></em>
        </span>
        <h2>Món ăn</h2>
        <p>Những món ăn được nhiều người đặt.</p>
        <Link to="/food_list">Xem tất cả →</Link>
      </div>
      <Card.Group>
        {ref.current.foodList?.slice(0, limit).map((foodItem: Obj, index: number) => (
          <FoodCard foodItem={foodItem} key={index} />
        ))}
      </Card.Group>
    </div>
  );
};
