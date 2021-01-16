import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { Search, SearchResultData } from 'semantic-ui-react';
import { Obj } from 'interfaces/common';
import { searchRestaurantName } from 'screens/RestaurantList/actions';
import styles from './styles.scss';

interface RestaurantListProps {}

export default (props: RestaurantListProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const foodListSearch = useSelector((state: State) => state.foodListSearch);
  const [, redraw] = useState();

  const ref = useRef<{
    foodList?: Obj[];
    onLoading?: boolean;
  }>({
    foodList: [],
    onLoading: false,
  });

  useEffect(() => {
    // requestData();
  }, []);

  useEffect(() => {
    if (foodListSearch && foodListSearch.data) {
      ref.current.onLoading = false;
      console.log(foodListSearch);
      if (typeof foodListSearch?.data === 'object') {
        ref.current.foodList = (foodListSearch.data as Obj[]).map((foodDetail: Obj) => {
          return {
            id: foodDetail.id,
            title: foodDetail.name,
            description: foodDetail.info,
            image: `${foodDetail.image_url}`,
            price: foodDetail.price,
          };
        });
      }
    }
    redraw({});
  }, [foodListSearch]);

  const handleSearchChange = React.useCallback((_e, data) => {
    if ((data.value as string).length > 4) {
      if (ref.current.onLoading === false) {
        dispatch(searchRestaurantName({ name: data.value }));
      }
      ref.current.onLoading = true;
    }
  }, []);

  const handleResultSelect = (event: React.MouseEvent<HTMLDivElement>, data: SearchResultData) => {
    history.push(`/shop/${data.result.id}`);
  };

  return (
    <div className={styles.SearchFood}>
      <Search
        // loading={isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        results={ref.current.foodList}
        // value={value}
      />
    </div>
  );
};
