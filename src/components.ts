import { FoodManage } from 'components/FoodManage';
import MenuManage from 'components/MenuManage';
import OrderManage from 'components/OrderManage';
import { UserInfoForm } from 'components/UserInfoForm';
import SaleManage from 'components/SaleManage';
import { StatisticalManage } from 'components/StatisticalManage';
import ChangePassword from 'components/ChangePassword';
import { OrderManageCus } from 'components/OrderManageCus';
import { UpdateInfoCus } from 'components/UpdateInfoCus';
import FavoriteFoodCus from 'components/FavoriteFoodCus';
import ManageRating from 'components/ManageRating';
import ShopRegisterPending from 'components/ShopRegisterPending';
import AdminManageShopList from 'components/AdminManageShopList';
import AdminManageCusList from 'components/AdminManageCusList';
import AdminInfo from 'components/AdminInfo';
import AdminHistory from 'components/AdminHistory';

const targetMap: { [s: string]: React.ComponentType } = {
  manage_order: OrderManage,
  manage_food: FoodManage,
  manage_menu: MenuManage,
  manage_sale: SaleManage,
  manage_stattiscal: StatisticalManage,
  account_update_info: UserInfoForm,
  account_change_password: ChangePassword,
  manage_order_cus: OrderManageCus,
  manage_account_cus: UpdateInfoCus,
  favorite_food_cus: FavoriteFoodCus,
  manage_rating: ManageRating,
  manage_shop_pending_list: ShopRegisterPending,
  manage_shop_list: AdminManageShopList,
  manage_cus_list: AdminManageCusList,
  admin_info: AdminInfo,
  history: AdminHistory,
};

export { targetMap };
