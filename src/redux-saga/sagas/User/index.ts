import login from './Login';
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
import comment from './Comment';
import order from './OrderFood';

export {
  comment,
  login,
  register,
  updateInfoUser,
  logOut,
  queryShopType,
  queryShopInfo,
  changePassword,
  queryShopList,
  order,
};
