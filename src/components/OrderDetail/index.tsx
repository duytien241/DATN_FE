import React, { useEffect, useRef, useState } from 'react';
import { Obj } from 'interfaces/common';
import styles from './styles.scss';
import { formatNumber } from 'utils/common';
import { Button, Form, Icon, Input, InputOnChangeData, Modal, Popup } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from './actions';
import { querySaleCodeList } from 'components/SaleManage/actions';
// import { State } from 'redux-saga/reducers';
import { getSaleCodeList } from 'components/SaleManage/reducers';
import { State } from 'redux-saga/reducers';

interface Discount {
  text?: string;
  value?: number;
  code?: string;
  type: string;
}

interface DiscountDetailProps {
  id_user: string;
  userDiscounts: Discount[];
  shopDiscounts: Discount[];
  onApply: (discount: Discount) => void;
}

interface PayMethod {
  text: string;
  value: string;
}

interface ShipmentInfo {
  name: string;
  phone: string;
  address: string;
}

const DISCOUNTS = {
  FreeShip: {
    text: 'FREE_SHIP',
    value: 15000,
  },
  'Sale 50%': {
    text: 'Sale 50%',
    value: 0.5,
  },
  'Sale 5%': {
    text: 'Sale 5%',
    value: 0.05,
  },
};

