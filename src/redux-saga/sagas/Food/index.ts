import {
  watchCreateFood as createFood,
  watchUpdateFood as updateFood,
  watchDeleteFoodManage as deleteFoodManage,
  watchChangeStatusFood as changeStatusFood,
} from './CreateFood';
import {
  watchQueryFoodList as queryFoodList,
  watchQueryFoodDetail as queryFoodDetail,
  watchQueryFoodType as queryFoodType,
  watchQueryFoodListByCategory as queryFoodListByCategory,
  watchQueryFoodListSearch as queryFoodListSearch,
} from './QueryFoodList';

export {
  createFood,
  queryFoodList,
  queryFoodDetail,
  updateFood,
  queryFoodType,
  deleteFoodManage,
  changeStatusFood,
  queryFoodListByCategory,
  queryFoodListSearch,
};
