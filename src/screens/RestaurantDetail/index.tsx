import { queryShopInfo } from 'components/actions';
import { queryMenuShop2 } from 'components/MenuManage/actions';
import CommentSection, { Comment } from 'components/CommentSection';
import RelativeFood from 'components/RelativeFood';
import RestaurantInfo from 'components/RestaurantInfo';
import TopBar from 'components/TopBar';
import { Obj } from 'interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { queryComment } from 'components/actions';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';
import Marker from 'components/Marker';
import { Tab } from 'semantic-ui-react';

export default () => {
  const { id } = useParams<{ id: string }>();
  const { shopInfo, menu, foodInMenu, comments } = useSelector(
    (state: State) => ({
      shopInfo: state.userShopInfo,
      menu: state.menuListShop,
      foodInMenu: state.foodInMenu,
      comments: state.comment,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const ref = useRef<{ shopInfo?: Obj; menu?: Obj[]; foodInmenu?: Obj[]; comments?: Comment[] }>({});
  const [, redraw] = useState();

  useEffect(() => {
    dispatch(queryShopInfo({ id: id }));
    dispatch(queryMenuShop2({ id: id }));
    requestDataComment();
  }, []);

  useEffect(() => {
    if (shopInfo && shopInfo.data) {
      if (typeof shopInfo?.data === 'object') {
        ref.current.shopInfo = shopInfo?.data as Obj;
      }
    }
    redraw({});
  }, [shopInfo]);

  useEffect(() => {
    if (foodInMenu && foodInMenu.data) {
      if (typeof foodInMenu?.data === 'object') {
        ref.current.foodInmenu = foodInMenu?.data as Obj[];
      }
    }
    redraw({});
  }, [foodInMenu]);

  useEffect(() => {
    if (menu && menu.data) {
      if (typeof menu?.data === 'object') {
        ref.current.menu = (menu?.data as Obj).results as Obj[];
        redraw({});
      }
    }
  }, [menu]);

  useEffect(() => {
    if (comments && comments.data) {
      if (typeof comments?.data === 'object') {
        ref.current.comments = (comments?.data as Obj).results as Comment[];
      }
    }
    redraw({});
  }, [comments]);

  const requestDataComment = () => {
    const params = {
      id: id,
    };
    dispatch(queryComment(params));
  };

  return (
    <div className={styles.RestaurantDetail}>
      <TopBar />
      {ref.current.shopInfo && (
        <div className="Food">
          <RestaurantInfo
            image={ref.current.shopInfo.image_url as string}
            name={ref.current.shopInfo.name as string}
            address={(ref.current.shopInfo.address as String[])[0] as string}
            rate={parseInt(ref.current.shopInfo.rating as string)}
            time={ref.current.shopInfo.time as string}
            price={ref.current.shopInfo.cost as string}
            describe={ref.current.shopInfo.desc as string}
            id_res={id}
          />
        </div>
      )}
      <div className="Content">
        <div className="FoodList">{<RelativeFood id_user={id} id_food={''} foodList={ref.current.menu} />}</div>
      </div>
      <div className={styles.TabMap}>
        <Tab
          panes={[
            {
              menuItem: 'Địa chỉ',
              render: () => (
                <div className={styles.Map}>
                  {ref.current.shopInfo && (
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: 'AIzaSyCDFs3j4amVQv-mejlsdc-vw7-UtLiTL2g' }}
                      defaultCenter={{
                        lat: (ref.current.shopInfo?.address as any[])[1] as number,
                        lng: (ref.current.shopInfo?.address as any[])[2] as number,
                      }}
                      defaultZoom={15}
                    >
                      <Marker
                        lat={(ref.current.shopInfo?.address as any[])[1] as number}
                        lng={(ref.current.shopInfo?.address as any[])[2] as number}
                        text={ref.current.shopInfo?.name as string}
                      />
                    </GoogleMapReact>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
      {ref.current.comments && <CommentSection comments={ref.current.comments} id_food={id} />}
    </div>
  );
};
