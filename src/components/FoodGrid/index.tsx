import React from 'react';
import { useSelector } from 'react-redux';
import FoodCard from 'elements/FoodCard';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import styles from './styles.scss';
import { Card } from 'semantic-ui-react';

export default () => {
  const foodList = useSelector((state: State) => state.foodList);

  return (
    <div className={styles.FoodGrid}>
      <Card.Group>
        {((foodList as Obj)?.data as Obj[])?.map((foodItem: Obj, index: number) => (
          <FoodCard foodItem={foodItem} key={index} />
        ))}
      </Card.Group>
    </div>
  );
};
