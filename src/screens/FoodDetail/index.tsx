import { queryFoodDetail } from 'components/actions';
import CommentSection, { Comment } from 'components/CommentSection';
import FoodInfo from 'components/FoodInfo';
import RelativeFood from 'components/RelativeFood';
import TopBar from 'components/TopBar';
import { Obj } from 'interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { queryComment } from 'components/actions';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';

export default () => {
  const { id } = useParams<{ id: string }>();
  const foodDetailRef = useRef<{
    data: Comment[];
    foodInfo?: Obj;
  }>({
    data: [],
  });
  const { foodDetail, comments } = useSelector(
    (state: State) => ({
      foodDetail: state.foodDetail,
      comments: state.comment,
    }),
    shallowEqual
  );
  const commentResult = useSelector((state: State) => state.commentResult);
  const dispatch = useDispatch();
  const ref = useRef<{ foodInfo?: Obj }>({});
  const [, redraw] = useState();

  useEffect(() => {
    requestData();
    requestDataComment();
  }, []);

  useEffect(() => {
    if (foodDetail && foodDetail.data) {
      if (typeof foodDetail?.data === 'object') {
        ref.current.foodInfo = (foodDetail.data as Obj[])[0];
      }
    }
    redraw({});
  }, [foodDetail]);

  useEffect(() => {
    if (commentResult && commentResult.data) {
      requestDataComment();
    }
  }, [commentResult]);

  useEffect(() => {
    if (comments && comments.data) {
      if (typeof comments?.data === 'object') {
        foodDetailRef.current.data = comments?.data as Comment[];
      }
    }
    redraw({});
  }, [comments]);

  const requestData = () => {
    const params = {
      id: id,
    };
    dispatch(queryFoodDetail(params));
  };

  const requestDataComment = () => {
    const params = {
      id_food: id,
    };
    dispatch(queryComment(params));
  };

  return (
    <div className={styles.FoodDetail}>
      <TopBar />
      {ref.current.foodInfo && (
        <div className="FoodContainer">
          <FoodInfo
            image={ref.current.foodInfo.image as string}
            name={ref.current.foodInfo.name as string}
            address={ref.current.foodInfo.Address_R as string}
            open="00:00"
            close="23:59"
            price={ref.current.foodInfo.price as number}
            describe={ref.current.foodInfo.info as string}
            id_food={id}
            id_user={ref.current.foodInfo.id_user}
          />
          <RelativeFood id_food={id} showHeader={true} id_user={ref.current.foodInfo.id_user} />
          {foodDetailRef.current.data && <CommentSection comments={foodDetailRef.current.data} id_food={id} />}
        </div>
      )}
    </div>
  );
};
