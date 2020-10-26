import { combineReducers } from 'redux';
import { UserLogin } from 'components/Login/reducers';
import {
  Comment,
  CreateFoodResult,
  DeleteFoodManageResult,
  FoodList,
  FoodType,
  LocationData,
  ShopList,
  ShopType,
  UpdateFoodResult,
  UserShopInfo,
} from 'components/reducers';
import { Router } from 'components/Router/reducers';
import {
  CreateMenuResult,
  UpdateMenuResult,
  DeleteFoodMenuResult,
  InsertFoodMenuResult,
  FoodInMenu,
  MenuList,
  DeleteMenuResult,
} from 'components/MenuManage/reducers';
import { ShopRegisterResult, ShopUpdateInfoResult } from 'components/RegisterShop/reducers';
import { StatisticalOrderList } from 'components/StatisticalManage/StatisticalContainer/reducers';
import { OrderDetailShop, OrderList, OrderStatusList, UpdateOrderResult } from 'components/OrderManage/reducers';
import { CreateSaleResult, SaleCodeList, SaleTypeList } from 'components/SaleManage/reducers';
import { LoginPassword } from 'components/ChangePassword/reducers';
import { OrderFoodList } from 'components/reducers';
import { RatingList } from 'components/ManageRating/reducers';
import { CusInfo, UpdateCusInfoResult } from 'components/UpdateInfoCus/reducers';
import { DecisionShopResult, ShopPendingList } from 'components/ShopRegisterPending/reducers';
import { AdminInfo } from 'components/AdminInfo/reducers';
import { CusList, DeleteCusResult } from 'components/AdminManageCusList/reducers';

export const state = combineReducers({
  //common
  locationData: LocationData,
  shopList: ShopList,
  foodType: FoodType,

  //food
  foodList: FoodList,
  createFoodResult: CreateFoodResult,
  updateFoodResult: UpdateFoodResult,
  deleteFoodManageResult: DeleteFoodManageResult,

  //user
  userLogin: UserLogin,
  shopRegisterResult: ShopRegisterResult,
  shopUpdateInfoResult: ShopUpdateInfoResult,
  loginPassword: LoginPassword,

  router: Router,

  //Menu
  menuList: MenuList,
  createMenuResult: CreateMenuResult,
  updateMenuResult: UpdateMenuResult,
  deleteMenuResult: DeleteMenuResult,
  foodInMenu: FoodInMenu,
  insertFoodMenuResult: InsertFoodMenuResult,
  deleteFoodMenuResult: DeleteFoodMenuResult,

  //statistical
  statisticalOrderList: StatisticalOrderList,

  //Order
  orderList: OrderList,
  updateOrderResult: UpdateOrderResult,
  orderStatusList: OrderStatusList,
  orderFoodList: OrderFoodList,
  orderDetailShop: OrderDetailShop,

  //sale
  saleCodeList: SaleCodeList,
  createSaleResult: CreateSaleResult,
  saleTypeList: SaleTypeList,

  //shop
  shopType: ShopType,
  userShopInfo: UserShopInfo,
  comment: Comment,
  ratingList: RatingList,

  //cus
  cusInfo: CusInfo,
  updateCusInfoResult: UpdateCusInfoResult,

  //admin
  shopPendingList: ShopPendingList,
  decisionShopResult: DecisionShopResult,
  adminInfo: AdminInfo,
  cusList: CusList,
  deleteCusResult: DeleteCusResult,
});

export type State = ReturnType<typeof state>;
