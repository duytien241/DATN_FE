import { watchLogin as login, watchLoginAdmin as loginAdmin } from './Login';
import {
  watchRegister as register,
  watchUpdateInfoUser as updateInfoUser,
  watchChangePassword as changePassword,
} from './Register';
import logOut from './LogOut';
import {
  watchQueryShopType as queryShopType,
  watchQueryShopInfo as queryShopInfo,
  watchQueryShopList as queryShopList,
} from './QueryShopType';
import { watchRequestComment as requestComment, watchQueryComment as queryComment } from './Comment';
import { watchRequestRating as requestRating, watchQueryRating as queryRating } from './Rating';
import { watchAddOrderFood as addOrder, watchDelOrderFood as delOrder } from './OrderFood';

export {
  requestComment,
  queryComment,
  queryRating,
  requestRating,
  login,
  loginAdmin,
  register,
  updateInfoUser,
  logOut,
  queryShopType,
  queryShopInfo,
  changePassword,
  queryShopList,
  addOrder,
  delOrder,
};
