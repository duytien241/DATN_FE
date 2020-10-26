import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { HashRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import Cookie from 'js-cookie';
import Home from 'screens/Home';
import DashboardCus from 'screens/DashboardCus';
import Fallback from 'components/Fallback';
import UpdateUser from 'screens/UpdateUser';
import LoginAdmin from 'screens/LoginAdmin';
import DashboardAdmin from 'screens/DashboardAdmin';
import DashboardShop from 'screens/DashboardShop';
import { handleError, USER_ROLE } from 'utils/common';
import { State } from 'redux-saga/reducers';
import FoodDetail from 'screens/FoodDetail';
import { queryFoodList, queryFoodType, queryLocation, queryShopList, queryShopType } from 'components/actions';
import { Obj } from 'interfaces/common';
import ShopDetail from 'screens/RestaurantDetail';

const Router = React.memo(() => {
  const dispatch = useDispatch();
  const ref = useRef<{ shopList: Obj[]; foodList: Obj[] }>({
    shopList: [],
    foodList: [],
  });
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null;
  const foodList = useSelector((state: State) => state.foodList);
  const shopList = useSelector((state: State) => state.shopList);
  const userLogin1 = useSelector((state: State) => state.userLogin);
  const router = useSelector((state: State) => state.router);
  const [, setRedraw] = useState();

  useEffect(() => {
    dispatch(queryShopList());
    dispatch(queryLocation());
    dispatch(queryFoodList());
    dispatch(queryShopType());
    dispatch(queryFoodType());
  }, []);

  useEffect(() => {
    setRedraw({});
  }, [userLogin1]);

  useEffect(() => {
    if (shopList && shopList.data) {
      if (typeof shopList?.data === 'object') {
        ref.current.shopList = shopList.data as Obj[];
      }
    }
    setRedraw({});
  }, [shopList]);

  useEffect(() => {
    if (foodList && foodList.data) {
      if (typeof foodList?.data === 'object') {
        ref.current.foodList = foodList.data as Obj[];
      }
    }
    setRedraw({});
  }, [foodList]);

  useEffect(() => {}, [router]);

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              userLogin && userLogin.Role === USER_ROLE.ADMIN ? (
                <Redirect to="/admin_dashboard" />
              ) : (
                <Home shopList={ref.current.shopList as Obj[]} foodList={ref.current.foodList} />
              )
            }
          />
          <Route
            path="/home"
            render={() =>
              userLogin && userLogin.Role === USER_ROLE.ADMIN ? (
                <Redirect to="/admin_dashboard" />
              ) : (
                <Home shopList={ref.current.shopList as Obj[]} foodList={ref.current.foodList} />
              )
            }
          />
          <Route
            path="/manage_shop"
            render={() =>
              userLogin && userLogin.Role === USER_ROLE.OWNER_SHOP ? <DashboardShop /> : <Redirect to="/" />
            }
          />
          <Route
            path="/manage_shop"
            render={() =>
              userLogin && userLogin.Role === USER_ROLE.OWNER_SHOP ? <DashboardShop /> : <Redirect to="/" />
            }
          />
          <Route
            path="/update_account"
            render={() =>
              userLogin && userLogin.Role === USER_ROLE.OWNER_SHOP ? (
                <UpdateUser />
              ) : userLogin && userLogin.Role === USER_ROLE.CLIENT ? (
                <DashboardCus />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/food/:id" render={() => <FoodDetail />} />
          <Route path="/shop/:id" render={() => <ShopDetail />} />
          <Route path="/login_admin" render={() => <LoginAdmin />} />
          <Route
            path="/admin_dashboard"
            render={() => (userLogin && userLogin.Role === USER_ROLE.ADMIN ? <DashboardAdmin /> : <Redirect to="/" />)}
          />
        </Switch>
      </HashRouter>
    </ErrorBoundary>
  );
});

export default Router;
