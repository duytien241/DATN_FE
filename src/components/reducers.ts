import { Obj, Action } from 'interfaces/common';
import { createSelector, Selector } from 'reselect';
import { State } from 'redux-saga/reducers';
import { Comment } from './CommentSection';
import { Order } from './OrderFood';

export const FOOD_QUERY_FOOD_LIST_SUCCESS = 'FOOD_QUERY_FOOD_LIST_SUCCESS';
export const FOOD_QUERY_FOOD_LIST_FAILED = 'FOOD_QUERY_FOOD_LIST_FAILED';

export function FoodList(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case FOOD_QUERY_FOOD_LIST_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const FOOD_QUERY_FOOD_DETAIL_SUCCESS = 'FOOD_QUERY_FOOD_DETAIL_SUCCESS';
export const FOOD_QUERY_FOOD_DETAIL_FAILED = 'FOOD_QUERY_FOOD_DETAIL_FAILED';

export function FoodDetail(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case FOOD_QUERY_FOOD_DETAIL_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const FOOD_CREATE_FOOD_SUCCESS = 'FOOD_CREATE_FOOD_LIST_SUCCESS';
export const FOOD_CREATE_FOOD_FAILED = 'FOOD_CREATE_FOOD_LIST_FAILED';

export function CreateFoodResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case FOOD_CREATE_FOOD_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const FOOD_UPDATE_FOOD_SUCCESS = 'FOOD_UPDATE_FOOD_SUCCESS';
export const FOOD_UPDATE_FOOD_FAILED = 'FOOD_UPDATE_FOOD_FAILED';

export function UpdateFoodResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case FOOD_UPDATE_FOOD_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const FOOD_DELETE_FOOD_MANAGE_SUCCESS = 'FOOD_DELETE_FOOD_MANAGE_SUCCESS';
export const FOOD_DELETE_FOOD_MANAGE_FAILED = 'FOOD_DELETE_FOOD_MANAGE_FAILED';

export function DeleteFoodManageResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case FOOD_DELETE_FOOD_MANAGE_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const USER_QUERY_SHOP_TYPE_SUCCESS = 'USER_QUERY_SHOP_TYPE_SUCCESS';
export const USER_QUERY_SHOP_TYPE_FAILED = 'USER_QUERY_SHOP_TYPE_FAILED';

export function ShopType(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case USER_QUERY_SHOP_TYPE_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const shopType = (state: State) => state.shopType;

export const getShopType: Selector<State, Obj[]> = createSelector([shopType], (shopType: any) => {
  if (shopType && shopType.data) {
    return [{ id: 0, key: 0, value: undefined, text: 'Tất cả loại cửa hàng' }].concat(
      shopType.data.map((data: any) => {
        return {
          id: data.id,
          key: data.id,
          value: data.id,
          text: data.name,
        };
      })
    );
  }
  return [];
});

export const USER_QUERY_SHOP_INFO_SUCCESS = 'USER_QUERY_SHOP_INFO_SUCCESS';
export const USER_QUERY_SHOP_INFO_FAILED = 'USER_QUERY_SHOP_INFO_FAILED';

export function UserShopInfo(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case USER_QUERY_SHOP_INFO_SUCCESS:
      return action.payload;
    case USER_QUERY_SHOP_INFO_FAILED:
      return null;
    default:
      return state;
  }
}

export const GLOBAL_QUERY_LOCATION_SUCCESS = 'GLOBAL_QUERY_LOCATION_SUCCESS';
export const GLOBAL_QUERY_LOCATION_FAILED = 'GLOBAL_QUERY_LOCATION_FAILED';

export function LocationData(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case GLOBAL_QUERY_LOCATION_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const locationData = (state: State) => state.locationData;

export const getLocationData: Selector<State, Obj[]> = createSelector([locationData], (locationData: any) => {
  if (locationData && locationData.data) {
    return [{ id: 0, key: 0, value: undefined, text: 'Tất cả' }].concat(
      Object.keys(locationData.data as Obj).map((key) => {
        return {
          id: Number(key),
          key: Number(key),
          value: Number(key),
          text: locationData.data![key],
        };
      }) as any[]
    );
  }
  return [];
});

export const GLOBAL_QUERY_SHOP_LIST_SUCCESS = 'GLOBAL_QUERY_SHOP_LIST_SUCCESS';
export const GLOBAL_QUERY_SHOP_LIST_FAILED = 'GLOBAL_QUERY_SHOP_LIST_FAILED';

export function ShopList(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case GLOBAL_QUERY_SHOP_LIST_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const FOOD_QUERY_FOOD_TYPE_SUCCESS = 'FOOD_QUERY_FOOD_TYPE_SUCCESS';
export const FOOD_QUERY_FOOD_TYPE_FAILED = 'FOOD_QUERY_FOOD_TYPE_FAILED';

export function FoodType(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case FOOD_QUERY_FOOD_TYPE_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const QUERY_COMMENT_SUCCESS = 'QUERY_COMMENT_SUCCESS';
export const QUERY_COMMENT_FAILED = 'QUERY_COMMENT_FAILED';

export function Comment(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case QUERY_COMMENT_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const COMMENT_RESULT_SUCCESS = 'COMMENT_RESULT_SUCCESS';
export const COMMENT_RESULT_FAILED = 'COMMENT_RESULT_FAILED';

export function CommentResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case COMMENT_RESULT_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const QUERY_RATING_SUCCESS = 'QUERY_RATING_SUCCESS';
export const QUERY_RATING_FAILED = 'QUERY_RATING_FAILED';

export function Rating(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case QUERY_RATING_SUCCESS:
      // state.push((action.payload as unknown) as Comment);
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const REQUEST_RATING_SUCCESS = 'REQUEST_RATING_SUCCESS';
export const REQUEST_RATING_FAILED = 'REQUEST_RATING_FAILED';

export function RatingResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case REQUEST_RATING_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const foodType = (state: State) => state.foodType;

export const getFoodType: Selector<State, Obj[]> = createSelector([foodType], (foodType: any) => {
  if (foodType && foodType.data) {
    return [{ id: 0, key: 0, value: undefined, text: 'Tất cả loại món ăn' }].concat(
      foodType.data.map((data: any) => {
        return {
          id: data.id,
          key: data.id,
          value: data.id,
          text: data.type,
        };
      })
    );
  }
  return [];
});

export const getFoodTypeOrigin: Selector<State, Obj[]> = createSelector([foodType], (foodType: any) => {
  if (foodType && foodType.data) {
    return foodType.data.map((data: any) => {
      return {
        id: data.id,
        key: data.id,
        value: data.id,
        text: data.type,
      };
    });
  }
  return [];
});

export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILURE = 'ORDER_FAILURE';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';

export function OrderFoodList(state: Order[] = [], action: Action<Obj>) {
  switch (action.type) {
    case ORDER_SUCCESS:
      return state.concat((action.payload as unknown) as Order);
    case DELETE_SUCCESS:
      let newState: Order[] = []; //prevent reference variable effect
      for (let i = state.length - 1; i > -1; i--) {
        if (state[i].id_food === ((action.payload as unknown) as Order).id_food) {
          state.splice(i, 1);
          return newState.concat(state);
        }
      }
      return state;
    default:
      return state;
  }
}

export const orderFoodList = (state: State) => state.orderFoodList;

export const getOrderList: Selector<State, Obj> = createSelector([orderFoodList], (orderList: Order[]) => {
  let id: number[] = [];
  let orderInfo: Obj[] = [];
  let totalPrice: number = 0;
  if (orderList && orderList.length > 0) {
    orderList.map((food) => {
      console.log(food);
      if (id.includes(food.id_food as number) !== true) {
        id.push(food.id_food as number);
        orderInfo.push({
          food,
          quantity: 1,
        });

        totalPrice += food.price as number;
      } else {
        orderInfo = orderInfo.map((order) => {
          if ((order.food as Obj).id_food === food.id_food) {
            return {
              food: order.food,
              quantity: ++(order.quantity as number),
            };
          }
          return order;
        });
        totalPrice += food.price as number;
      }
    });
  }

  return {
    orderInfo,
    totalPrice,
  };
});

export const FOOD_QUERY_FOOD_LIST_CATEGORY_SUCCESS = 'FOOD_QUERY_FOOD_LIST_CATEGORY_SUCCESS';
export const FOOD_QUERY_FOOD_LIST_CATEGORY_FAILED = 'FOOD_QUERY_FOOD_LIST_CATEGORY_FAILED';

export function FoodListCategory(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case FOOD_QUERY_FOOD_LIST_CATEGORY_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const SHOP_QUERY_SHOP_LIST_CATEGORY_SUCCESS = 'SHOP_QUERY_SHOP_LIST_CATEGORY_SUCCESS';
export const SHOP_QUERY_SHOP_LIST_CATEGORY_FAILED = 'SHOP_QUERY_SHOP_LIST_CATEGORY_FAILED';

export function ShopListCategory(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case SHOP_QUERY_SHOP_LIST_CATEGORY_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const QUERY_LIST_CATEGORY_SUCCESS = 'QUERY_LIST_CATEGORY_SUCCESS';
export const QUERY_LIST_CATEGORY_FAILED = 'QUERY_LIST_CATEGORY_FAILED';

export function ListCategory(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case QUERY_LIST_CATEGORY_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const QUERY_LIST_DISTRICT_SUCCESS = 'QUERY_LIST_DISTRICT_SUCCESS';
export const QUERY_LIST_DISTRICT_FAILED = 'QUERY_LIST_DISTRICT_FAILED';

export function ListDistrict(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case QUERY_LIST_DISTRICT_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const QUERY_INFO_ACCOUNT_SUCCESS = 'QUERY_INFO_ACCOUNT_SUCCESS';
export const QUERY_INFO_ACCOUNT_FAILED = 'QUERY_INFO_ACCOUNT_FAILED';

export function InfoAccount(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case QUERY_INFO_ACCOUNT_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}
