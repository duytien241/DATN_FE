import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.scss';
import TopBar from 'components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { queryFoodList, queryFoodListByCategoty, queryFoodType } from 'components/actions';
import { Accordion, Card, CheckboxProps, Form, Input, Menu } from 'semantic-ui-react';
import Footer from 'components/Footer';
import { useParams } from 'react-router';
import { Obj } from 'interfaces/common';
import FoodCard from 'elements/FoodCard';
import { getFoodType } from 'components/reducers';

interface RestaurantListProps {
  type: string;
}

export default (props: RestaurantListProps) => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState(true);
  const [foodName, setFoodName] = useState(null);
  const [sortType, setSortType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [category, setCategory] = useState(undefined);
  const [activeCategory, setActiveCategory] = useState(true);
  const foodListCategory = useSelector((state: State) => state.foodListCategory);
  const foodList = useSelector((state: State) => state.foodList);
  const foodType = useSelector(getFoodType);

  const [, redraw] = useState();
  const ref = useRef<{
    foodList?: Obj[];
    cateList?: Obj[];
  }>({
    foodList: [],
    cateList: [],
  });

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (props.type === 'FOOD') {
      if (foodListCategory && foodListCategory.data) {
        if (typeof foodListCategory?.data === 'object') {
          ref.current.foodList = foodListCategory.data as Obj[];
        }
      }
      redraw({});
    } else {
      if (foodList && foodList.data) {
        if (typeof foodList?.data === 'object') {
          ref.current.foodList = foodList.data as Obj[];
        }
      }
      if (foodType && foodType.length > 0) {
        ref.current.cateList = foodType as Obj[];
      }
      redraw({});
    }
  }, [foodListCategory, foodList, foodType]);

  useEffect(() => {
    dispatch(queryFoodList({ name: foodName, sortBy: sortBy, sortType: sortType, type: category }));
  }, [foodName, sortBy, sortType, category]);

  const requestData = () => {
    if (props.type === 'FOOD') {
      dispatch(queryFoodListByCategoty({ type: id }));
    } else {
      dispatch(
        queryFoodList({
          name: foodName,
        })
      );
      dispatch(queryFoodType());
    }
  };

  const handleClickSort = (e: any, titleProps: any) => {
    setActiveSort((activeSort) => !activeSort);
  };

  const handleClickCategory = (e: any, titleProps: any) => {
    setActiveCategory((activeCategory) => !activeCategory);
  };

  const handleSearchChange = React.useCallback((_e, data) => {
    setFoodName(data.value);
  }, []);

  const onSetCate = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    console.log(data.value);

    setCategory(data.value as any);
  };

  return (
    <div className={styles.FoodPage}>
      <TopBar />
      <div className={styles.HeaderPage}>
        <div className={styles.HeaderContainer}>
          <div className={styles.Row}>
            <div className={styles.Left}>
              <h1>Danh sách món ăn</h1>
            </div>
            {props.type !== 'FOOD' && <Input icon="search" placeholder="Search..." onChange={handleSearchChange} />}
          </div>
        </div>
      </div>
      <div className={styles.FoodPageContainer}>
        {props.type !== 'FOOD' && (
          <div className={styles.LeftSide}>
            <Accordion as={Menu} vertical>
              <Menu.Item>
                <Accordion.Title active={activeSort} content="Sắp xếp" index={0} onClick={handleClickSort} />
                <Accordion.Content
                  active={activeSort}
                  content={
                    <Form>
                      <Form.Group grouped>
                        <Form.Radio
                          label="Mặc định"
                          checked={sortType === ''}
                          name="default"
                          type="radio"
                          value=""
                          onChange={() => {
                            setSortType('');
                            setSortBy('');
                          }}
                        />
                        {/* <Form.Radio label="Xếp hạng cao nhất" name="top rate" type="radio" value="top rate" /> */}
                        <Form.Radio
                          label="Giá: từ thấp đến cao"
                          name="low to high"
                          type="radio"
                          value="low to high"
                          checked={sortType === 'ASC'}
                          onChange={() => {
                            setSortType('ASC');
                            setSortBy('price');
                          }}
                        />
                        <Form.Radio
                          label="Giá: từ cao đến thấp"
                          name="high to low"
                          type="radio"
                          value="high to low"
                          checked={sortType === 'DESC'}
                          onChange={() => {
                            setSortType('DESC');
                            setSortBy('price');
                          }}
                        />
                        {/* <Form.Radio label="Đề xuất" name="Reccomended" type="radio" value="Reccomended" /> */}
                      </Form.Group>
                    </Form>
                  }
                />
              </Menu.Item>
              <Menu.Item>
                <Accordion.Title active={activeCategory} content="Danh mục" index={1} onClick={handleClickCategory} />
                <Accordion.Content
                  active={activeCategory}
                  content={
                    <Form>
                      <Form.Group grouped>
                        {ref.current.cateList?.map((cate, index) => {
                          return (
                            <Form.Radio
                              label={cate.text}
                              name={cate.text as string}
                              checked={category === cate.value}
                              value={cate.value as string}
                              onChange={onSetCate}
                            />
                          );
                        })}
                      </Form.Group>
                    </Form>
                  }
                />
              </Menu.Item>
            </Accordion>
          </div>
        )}
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
