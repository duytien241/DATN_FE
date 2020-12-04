import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.scss';
import TopBar from 'components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { queryListCategory, queryListDistrict, queryShopListCategory } from 'components/actions';
import { Accordion, Form, Menu, Dimmer, Loader } from 'semantic-ui-react';
import Footer from 'components/Footer';
import { useParams } from 'react-router';
import { Obj } from 'interfaces/common';
import ShopCard from 'components/ShopCard';
// import { searchRestaurantName } from './actions';

interface RestaurantListProps {
  type: string;
}

export default (props: RestaurantListProps) => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState(false);
  const [activeCategory, setActiveCategory] = useState(false);
  const listCategory = useSelector((state: State) => state.listCategory);
  const listDistrict = useSelector((state: State) => state.listDistrict);
  const shopListCategory = useSelector((state: State) => state.shopListCategory);
  const [, redraw] = useState();

  const ref = useRef<{
    shopListCategory?: Obj[];
    listCategory?: Obj[];
    listDistrict?: Obj[];
    loading: boolean;
  }>({
    shopListCategory: [],
    listCategory: [],
    loading: false,
    listDistrict: [],
  });

  useEffect(() => {
    requestData();
    dispatch(queryListCategory());
    dispatch(queryListDistrict());
  }, []);

  useEffect(() => {
    ref.current.loading = false;
    if (shopListCategory && shopListCategory.data) {
      if (typeof shopListCategory?.data === 'object') {
        ref.current.shopListCategory = shopListCategory.data as Obj[];
      }
    }
    redraw({});
  }, [shopListCategory]);

  useEffect(() => {
    if (listCategory && listCategory.data) {
      if (typeof listCategory?.data === 'object') {
        ref.current.listCategory = listCategory.data as Obj[];
      }
    }
    redraw({});
  }, [listCategory]);

  useEffect(() => {
    if (listDistrict && listDistrict.data) {
      if (typeof listDistrict?.data === 'object') {
        ref.current.listDistrict = listDistrict.data as Obj[];
      }
    }
    redraw({});
  }, [listDistrict]);

  const requestData = (id_choose?: string) => {
    ref.current.loading = true;
    redraw({});
    const id_query = id_choose ? id_choose : id;
    dispatch(queryShopListCategory({ id: id_query }));
  };

  const handleClickSort = (e: any, titleProps: any) => {
    // const { index } = titleProps
    // const { activeIndex } = this.state
    // const newIndex = activeIndex === index ? -1 : index

    setActiveSort((activeSort) => !activeSort);
  };

  const handleClickCategory = (e: any, titleProps: any) => {
    setActiveCategory((activeCategory) => !activeCategory);
  };

  const onClickCategoryForm = (e: any, data: Obj) => {
    requestData(data.value as string);
  };

  const CategoryForm = (
    <Form>
      <Form.Group grouped>
        {ref.current.listCategory &&
          ref.current.listCategory.length > 0 &&
          ref.current.listCategory.map((shopItem: Obj, index: number) => (
            <Form.Checkbox
              onClick={onClickCategoryForm}
              label={shopItem.name}
              name="color"
              value={shopItem.id as string}
            />
          ))}
      </Form.Group>
    </Form>
  );

  const DistrictForm = (
    <Form>
      <Form.Group grouped>
        {ref.current.listDistrict &&
          ref.current.listDistrict.length > 0 &&
          ref.current.listDistrict.map((shopItem: Obj, index: number) => (
            <Form.Checkbox
              onClick={onClickCategoryForm}
              label={shopItem.district}
              name="color"
              value={shopItem.id as string}
            />
          ))}
      </Form.Group>
    </Form>
  );

  console.log(ref.current.shopListCategory);
  return (
    <div className={styles.FoodPage}>
      <TopBar />
      <div className={styles.HeaderPage}>
        <div className={styles.HeaderContainer}>
          <div className={styles.Row}>
            <div className={styles.Left}>
              <h1>Danh sách quán ăn</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.FoodPageContainer}>
        <div className={styles.LeftSide}>
          <Accordion as={Menu} vertical>
            <Menu.Item>
              <Accordion.Title active={activeSort} content="Quận huyện" index={0} onClick={handleClickSort} />
              <Accordion.Content active={activeSort} content={DistrictForm} />
            </Menu.Item>
            <Menu.Item>
              <Accordion.Title active={activeCategory} content="Loại quán" index={1} onClick={handleClickCategory} />
              <Accordion.Content active={activeCategory} content={CategoryForm} />
            </Menu.Item>
          </Accordion>
        </div>
        <div className={styles.ContentSide}>
          <div className={styles.ShopGrid}>
            <div className={'ShopGridSection'}>
              {ref.current.shopListCategory &&
                ref.current.shopListCategory.length > 0 &&
                ref.current.shopListCategory.map((shopItem: Obj, index: number) => (
                  <ShopCard shopItem={shopItem} key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Dimmer active={ref.current.loading}>{ref.current.loading && <Loader active={ref.current.loading} />}</Dimmer>
      <Footer />
    </div>
  );
};
