import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.scss';
import { useHistory } from 'react-router-dom';
import TopBar from 'components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { Accordion, Form, Menu, Search, SearchResultData } from 'semantic-ui-react';
import Footer from 'components/Footer';
import { searchRestaurantName } from './actions';
import { Obj } from 'interfaces/common';
import { BASE_IMAGE_URL } from 'utils/common';
// import { searchRestaurantName } from './actions';

const ColorForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label="Red" name="color" value="red" />
      <Form.Checkbox label="Orange" name="color" value="orange" />
      <Form.Checkbox label="Green" name="color" value="green" />
      <Form.Checkbox label="Blue" name="color" value="blue" />
    </Form.Group>
  </Form>
);

const SizeForm = (
  <Form>
    <Form.Group grouped>
      <Form.Radio label="Small" name="size" type="radio" value="small" />
      <Form.Radio label="Medium" name="size" type="radio" value="medium" />
      <Form.Radio label="Large" name="size" type="radio" value="large" />
      <Form.Radio label="X-Large" name="size" type="radio" value="x-large" />
    </Form.Group>
  </Form>
);

interface RestaurantListProps {
  type: string;
}

export default (props: RestaurantListProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState(false);
  const [activeCategory, setActiveCategory] = useState(false);
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

  // const requestData = () => {
  //   dispatch(queryShopList());
  // };

  const handleClickSort = (e: any, titleProps: any) => {
    // const { index } = titleProps
    // const { activeIndex } = this.state
    // const newIndex = activeIndex === index ? -1 : index

    setActiveSort((activeSort) => !activeSort);
  };

  // const searchData = (event: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchProps) => {
  //   console.log(data.value);
  // }

  const handleClickCategory = (e: any, titleProps: any) => {
    // const { index } = titleProps
    // const { activeIndex } = this.state
    // const newIndex = activeIndex === index ? -1 : index

    setActiveCategory((activeCategory) => !activeCategory);
  };

  return (
    <div className={styles.RestauranyList}>
      <TopBar />
      <div className={styles.HeaderPage}>
        <div className={styles.HeaderContainer}>
          <div className={styles.Row}>
            <div className={styles.Left}>
              <h1>145 restaurants in Convent Street 2983</h1>
              <Search
                // loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={handleSearchChange}
                results={ref.current.foodList}
                // value={value}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.RestaurantListContainer}>
        <div className={styles.LeftSide}>
          <Accordion as={Menu} vertical>
            <Menu.Item>
              <Accordion.Title active={activeSort} content="Size" index={0} onClick={handleClickSort} />
              <Accordion.Content active={activeSort} content={SizeForm} />
            </Menu.Item>
            <Menu.Item>
              <Accordion.Title active={activeCategory} content="Colors" index={1} onClick={handleClickCategory} />
              <Accordion.Content active={activeCategory} content={ColorForm} />
            </Menu.Item>
          </Accordion>
        </div>
        <div className={styles.ContentSide}></div>
      </div>
      <Footer />
    </div>
  );
};
