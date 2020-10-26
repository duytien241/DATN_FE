import {
  watchCreateFood as createFood,
  watchUpdateFood as updateFood,
  watchDeleteFoodManage as deleteFoodManage,
} from './CreateFood';
import { watchQueryFoodList as queryFoodList, watchQueryFoodType as queryFoodType } from './QueryFoodList';

export { createFood, queryFoodList, updateFood, queryFoodType, deleteFoodManage };
