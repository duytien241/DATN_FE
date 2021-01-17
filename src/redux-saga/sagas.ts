import { all } from 'redux-saga/effects';
import {
  login,
  loginAdmin,
  register,
  logOut,
  queryShopType,
  updateInfoUser,
  queryShopInfo,
  changePassword,
  queryShopList,
  queryComment,
  requestComment,
  order,
  queryRating,
  requestRating,
  getInfoAccount,
  loginForm,
} from './sagas/User';
import {
  changeStatusFood,
  createFood,
  deleteFoodManage,
  queryFoodDetail,
  queryFoodList,
  queryFoodListByCategory,
  queryFoodListSearch,
  queryFoodType,
  updateFood,
} from './sagas/Food';
import {
  queryMenuList,
  createMenu,
  updateMenu,
  insertFoodInMenu,
  deleteFoodInMenu,
  queryFoodInMenu,
  deleteMenu,
  queryMenuListShop,
} from './sagas/Menu';
import { queryStatisticalOrder } from './sagas/Statistical';
import { placeOrder, queryOrder, queryOrderDetailShop, queryOrderStatus, updateOrder } from './sagas/Order';
import { querySaleCode, createSaleCode, querySaleType } from './sagas/Sale';
import { initSocket, queryLocation } from './sagas/Common';
import { queryRatingList } from './sagas/Rating';
import { queryCusInfo, queryCustList, updateCusInfo } from './sagas/Customer';
import { decisionShopRegister, queryAdminInfo, queryShopPendingList } from './sagas/Admin';
import { queryHistory } from './sagas/History';
import { sendMessage } from './sagas/Chatbot';
import { queryListDistrict, queryShopListCategory, queryResultFilter } from './sagas/Restaurant';
import { queryListCategory } from './sagas/CateGory';

export default function* () {
  yield all([
    //coomon
    queryLocation(),
    queryShopList(),
    queryFoodType(),
    //user
    login(),
    loginAdmin(),
    register(),
    logOut(),
    queryStatisticalOrder(),
    queryShopType(),
    updateInfoUser(),
    queryShopInfo(),
    changePassword(),
    queryComment(),
    requestComment(),
    queryRating(),
    requestRating(),
    order(),
    queryRatingList(),
    getInfoAccount(),

    //food
    createFood(),
    queryFoodList(),
    queryFoodDetail(),
    updateFood(),
    deleteFoodManage(),
    changeStatusFood(),
    queryFoodListByCategory(),
    queryFoodListSearch(),

    //order
    queryOrder(),
    updateOrder(),
    queryOrderStatus(),
    queryOrderDetailShop(),
    placeOrder(),

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
    queryCustList(),

    //admin
    queryShopPendingList(),
    decisionShopRegister(),
    queryAdminInfo(),

    // history
    queryHistory(),

    sendMessage(),
    initSocket(),

    queryShopListCategory(),

    queryListCategory(),
    queryListDistrict(),
    queryResultFilter(),

    queryMenuListShop(),
    loginForm(),
  ]);
}
