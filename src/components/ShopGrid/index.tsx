import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Obj } from 'interfaces/common';
import styles from './styles.scss';
import ShopCard from 'components/ShopCard';
import { queryShopList } from 'components/actions';
import { State } from 'redux-saga/reducers';

export default () => {
  const dispatch = useDispatch();
  const shopList = useSelector((state: State) => state.shopList);

  const ref = useRef<{ data: Obj[] }>({
    data: [],
  });
  const [, setRedraw] = useState();

  useEffect(() => {
    dispatch(queryShopList());
  }, []);

  useEffect(() => {
    if (shopList && shopList.data) {
      if (typeof shopList?.data === 'object') {
        ref.current.data = (shopList?.data as Obj).results as Obj[];
      }
    }
    setRedraw({});
  }, [shopList]);

  console.log(shopList);
  return (
    <div className={styles.ShopGrid}>
      <div className="main_title">
        <span>
          <em></em>
        </span>
        <h2>Top cửa hàng</h2>
        <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
        <a href="#0">View All →</a>
      </div>
      <div className={'ShopGridSection'}>
        {ref.current.data.length > 0 &&
          ref.current.data.map((shopItem: Obj, index: number) => <ShopCard shopItem={shopItem} key={index} />)}
      </div>
    </div>
  );
};
