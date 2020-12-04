import React, { useRef } from 'react';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import styles from './styles.scss';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { login } from './actions';
import { Link } from 'react-router-dom';
import { notificationErrorValidate } from 'utils/common';

export default () => {
  const dispatch = useDispatch();

  const loginRef = useRef<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const onChangeUsername = (value: string) => {
    loginRef.current.username = value;
  };

  const onChangePassword = (value: string) => {
    loginRef.current.password = value;
  };

  const loginWeb = () => {
    const isValidUserName = notificationErrorValidate(loginRef.current.username, undefined, 'tên đăng nhập');
    const isValidPassword = notificationErrorValidate(loginRef.current.password, undefined, 'mật khẩu', 8);
    if (isValidUserName === true && isValidPassword === true) {
      const params = {
        username: loginRef.current.username,
        password: loginRef.current.password,
      };
      dispatch(login(params));
    }
  };
  return (
    <div className={styles.Login}>
      <div className={styles.LoginForm}>
        <div className={styles.FormHeader}>
          <div className={styles.HeaderContent}>Đăng nhập</div>
        </div>
        <div className={styles.FormInput}>
          {/* <div className={styles.ErrorLogin}>
            <Icon name="close" circular />
            <div className={styles.ErrorLoginContent}>
              Tài khoản của bạn chưa được đăng ký. Bạn có muốn đăng ký ngay không?
            </div>
          </div> */}
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
          <Button content="Đăng nhập" className={styles.LoginButton} onClick={loginWeb} />
        </div>
        <div className={styles.Line}>
          <div className={styles.LineLeft}></div>
          <div className={styles.Center}>TM FOOD</div>
          <div className={styles.LineRight}></div>
        </div>
        <div className={styles.FormFooter}>
          <Link to="/register">Đăng ký tài khoản</Link>
        </div>
      </div>
    </div>
  );
};
