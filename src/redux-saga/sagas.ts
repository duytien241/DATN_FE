import { all } from 'redux-saga/effects';
import {
  login,
  register,
  logOut,
  queryShopType,
  updateInfoUser,
  queryShopInfo,
  changePassword,
  queryShopList,
  comment,
  order,
} from './sagas/User';
import { createFood, deleteFoodManage, queryFoodList, queryFoodType, updateFood } from './sagas/Food';
import {
  queryMenuList,
  createMenu,
  updateMenu,
  insertFoodInMenu,
  deleteFoodInMenu,
  queryFoodInMenu,
  deleteMenu,
} from './sagas/Menu';
import { queryStatisticalOrder } from './sagas/Statistical';
import { queryOrder, queryOrderDetailShop, queryOrderStatus, updateOrder } from './sagas/Order';
import { querySaleCode, createSaleCode, querySaleType } from './sagas/Sale';
import { queryLocation } from './sagas/Common';
import { queryRatingList } from './sagas/Rating';
import { queryCusInfo, updateCusInfo } from './sagas/Customer';
import { decisionShopRegister, queryAdminInfo, queryShopPendingList } from './sagas/Admin';
import { queryHistory } from './sagas/History';

export default function* () {
  yield all([
    //coomon
    queryLocation(),
    queryShopList(),
    queryFoodType(),

    //user
    login(),
    register(),
    logOut(),
    queryStatisticalOrder(),
    queryShopType(),
    updateInfoUser(),
    queryShopInfo(),
    changePassword(),
    comment(),
    order(),
    queryRatingList(),

    //food
    createFood(),
    queryFoodList(),
    updateFood(),
    deleteFoodManage(),

    //order
    queryOrder(),
    updateOrder(),
    queryOrderStatus(),
    queryOrderDetailShop(),

    //sale
    querySaleCode(),
    createSaleCode(),
    querySaleType(),

    //menu
    createMenu(),
    queryMenuList(),
    updateMenu(),
    deleteMenu(),
    insertFoodInMenu(),
    deleteFoodInMenu(),
    queryFoodInMenu(),

    //cus
    queryCusInfo(),
    updateCusInfo(),

    //admin
    queryShopPendingList(),
    decisionShopRegister(),
    queryAdminInfo(),

    // history
    queryHistory(),
  ]);
}