const DiscountDetail = (props: DiscountDetailProps) => {
  const onApply = (discount: Discount) => {
    props.onApply(discount);
  };
  return (
    <div className={styles.DiscountDetail}>
      <div className={styles.Title}>Khuyến mãi của bạn</div>
      <div className="UserDiscounts">
        {props.userDiscounts.length === 0 ? (
          <span>Bạn không có khuyến mãi</span>
        ) : (
          props.userDiscounts.map((discount) => (
            <div className={styles.DiscountDetail}>
              <div className={styles.Name}>
                <Icon name="clipboard list" />
                <span>{discount.code}</span>
              </div>
              <div className={styles.Value}>
                <label>Giảm giá:</label>
                <span>
                  {formatNumber(discount.value)}
                  <sup>đ</sup>
                </span>
              </div>
              <div className={styles.Apply} onClick={() => onApply(discount)}>
                Áp dụng
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.Title}>Khuyến mãi của cửa hàng</div>
      <div className="ShopDiscount">
        {props.shopDiscounts.length === 0 ? (
          <span>Cửa hàng không có khuyến mãi</span>
        ) : (
          props.shopDiscounts.map((discount) => (
            <div className={styles.DiscountItem}>
              <div className={styles.Name}>
                <Icon name="clipboard list" />
                <span>{discount.code}</span>
              </div>
              <div className={styles.Value}>
                <label>Giảm giá:</label>
                <span>
                  {/* {formatNumber(discount.value)}
                  <sup>đ</sup> */}
                  {discount.text}
                </span>
              </div>
              <div className={styles.Apply} onClick={() => onApply(discount)}>
                Áp dụng
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ({ orderDetail, id_user, step }: { orderDetail: Obj; id_user: any; step: number }) => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const saleCodeList = useSelector(getSaleCodeList);
  const infoAccount = useSelector((state: State) => state.infoAccount);
  console.log(step);
  const ref = useRef<{
    totalQuantity: number;
    discountCode: { text?: string; value?: number; code?: string; type?: string };
    payMethod: PayMethod;
    shipmentInfo: ShipmentInfo;
    userLogin?: Obj;
    saleList: Obj[];
    note: string;
  }>({
    totalQuantity: handleOrderDetail(),
    discountCode: {
      text: 'Nhập mã khuyến mãi',
      value: 0,
    },
    note: '',
    payMethod: {
      text: 'Tiền mặt',
      value: 'COD',
    },
    shipmentInfo: {
      name: '',
      phone: '',
      address: '',
    },
    saleList: [],
  });

  useEffect(() => {
    requestDataSaleList();
  }, []);

  useEffect(() => {
    console.log(infoAccount);
    if (infoAccount) {
      ref.current.userLogin = infoAccount;
      ref.current.shipmentInfo.name = infoAccount.first_name + ' ' + infoAccount.last_name;
    }
  }, [infoAccount]);

  useEffect(() => {
    if (saleCodeList) {
      if (typeof saleCodeList === 'object') {
        ref.current.saleList = saleCodeList;
      }
    }
    setRedraw({});
  }, [saleCodeList]);

  const [showTypeCode, setShowTypeCode] = useState(false);
  const [openConfirmOrder, setOpenConfirmOrder] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [, redraw] = useState();
  function handleOrderDetail() {
    let totalQuantity = 0;
    ((orderDetail.orderInfo as Obj).orderInfo as Obj[]).forEach((order) => {
      totalQuantity += order.quantity as number;
    });
    return totalQuantity;
  }

  const typeCode = () => {
    setShowTypeCode(true);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ref.current.discountCode.text = event.target.value;
    if (DISCOUNTS[ref.current.discountCode.text]) {
      ref.current.discountCode.value = DISCOUNTS[ref.current.discountCode.text].value;
    }
  };

  const onBlur = () => {
    if (DISCOUNTS[ref.current.discountCode.text as any] == null) {
      ref.current.discountCode.text = 'Không có mã này';
    }
    setShowTypeCode(false);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      onBlur();
    }
  };

  const onApply = (discount: Discount) => {
    ref.current.discountCode = discount;
    redraw({});
  };

  const onChangeNote = (e: React.ChangeEvent, data: Obj) => {
    ref.current.note = data.value as string;
  };
  const requestDataSaleList = () => {
    const params = {
      id_user: id_user,
    };

    dispatch(querySaleCodeList(params));
  };

  const placeOrderFood = () => {
    const params = {
      id_cus: Number(ref.current.userLogin?.id),
      id_user: id_user,
      address: ref.current.shipmentInfo.address,
      note: `${ref.current.shipmentInfo.name}${ref.current.shipmentInfo.name && ','} ${ref.current.shipmentInfo.phone}${
        ref.current.shipmentInfo.phone && ','
      } ${ref.current.shipmentInfo.address}`,
      total: (orderDetail.orderInfo as Obj)?.totalPrice,
      payType: ref.current.payMethod.value,
      info: ((orderDetail.orderInfo as Obj)?.orderInfo as Obj[]).map((info: Obj) => {
        return { qty: info.quantity, id_food: (info.food as Obj).id_food, total: 0 };
      }),
    };
    console.log(params);

    dispatch(placeOrder(params));
  };

  console.log(orderDetail);

  const detailFood = () => {
    return (
      <div>
        <div className={styles.Quantity}>
          {((orderDetail.orderInfo as Obj).orderInfo as Obj[]).map((order, index) => {
            return (
              <div className={styles.Food} key={index}>
                <div>
                  <span>{order.quantity}</span>
                  <span>{(order.food as Obj).name}</span>
                </div>
                <div>
                  {formatNumber((order.quantity as number) * ((order.food as Obj).price as number))}
                  <sup>đ</sup>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.Discount}>
          <label>Khuyến mãi</label>
          <div>
            {/* {ref.current.discountCode.value > 0 && ( */}
            <span>
              {` - ${
                ref.current.discountCode.type === 'FreeShip'
                  ? formatNumber(ref.current.discountCode.value as number)
                  : ref.current.discountCode.type === 'Sale 50%'
                  ? formatNumber(
                      ((orderDetail.orderInfo as Obj).totalPrice as number) * (ref.current.discountCode.value as number)
                    )
                  : ref.current.discountCode.type === 'Sale 5%'
                  ? formatNumber(
                      ((orderDetail.orderInfo as Obj).totalPrice as number) * (ref.current.discountCode.value as number)
                    )
                  : ''
              }`}{' '}
              <sup>đ</sup>
            </span>
            {/* )} */}
          </div>
        </div>
        <div className={styles.Total}>
          <label>{`Tổng cộng ${ref.current.totalQuantity} phần`}</label>
          <span>
            {ref.current.discountCode.type === 'FreeShip'
              ? formatNumber(
                  ((orderDetail.orderInfo as Obj).totalPrice as number) - (ref.current.discountCode.value as number)
                )
              : ref.current.discountCode.type === 'Sale 50%'
              ? formatNumber(
                  ((orderDetail.orderInfo as Obj).totalPrice as number) -
                    ((orderDetail.orderInfo as Obj).totalPrice as number) * (ref.current.discountCode.value as number)
                )
              : ref.current.discountCode.type === 'Sale 5%'
              ? formatNumber(
                  ((orderDetail.orderInfo as Obj).totalPrice as number) -
                    ((orderDetail.orderInfo as Obj).totalPrice as number) * (ref.current.discountCode.value as number)
                )
              : ''}
          </span>
        </div>
        <div className={styles.Note}>
          <label>Ghi chú</label>
          <Input onChange={onChangeNote} placeholder="Ghi chú" />
        </div>
      </div>
    );
  };
  return (
    <div className={styles.OrderDetail}>
      {step === 2 ? <div></div> : step === 3 ? <div></div> : detailFood()}
      <div className={styles.DiscountCode}>
        <label>Mã khuyến mãi</label>
        {showTypeCode ? (
          <input type="text" onChange={onChange} onBlur={onBlur} tabIndex={0} autoFocus onKeyDown={onEnter} />
        ) : (
          <span className={styles.DiscountButton} onClick={typeCode}>
            {ref.current.discountCode.text}
          </span>
        )}
        <Popup
          wide="very"
          size="large"
          className={'PopupSaleCode'}
          trigger={<span className={styles.DiscountButton}>Xem mã khuyến mãi</span>}
          on="click"
          position="top center"
        >
          <Popup.Header> Khuyến mãi</Popup.Header>
          <Popup.Content>
            <DiscountDetail
              id_user={id_user}
              userDiscounts={[]}
              // shopDiscounts={Object.values(DISCOUNTS)}
              shopDiscounts={ref.current.saleList as any[]}
              onApply={onApply}
            />
          </Popup.Content>
        </Popup>
      </div>
      <div className={styles.Address}>
        <label>Thông tin giao hàng</label>
        <span>
          {`${ref.current.shipmentInfo.name}${ref.current.shipmentInfo.name && ','} ${ref.current.shipmentInfo.phone}${
            ref.current.shipmentInfo.phone && ','
          } ${ref.current.shipmentInfo.address}`}
        </span>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              placeholder={ref.current.shipmentInfo.name}
              label="Tên"
              va
              onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                ref.current.shipmentInfo.name = data.value;
                redraw({});
              }}
            />
            <Form.Input
              placeholder="Số điện thoại"
              label="Số điện thoại"
              onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                ref.current.shipmentInfo.phone = data.value;
                redraw({});
              }}
            />
          </Form.Group>
          <Form.Input
            placeholder="Địa chỉ"
            label="Địa chỉ"
            onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
              ref.current.shipmentInfo.address = data.value;
              redraw({});
            }}
          />
        </Form>
      </div>
      <div className={styles.Order}>
        <Button
          primary
          onClick={() => {
            if (ref.current.shipmentInfo.phone === '' || ref.current.shipmentInfo.address === '') {
              setOpenAlert(true);
            } else {
              placeOrderFood();
            }
          }}
        >
          ĐẶT HÀNG
        </Button>
      </div>
      <Modal
        onClose={() => setOpenConfirmOrder(false)}
        onOpen={() => setOpenConfirmOrder(true)}
        open={openConfirmOrder}
        closeIcon={true}
      >
        <Modal.Header>
          <span>Đặt hàng</span>
        </Modal.Header>
        <Modal.Content>
          <span>Đơn hàng đã được gửi đi và chờ xác nhận</span>
        </Modal.Content>
      </Modal>
      <Modal onClose={() => setOpenAlert(false)} onOpen={() => setOpenAlert(true)} open={openAlert}>
        <Modal.Header>
          <span>Đặt hàng</span>
        </Modal.Header>
        <Modal.Content>
          <span>Bạn chưa điền đủ thông tin giao hàng</span>
        </Modal.Content>
      </Modal>
    </div>
  );
};
