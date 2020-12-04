import React, { useEffect, useRef, useState } from 'react';
import { getOrderList } from 'components/reducers';
import OrderQuantity from 'elements/OrderQuantity';
import Cookie from 'js-cookie';
import { Obj } from 'interfaces/common';
import { useSelector } from 'react-redux';
import { Button, Modal, Tab } from 'semantic-ui-react';
import Login from 'components/Login';
import RegisterCus from 'components/RegisterCus';
import RegisterAccount from 'components/RegisterShop';
import OrderDetail from 'components/OrderDetail';
import { State } from 'redux-saga/reducers';
import { formatNumber } from 'utils/common';
import styles from './styles.scss';

export interface Order {
  name: string;
  price: number | string;
  image: string;
  id_food: number | string;
}

export interface OrderInfor {
  [key: string]: any;
  totalPrice: number;
}

interface OrderFoodItemProps {
  image: string;
  name: string;
  price: number;
  quantity: number;
  id_food: string;
}

interface OrderInfoProps {
  userImage?: string;
  username?: string;
  id_user: any;
}

export const OrderFoodItem = (props: OrderFoodItemProps) => {
  return (
    <div className={styles.OrderFoodItem}>
      <div>
        <div className={styles.Image}>
          <img src={props.image} alt={props.name} />
        </div>
        <span className={styles.Name}>{props.name ? props.name : ''}</span>
      </div>
      <div>
        <OrderQuantity order={{ ...props }} />
      </div>
    </div>
  );
};

export default (props: OrderInfoProps) => {
  const orderInfo = useSelector(getOrderList);
  const orderResult = useSelector((state: State) => state.orderResult);
  const userLogin1 = useSelector((state: State) => state.userLogin);
  const ref = useRef<{
    userLogin?: Obj;
    orderDetail: {
      orderInfo?: Obj;
      note?: string;
    };
  }>({
    userLogin: Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null,
    orderDetail: {},
  });
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const onConfirmOrder = () => {
    ref.current.userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null;
    if ((orderInfo.orderInfo as Obj[]).length === 0) {
    } else if (ref.current.userLogin == null) {
      setOpen(true);
    } else {
      ref.current.orderDetail.orderInfo = orderInfo;
      setOpenOrderDetail(true);
    }
  };

  useEffect(() => {
    if (orderResult && orderResult.data) {
      setOpenOrderDetail(false);
    }
  }, [orderResult]);

  const onTabChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setActiveIndex((event.target as any).value);
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    ref.current.orderDetail.note = event.target.value;
  };

  useEffect(() => {
    if (userLogin1 && userLogin1.data && open === true) {
      ref.current.userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null;
      setOpen(false);
    }
  }, [userLogin1]);

  const panes = [
    {
      menuItem: 'Đăng nhập',
      render: () => (
        <Tab.Pane>
          <Login />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Đăng ký',
      render: () => (
        <Tab.Pane>
          <RegisterCus />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Đăng ký bán hàng',
      render: () => (
        <Tab.Pane>
          <RegisterAccount />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className={styles.OrderFood}>
        <div className={styles.FoodList}>
          {orderInfo &&
            (orderInfo.orderInfo as Order[]).length > 0 &&
            (orderInfo.orderInfo as Obj[]).map((order, index) => (
              <OrderFoodItem
                name={(order.food as Obj).name as string}
                image={(order.food as Obj).image as string}
                price={(order.food as Obj).price as number}
                quantity={order.quantity as number}
                id_food={(order.food as Obj).id_food as string}
                key={index}
              />
            ))}
        </div>
        <div className={styles.TotalPrice}>
          {`Tổng cộng: ${formatNumber(orderInfo.totalPrice as number)}`}
          <sup>đ</sup>
        </div>
        <div className={styles.Note}>
          <textarea placeholder="Ghi chú" rows={4} onChange={onChange} />
        </div>
        <div className={styles.OrderButton}>
          <Button primary onClick={onConfirmOrder}>
            ĐẶT HÀNG
          </Button>
        </div>
      </div>
      <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} closeIcon={true}>
        <Modal.Header>
          {activeIndex === 1 ? 'Đăng nhập' : activeIndex === 2 ? 'Đăng ký tài khoản' : 'Đăng ký tài khoản cửa hàng'}
        </Modal.Header>
        <Modal.Content>
          <Tab panes={panes} activeIndex={activeIndex} onTabChange={onTabChange} />
        </Modal.Content>
      </Modal>
      <Modal onClose={() => setOpenOrderDetail(false)} onOpen={() => setOpenOrderDetail(true)} open={openOrderDetail}>
        <Modal.Header>
          <span>Chi tiết đơn</span>
        </Modal.Header>
        <Modal.Content>
          <OrderDetail orderDetail={ref.current.orderDetail as Obj} id_user={props.id_user} />
        </Modal.Content>
      </Modal>
    </>
  );
};
