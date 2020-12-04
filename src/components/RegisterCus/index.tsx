import React, { useRef } from 'react';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { FIELD_VALID, notificationErrorValidate, REGISTER_TYPE } from 'utils/common';
import { register } from 'components/RegisterShop/actions';
import styles from './styles.scss';

interface RegisterCusProps {
  type?: REGISTER_TYPE;
}

export default (props: RegisterCusProps) => {
  const dispatch = useDispatch();
  //   const [, setRedraw] = useState();

  const registerShopRef = useRef<{
    Username: string;
    Password: string;
    SDT: string;
    Address: string;
    Email: string;
    Role: number;
  }>({
    Username: '',
    Password: '',
    SDT: '',
    Address: '',
    Email: '',
    Role: 2,
  });

  const registerCus = () => {
    const isValidUsername = notificationErrorValidate(registerShopRef.current.Username, undefined, 'tên đăng nhập');
    const isValidPass = notificationErrorValidate(registerShopRef.current.Password, undefined, 'mật khẩu', 8);
    const isValidAddress = notificationErrorValidate(registerShopRef.current.Address, undefined, 'địa chỉ');
    const isValidEmail = notificationErrorValidate(registerShopRef.current.Email, FIELD_VALID.MAIL, 'địa chỉ mail');
    const isValidPhone = notificationErrorValidate(registerShopRef.current.SDT, FIELD_VALID.PHONE, 'số điện thoại');
    if (
      isValidUsername === true &&
      isValidPass === true &&
      isValidAddress === true &&
      isValidEmail === true &&
      isValidPhone === true
    ) {
      const params = {
        SDT: registerShopRef.current.SDT,
        Address_P: registerShopRef.current.Address,
        Email: registerShopRef.current.Email,
        Role: registerShopRef.current.Role,
        Username: registerShopRef.current.Username,
        Password: registerShopRef.current.Password,
      };
      console.log(params);
      dispatch(register(params));
    }
  };

  const onChangeUsername = (value: string) => {
    registerShopRef.current.Username = value;
  };

  const onChangePassword = (value: string) => {
    registerShopRef.current.Password = value;
  };

  const onChangeEmail = (value: string) => {
    registerShopRef.current.Email = value;
  };

  const onChangePhone = (value: string) => {
    registerShopRef.current.SDT = value;
  };

  const onChangeAddress = (value: string) => {
    registerShopRef.current.Address = value;
  };

  return (
    <div className={styles.RegisterCus}>
      <div className={styles.LoginForm}>
        <div className={styles.FormHeader}>
          <div className={styles.HeaderContent}>Đăng ký tài khoản</div>
        </div>
        <div className={styles.FormInput}>
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
            placeholder={'Địa chỉ'}
            icon="address book"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangeAddress}
          />
          <TextBox
            className={'UsernameInput'}
            placeholder={'Email'}
            icon="mail"
            iconPosition="left"
            type={TEXTBOX_TYPE.TEXT}
            onChangeText={onChangeEmail}
          />
          <Button content="Đăng Ký" className={styles.LoginButton} onClick={registerCus} />
        </div>
      </div>
    </div>
  );
};
