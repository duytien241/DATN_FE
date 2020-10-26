import React, { useRef } from 'react';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { login } from 'components/Login/actions';
import styles from './styles.scss';

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
    const params = {
      username: loginRef.current.username,
      password: loginRef.current.password,
    };
    dispatch(login(params));
  };

  return (
    <div className={styles.LoginAdmin}>
      <div className={styles.LoginForm}>
        <div className={styles.FormHeader}>
          <div className={styles.HeaderContent}>Đăng nhập Trang quản trị</div>
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
          <Button content="Đăng nhập" className={styles.LoginButton} onClick={loginWeb} />
        </div>
      </div>
    </div>
  );
};
