import React, { useEffect, useState } from 'react';
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
import { queryFoodType, queryLocation, queryShopType, queryInfoAccount } from 'components/actions';
import ShopDetail from 'screens/RestaurantDetail';
import RestaurantList from 'screens/RestaurantList';
// import FoodPage from 'screens/FoodPage';
import 'styles.scss';
import { initSocket } from './actions';
import RestaurantFilter from 'screens/RestaurantFilter';

const Router = React.memo(() => {
  const dispatch = useDispatch();
  console.log(Cookie.get('userInfo'));
  const router = useSelector((state: State) => state.router);
  const infoAccount = useSelector((state: State) => state.infoAccount);
  const [, setRedraw] = useState();

  useEffect(() => {
    dispatch(queryLocation());
    dispatch(queryShopType());
    dispatch(queryFoodType());
    dispatch(initSocket());
    if (Cookie.get('userInfo')) {
      dispatch(queryInfoAccount());
    }
  }, []);

  useEffect(() => {
    setRedraw({});
  }, [infoAccount]);

  useEffect(() => {}, [router]);

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              infoAccount && infoAccount.role === USER_ROLE.ADMIN ? <Redirect to="/admin_dashboard" /> : <Home />
            }
          />
          <Route
            path="/home"
            render={() =>
              infoAccount && infoAccount.role === USER_ROLE.ADMIN ? <Redirect to="/admin_dashboard" /> : <Home />
            }
          />
          <Route
            path="/manage_shop"
            render={() =>
              infoAccount && infoAccount.role === USER_ROLE.OWNER_SHOP ? <DashboardShop /> : <Redirect to="/" />
            }
          />
          <Route
            path="/manage_shop"
            render={() =>
              infoAccount && infoAccount.role === USER_ROLE.OWNER_SHOP ? <DashboardShop /> : <Redirect to="/" />
            }
          />
          <Route
            path="/update_account"
            render={() =>
              infoAccount && infoAccount.role === USER_ROLE.OWNER_SHOP ? (
                <UpdateUser />
              ) : infoAccount && infoAccount.role === USER_ROLE.CLIENT ? (
                <DashboardCus />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/food/:id" component={FoodDetail} />
          <Route path="/category/:id" render={() => <RestaurantFilter type="FOOD" />} />
          <Route path="/res-list" component={RestaurantList} />
          <Route path="/shop/:id" component={ShopDetail} />
          <Route
            path="/login_admin"
            render={() =>
              infoAccount && infoAccount.role === USER_ROLE.ADMIN ? <Redirect to="/admin_dashboard" /> : <LoginAdmin />
            }
          />
          <Route
            path="/admin_dashboard"
            render={() =>
              infoAccount && infoAccount.role === USER_ROLE.ADMIN ? <DashboardAdmin /> : <Redirect to="/" />
            }
          />
        </Switch>
      </HashRouter>
    </ErrorBoundary>
  );
});

export default Router;
