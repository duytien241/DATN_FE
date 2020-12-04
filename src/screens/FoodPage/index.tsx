import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.scss';
import TopBar from 'components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { queryFoodList, queryFoodListByCategoty } from 'components/actions';
import { Accordion, Card, Form, Menu } from 'semantic-ui-react';
import Footer from 'components/Footer';
import { useParams } from 'react-router';
import { Obj } from 'interfaces/common';
import FoodCard from 'elements/FoodCard';
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
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState(false);
  const [activeCategory, setActiveCategory] = useState(false);
  const foodListCategory = useSelector((state: State) => state.foodListCategory);
  const foodList = useSelector((state: State) => state.foodList);
  const [, redraw] = useState();
  const ref = useRef<{
    foodList?: Obj[];
  }>({
    foodList: [],
  });

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (props.type === 'FOOD') {
      if (foodListCategory && foodListCategory.data) {
        if (typeof foodListCategory?.data === 'object') {
          ref.current.foodList = (foodListCategory.data as Obj).results as Obj[];
        }
      }
      redraw({});
    } else {
      if (foodList && foodList.data) {
        if (typeof foodList?.data === 'object') {
          ref.current.foodList = (foodList.data as Obj).results as Obj[];
        }
      }
      redraw({});
    }
  }, [foodListCategory, foodList]);

  const requestData = () => {
    if (props.type === 'FOOD') {
      dispatch(queryFoodListByCategoty({ type: id }));
    } else {
      dispatch(queryFoodList());
    }
  };

  const handleClickSort = (e: any, titleProps: any) => {
    // const { index } = titleProps
    // const { activeIndex } = this.state
    // const newIndex = activeIndex === index ? -1 : index

    setActiveSort((activeSort) => !activeSort);
  };

  const handleClickCategory = (e: any, titleProps: any) => {
    // const { index } = titleProps
    // const { activeIndex } = this.state
    // const newIndex = activeIndex === index ? -1 : index

    setActiveCategory((activeCategory) => !activeCategory);
  };

  console.log(ref.current.foodList);
  return (
    <div className={styles.FoodPage}>
      <TopBar />
      <div className={styles.HeaderPage}>
        <div className={styles.HeaderContainer}>
          <div className={styles.Row}>
            <div className={styles.Left}>
              <h1>Danh sách món ăn</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.FoodPageContainer}>
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
        <div className={styles.ContentSide}>
          <Card.Group>
            {(ref.current.foodList as Obj[])?.map((foodItem: Obj, index: number) => (
              <FoodCard foodItem={foodItem} key={index} />
            ))}
          </Card.Group>
        </div>
      </div>
      <Footer />
    </div>
  );
};
