import React, { useEffect, useRef, useState } from 'react';
import { getOrderList } from 'components/reducers';
import OrderQuantity from 'elements/OrderQuantity';
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
  const infoAccount = useSelector((state: State) => state.infoAccount);
  const ref = useRef<{
    userLogin?: Obj;
    orderDetail: {
      orderInfo?: Obj;
      note?: string;
    };
    step: number;
  }>({
    orderDetail: {},
    step: 1,
  });
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  // const [, setRedraw] = useState();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (infoAccount) {
      ref.current.userLogin = infoAccount;
    }
  }, [infoAccount]);

  const onConfirmOrder = () => {
    if (infoAccount) {
      ref.current.userLogin = infoAccount;
    }
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

  // const onChangeStep = (event: React.SyntheticEvent, data: Obj) => {
  //   ref.current.step = data.index as number;
  //   setRedraw({});
  // };

  useEffect(() => {
    if (infoAccount && open === true) {
      ref.current.userLogin = infoAccount;
      setOpen(false);
    }
  }, [infoAccount]);

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
          {/* <Step.Group ordered>
            <Step completed index={1} onClick={onChangeStep}>
              <Step.Content>
                <Step.Title>Shipping</Step.Title>
                <Step.Description>Choose your shipping options</Step.Description>
              </Step.Content>
            </Step>

            <Step completed index={2} onClick={onChangeStep}>
              <Step.Content>
                <Step.Title>Billing</Step.Title>
                <Step.Description>Enter billing information</Step.Description>
              </Step.Content>
            </Step>

            <Step active index={3} onClick={onChangeStep}>
              <Step.Content>
                <Step.Title>Confirm Order</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group> */}
          <OrderDetail step={ref.current.step} orderDetail={ref.current.orderDetail as Obj} id_user={props.id_user} />
        </Modal.Content>
      </Modal>
    </>
  );
};
