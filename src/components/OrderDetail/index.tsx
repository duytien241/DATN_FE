import React, { useRef, useState } from 'react';
import { Obj } from 'interfaces/common';
import styles from './styles.scss';
import { formatNumber } from 'utils/common';
import { Button, CheckboxProps, Form, Icon, InputOnChangeData, Modal, Popup, Radio } from 'semantic-ui-react';

interface Discount {
  text: string;
  value: number;
}

interface DiscountDetailProps {
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
  FREE_SHIP: {
    text: 'FREE_SHIP',
    value: 15000,
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
                <span>{discount.text}</span>
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
                <span>{discount.text}</span>
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
    </div>
  );
};

export default ({ orderDetail }: { orderDetail: Obj }) => {
  const ref = useRef<{
    totalQuantity: number;
    discountCode: { text: string; value: number };
    payMethod: PayMethod;
    shipmentInfo: ShipmentInfo;
  }>({
    totalQuantity: handleOrderDetail(),
    discountCode: {
      text: 'Nhập mã khuyến mãi',
      value: 0,
    },
    payMethod: {
      text: 'Tiền mặt',
      value: 'CASH',
    },
    shipmentInfo: {
      name: '',
      phone: '',
      address: '',
    },
  });
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
    if (DISCOUNTS[ref.current.discountCode.text] == null) {
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

  const onSelectPayMethod = (event: React.MouseEvent<HTMLInputElement, MouseEvent>, data: CheckboxProps) => {
    if (data.value === 'CASH') {
      ref.current.payMethod = { text: 'Tiền mặt', value: 'CASH' };
    } else if (data.value === 'ONLINE') {
      ref.current.payMethod = { text: 'Online', value: 'ONLINE' };
    }
    redraw({});
  };

  return (
    <div className={styles.OrderDetail}>
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
          {ref.current.discountCode.value > 0 && (
            <span>
              {` - ${formatNumber(ref.current.discountCode.value)}`} <sup>đ</sup>
            </span>
          )}
        </div>
      </div>
      <div className={styles.Total}>
        <label>{`Tổng cộng ${ref.current.totalQuantity} phần`}</label>
        <span>
          {formatNumber(
            ((orderDetail.orderInfo as Obj).totalPrice as number) - (ref.current.discountCode.value as number)
          )}
          <sup>đ</sup>
        </span>
      </div>
      <div className={styles.Note}>
        <label>Ghi chú</label>
        <span>{orderDetail.note}</span>
      </div>
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
          trigger={<span className={styles.DiscountButton}>Xem mã khuyến mãi</span>}
          on="click"
          position="top center"
        >
          <Popup.Header> Khuyến mãi</Popup.Header>
          <Popup.Content>
            <DiscountDetail userDiscounts={[]} shopDiscounts={Object.values(DISCOUNTS)} onApply={onApply} />
          </Popup.Content>
        </Popup>
      </div>
      <div className={styles.PayMethod}>
        <label>Hình thức thanh toán</label>
        <span>{ref.current.payMethod.text}</span>
        <Popup
          wide="very"
          size="large"
          trigger={<span className={styles.DiscountButton}>Thay đổi</span>}
          on="click"
          position="top center"
        >
          <Popup.Header>Hình thức thanh toán</Popup.Header>
          <Popup.Content>
            <Form>
              <Form.Field>
                <Radio label="Tiền mặt" name="radioGroup" value="CASH" onClick={onSelectPayMethod} />
              </Form.Field>
              <Form.Field>
                <Radio label="Online" name="radioGroup" value="ONLINE" onClick={onSelectPayMethod} />
              </Form.Field>
            </Form>
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
        <Popup
          wide="very"
          size="large"
          trigger={<span className={styles.DiscountButton}>Thay đổi</span>}
          on="click"
          position="top center"
        >
          <Popup.Header>Hình thức thanh toán</Popup.Header>
          <Popup.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  placeholder="Họ và tên"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                    ref.current.shipmentInfo.name = data.value;
                    redraw({});
                  }}
                />
                <Form.Input
                  placeholder="Số điện thoại"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                    ref.current.shipmentInfo.phone = data.value;
                    redraw({});
                  }}
                />
              </Form.Group>
              <Form.Input
                placeholder="Địa chỉ"
                onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                  ref.current.shipmentInfo.address = data.value;
                  redraw({});
                }}
              />
            </Form>
          </Popup.Content>
        </Popup>
      </div>
      <div className={styles.Order}>
        <Button
          primary
          onClick={() => {
            if (ref.current.shipmentInfo.phone === '' || ref.current.shipmentInfo.address === '') {
              setOpenAlert(true);
            } else setOpenConfirmOrder(true);
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
