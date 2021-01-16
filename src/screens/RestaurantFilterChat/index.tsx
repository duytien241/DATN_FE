import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.scss';
import TopBar from 'components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { queryListCategory, queryListDistrict, queryResultFilter } from 'components/actions';
import { Dimmer, Loader } from 'semantic-ui-react';
import Footer from 'components/Footer';
import { Obj } from 'interfaces/common';
import ShopCard from 'components/ShopCard';
import ReactPaginate from 'react-paginate';
// import { searchRestaurantName } from './actions';

interface RestaurantListProps {
  type: string;
}

export default (props: RestaurantListProps) => {
  const dispatch = useDispatch();
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
        ref.current.shopListCategory = (shopListCategory.data as Obj)?.results as Obj[];
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

  const requestData = (id_choose?: string, page?: number) => {
    ref.current.loading = true;
    redraw({});
    dispatch(
      queryResultFilter({
        list_id: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        page: page ? page : 1,
      })
    );
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    requestData(undefined, selectedItem.selected + 1);
  };

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
        <div className={styles.ContentSide}>
          <div className={styles.ShopGrid}>
            <div className={'ShopGridSection'}>
              {ref.current.shopListCategory &&
                ref.current.shopListCategory.length > 0 &&
                ref.current.shopListCategory.map((shopItem: Obj, index: number) => (
                  <ShopCard shopItem={shopItem} key={index} />
                ))}
            </div>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(((shopListCategory?.data as Obj)?.count as number) / 40)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              // subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </div>
      <Dimmer active={ref.current.loading}>{ref.current.loading && <Loader active={ref.current.loading} />}</Dimmer>
      <Footer />
    </div>
  );
};
