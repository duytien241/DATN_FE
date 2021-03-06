import React, { useEffect, useRef, useState } from 'react';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import { Button, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.scss';
import { register } from './actions';
import { FIELD_VALID, notificationErrorValidate, REGISTER_TYPE } from 'utils/common';
import { queryShopType } from 'components/actions';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import TextArea from 'elements/TextArea';

interface RegisterAccountProps {
  type?: REGISTER_TYPE;
}

export default (props: RegisterAccountProps) => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const shopType = useSelector((state: State) => state.shopType);

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (shopType && shopType.data) {
      if (typeof shopType?.data === 'object') {
        registerShopRef.current.shopTypeList = (shopType.data as Obj[]).map((item: Obj) => {
          return {
            key: item.id,
            text: item.name,
            value: item.id,
          };
        });
        setRedraw({});
      }
    }
  }, [shopType]);

  const registerShopRef = useRef<{
    username: string;
    password: string;
    name: string;
    NameR: string;
    SDT: string;
    Address_P: string;
    Address_R: string;
    F_type: number;
    F_type_string?: string;
    idNo: string;
    Email_R: string;
    BankNum: string;
    BankCore: string;
    Birth?: Date;
    Role: number;
    desc: string;
    shopTypeList: Obj[];
  }>({
    username: '',
    password: '',
    name: '',
    NameR: '',
    SDT: '',
    Address_P: '',
    Address_R: '',
    F_type: 0,
    idNo: '',
    Email_R: '',
    BankNum: '',
    BankCore: '',
    Birth: undefined,
    Role: 1,
    shopTypeList: [],
    desc: '',
  });
  const [, redraw] = useState();
  const listCategory = useSelector((state: State) => state.listCategory);

  useEffect(() => {
    if (listCategory && listCategory.data) {
      console.log(listCategory.data);
      if (typeof listCategory?.data === 'object') {
        (listCategory.data as Obj[]).forEach((item) =>
          registerShopRef.current.shopTypeList.push({
            value: item.id,
            text: item.name,
          })
        );
      }
    }
    redraw({});
  }, [listCategory]);

  const registerShop = () => {
    const isValidName = notificationErrorValidate(registerShopRef.current.name, undefined, 'họ tên', 8);
    const isValidNameR = notificationErrorValidate(registerShopRef.current.NameR, undefined, 'tên cửa hàng', 8);
    const isValiDesc = notificationErrorValidate(registerShopRef.current.desc, undefined, 'mô tả chi tiết', 500, false);
    const isValidAddress = notificationErrorValidate(
      registerShopRef.current.Address_R,
      undefined,
      'địa chỉ cửa hàng',
      255,
      false
    );
    const isValidEmail = notificationErrorValidate(registerShopRef.current.Email_R, FIELD_VALID.MAIL, 'Email');
    const isValidUsername = notificationErrorValidate(
      registerShopRef.current.username,
      FIELD_VALID.TEXT,
      'tên đăng nhập',
      8
    );
    const isValidPass = notificationErrorValidate(registerShopRef.current.password, FIELD_VALID.TEXT, 'mật khẩu', 8);
    const isValidID = notificationErrorValidate(
      registerShopRef.current.idNo,
      FIELD_VALID.ID,
      'CMND/CCCD',
      undefined,
      false
    );

    if (
      isValidName === true &&
      isValidEmail === true &&
      isValidUsername === true &&
      isValidPass === true &&
      isValidNameR === true &&
      isValiDesc === true &&
      isValidAddress === true &&
      isValidID === true
    ) {
      const params = {
        name: registerShopRef.current.name,
        phone: registerShopRef.current.SDT,
        address: registerShopRef.current.Address_R,
        type: registerShopRef.current.F_type,
        idNo: registerShopRef.current.idNo,
        email: registerShopRef.current.Email_R,
        bankNum: registerShopRef.current.BankNum,
        bankCore: registerShopRef.current.BankCore,
        role: registerShopRef.current.Role,
        username: registerShopRef.current.username,
        password: registerShopRef.current.password,
        nameR: registerShopRef.current.NameR,
        desc: registerShopRef.current.desc,
      };
      dispatch(register(params));
    }
  };

  const requestData = () => {
    dispatch(queryShopType());
  };

  const onChangeUsername = (value: string) => {
    registerShopRef.current.username = value;
  };

  const onChangePassword = (value: string) => {
    registerShopRef.current.password = value;
  };

  const onChangeName = (value: string) => {
    registerShopRef.current.name = value;
  };

  const onChangeNameR = (value: string) => {
    registerShopRef.current.NameR = value;
  };

  const onChangePhone = (value: string) => {
    registerShopRef.current.SDT = value;
  };

  const onChangeAddressR = (value: string) => {
    registerShopRef.current.Address_R = value;
  };

  const onChangeIDNo = (value: string) => {
    registerShopRef.current.idNo = value;
  };

  const onChangeEmail = (value: string) => {
    registerShopRef.current.Email_R = value;
  };

  const onChangeDesc = (value: string) => {
    registerShopRef.current.desc = value;
  };

  const changeShopType = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    const text = registerShopRef.current.shopTypeList.find((item) => item.value === data.value)?.text;
    registerShopRef.current.F_type = data.value as number;
    registerShopRef.current.F_type_string = text as string;
    setRedraw({});
  };

  return (
    <div className={styles.RegisterShop}>
      <div className={styles.LoginForm}>
        <div className={styles.FormHeader}>
          <div className={styles.HeaderContent}>Đăng ký cửa hàng</div>
        </div>
        <div className={styles.FormInput}>
          <TextBox
            className={'UsernameInput'}
            placeholder={'Họ và tên'}
            icon="user"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangeName}
          />
          <TextBox
            className={'UsernameInput'}
            placeholder={'Số điện thoại'}
            icon="phone"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangePhone}
          />
          <TextBox
            className={'UsernameInput'}
            placeholder={'CNND/CCCD'}
            icon="id card"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangeIDNo}
          />
          <TextBox
            className={'UsernameInput'}
            placeholder={'Tên cửa hàng'}
            icon="shop"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangeNameR}
          />
          <TextBox
            className={'UsernameInput'}
            placeholder={'Địa chỉ cửa hàng'}
            icon="address book"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangeAddressR}
          />
          <Dropdown
            button
            className="icon"
            floating
            labeled
            options={registerShopRef.current.shopTypeList}
            text={
              (registerShopRef.current.F_type_string as string) ? registerShopRef.current.F_type_string : 'Choose Type'
            }
            onChange={changeShopType}
          />
          <TextBox
            className={'UsernameInput'}
            placeholder={'Email cửa hàng'}
            icon="mail"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangeEmail}
          />
          <TextArea placeholder="Nhập mô tả cửa hàng" onChangeText={onChangeDesc} />
          <TextBox
            className={'UsernameInput'}
            placeholder={'Tên đăng nhập'}
            icon="user"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangeUsername}
          />
          <TextBox
            className={'PasswordInput'}
            placeholder={'Mật khẩu'}
            icon="lock"
            iconPosition="left"
            type={TEXTBOX_TYPE.PASSWORD}
            onChangeText={onChangePassword}
          />
          <Button content="Đăng Ký" className={styles.LoginButton} onClick={registerShop} />
        </div>
        <div className={styles.Line}>
          <div className={styles.LineLeft}></div>
          <div className={styles.Center}>TM FOOD</div>
          <div className={styles.LineRight}></div>
        </div>
      </div>
    </div>
  );
};
