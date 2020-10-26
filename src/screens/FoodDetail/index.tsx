import { queryFoodList } from 'components/actions';
import CommentSection from 'components/CommentSection';
import FoodInfo from 'components/FoodInfo';
import RelativeFood from 'components/RelativeFood';
import TopBar from 'components/TopBar';
import { Obj } from 'interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';

export default () => {
  const { id } = useParams<{ id: string }>();
  const { foodList, comments } = useSelector(
    (state: State) => ({
      foodList: state.foodList?.data as Obj[],
      comments: state.comment,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const ref = useRef<{ foodInfo?: Obj }>({});
  const [, redraw] = useState();

  useEffect(() => {
    dispatch(queryFoodList({ id: id }));
  }, []);

  useEffect(() => {
    if (foodList) {
      if (foodList.length === 1) {
        ref.current.foodInfo = foodList[0];
        redraw({});
      }
    }
  }, [foodList]);

  return (
    <div className={styles.FoodDetail}>
      <TopBar />
      {ref.current.foodInfo && (
        <div className="Food">
          <FoodInfo
            image={ref.current.foodInfo.image as string}
            name={ref.current.foodInfo.name as string}
            address={ref.current.foodInfo.Address_R as string}
            rate={Math.random() * 5}
            open="00:00"
            close="23:59"
            price={ref.current.foodInfo.price as number}
            describe={ref.current.foodInfo.info as string}
            id_food={id}
          />
          <RelativeFood id_food={id} showHeader={true} />
          {comments && <CommentSection comments={comments} />}
        </div>
      )}
    </div>
  );
};
