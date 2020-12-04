import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { Search, SearchResultData } from 'semantic-ui-react';
import { Obj } from 'interfaces/common';
import { BASE_IMAGE_URL } from 'utils/common';
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
  }>({
    foodList: [],
  });

  useEffect(() => {
    // requestData();
  }, []);

  useEffect(() => {
    if (foodListSearch && foodListSearch.data) {
      if (typeof foodListSearch?.data === 'object') {
        ref.current.foodList = (foodListSearch.data as Obj[]).map((foodDetail: Obj) => {
          return {
            id: foodDetail.id,
            title: foodDetail.name,
            description: foodDetail.info,
            image: `${BASE_IMAGE_URL}${foodDetail.image}`,
            price: foodDetail.price,
          };
        });
      }
    }
    redraw({});
  }, [foodListSearch]);

  const handleSearchChange = React.useCallback((_e, data) => {
    dispatch(searchRestaurantName({ name: data.value }));
  }, []);

  const handleResultSelect = (event: React.MouseEvent<HTMLDivElement>, data: SearchResultData) => {
    history.push(`/food/${data.result.id}`);
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
