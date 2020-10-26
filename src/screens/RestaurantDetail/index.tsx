import { queryFoodList, queryShopInfo } from 'components/actions';
import { queryMenuShop, queryFoodInMenu } from 'components/MenuManage/actions';
import RelativeFood from 'components/RelativeFood';
import RestaurantInfo from 'components/RestaurantInfo';
import TopBar from 'components/TopBar';
import { Obj } from 'interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { State } from 'redux-saga/reducers';
import { Menu, Sidebar, Tab, TabProps } from 'semantic-ui-react';
import styles from './styles.scss';

export default () => {
  const { id } = useParams<{ id: string }>();
  const { shopInfo, menu, foodInMenu, foodList } = useSelector(
    (state: State) => ({
      shopInfo: state.userShopInfo,
      menu: state.menuList,
      foodInMenu: state.foodInMenu,
      foodList: state.foodList,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const ref = useRef<{ shopInfo?: Obj; menu?: Obj[]; foodInmenu?: Obj[]; foodList?: Obj[] }>({});
  const [, redraw] = useState();

  useEffect(() => {
    dispatch(queryShopInfo({ id_user: id }));
    dispatch(queryMenuShop({ id_user: id }));
    dispatch(queryFoodInMenu({ id_user: id, id_menu: 1 }));
  }, []);

  useEffect(() => {
    if (shopInfo) {
      ref.current.shopInfo = (shopInfo.data as Obj[])[0] as Obj;
      ref.current.menu = menu?.data as Obj[];
      ref.current.foodInmenu = foodInMenu?.data as Obj[];
      ref.current.foodList = foodList?.data as Obj[];
      redraw({});
    }
  }, [shopInfo, menu, foodInMenu, foodList]);

  useEffect(() => {
    console.log(foodInMenu);
  }, [foodInMenu]);

  const panes = [
    {
      menuItem: 'Menu',
      render: () => (
        <Tab.Pane>
          <div className="Menu">
            <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible width="thin">
              {ref.current.menu &&
                ref.current.menu.map((item) => {
                  return (
                    <Menu.Item
                      as="a"
                      onClick={() => {
                        dispatch(queryFoodInMenu({ id_user: id, id_menu: item.id }));
                      }}
                    >
                      {item.name as string}
                    </Menu.Item>
                  );
                })}
            </Sidebar>
            {ref.current.foodInmenu && <RelativeFood id_food={''} foodList={ref.current.foodInmenu} />}
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Food list',
      render: () => (
        <Tab.Pane>
          <div className="FoodList">
            {ref.current.foodList && <RelativeFood id_food={''} foodList={ref.current.foodList} />}
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className={styles.RestaurantDetail}>
      <TopBar />
      {ref.current.shopInfo && (
        <div className="Food">
          <RestaurantInfo
            image={ref.current.shopInfo.image as string}
            name={ref.current.shopInfo.NameR as string}
            address={ref.current.shopInfo.Address_R as string}
            rate={parseInt(ref.current.shopInfo.avg_rating as string)}
            open="00:00"
            close="23:59"
            price={60000}
            describe={ref.current.shopInfo.desc as string}
            id_food={id}
          />
        </div>
      )}
      <div className="Content">
        <Tab
          panes={panes}
          onTabChange={(event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: TabProps) => {
            console.log(data.activeIndex);
            if (data.activeIndex === 0) {
              dispatch(queryFoodInMenu({ id_user: id, id_menu: 1 }));
            } else {
              dispatch(queryFoodList({ id_user: id }));
            }
          }}
        />
      </div>
    </div>
  );
};
