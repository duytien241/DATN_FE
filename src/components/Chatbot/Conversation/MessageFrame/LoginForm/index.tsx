import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import { Button, Form } from 'components/Semantic';
import { chatbotAddNewMessage } from 'components/Chatbot/actions';
import { CHATBOT_ADD_USER_MESSAGE } from 'redux-saga/actions';
import { MESSAGE_SENDER, MESSAGE_TYPE } from 'components/Chatbot/reducers';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';
import { Obj } from 'interfaces/common';
import { loginForm } from 'components/Login/actions';

interface LoginFormProps {
  openComponent?: {
    value: string;
    props: Obj;
  };
  handleSuccessLogin?: () => void;
}

export default (props: LoginFormProps) => {
  const dispatch = useDispatch();
  const loginFormInfo = useSelector((state: State) => state.loginFormInfo);
  const infoAccount = useSelector((state: State) => state.infoAccount);
  const loginFormRef = useRef({
    username: loginFormInfo.username,
    password: loginFormInfo.password,
  });

  const [, redraw] = useState();

  useEffect(() => {
    loginFormRef.current.username = loginFormInfo.username;
    loginFormRef.current.password = loginFormInfo.password;
    if (loginFormRef.current.username && loginFormRef.current.password) {
      onSubmit();
    }
    redraw({});
  }, [loginFormInfo]);

  const onChangeUsername = (value: string) => {
    loginFormRef.current.username = value;
  };

  const onChangePassword = (value: string) => {
    loginFormRef.current.password = value;
  };

  const onSubmit = () => {
    if (loginFormRef.current.username && loginFormRef.current.password) {
      const params = {
        username: loginFormRef.current.username,
        password: loginFormRef.current.password,
      };
      dispatch(loginForm(params));
      // dispatch(
      //   chatbotAddNewMessage(
      //     {
      //       sender: MESSAGE_SENDER.RESPONSE,
      //       showAvatar: true,
      //       text: 'Bạn đã đăng nhập thành công, chúc bạn giao dịch vui vẻ',
      //       timestamp: new Date(),
      //       type: MESSAGE_TYPE.TEXT,
      //       style: 'Success',
      //     },
      //     undefined,
      //     CHATBOT_ADD_USER_MESSAGE
      //   )
      // );
      props.openComponent &&
        dispatch(
          chatbotAddNewMessage(
            {
              sender: MESSAGE_SENDER.RESPONSE,
              showAvatar: true,
              timestamp: new Date(),
              type: MESSAGE_TYPE.COMPONENT,
              component: props.openComponent,
            },
            undefined,
            CHATBOT_ADD_USER_MESSAGE
          )
        );
      props.handleSuccessLogin && props.handleSuccessLogin();
      // redraw({});
    }
  };

  return (
    <Form className={`${styles.LoginForm}`} onSubmit={onSubmit}>
      {!infoAccount?.id && (
        <>
          <TextBox
            autoFocus={true}
            type={TEXTBOX_TYPE.TEXT}
            placeholder="Tài khoản"
            label="Tài khoản"
            onChangeText={onChangeUsername}
            value={loginFormRef.current.username}
          />
          <TextBox
            type={TEXTBOX_TYPE.PASSWORD}
            placeholder="Mật khẩu"
            label="Mật khẩu"
            submitOnEnter={true}
            onChangeText={onChangePassword}
            value={loginFormRef.current.password}
          />
          <Button type="submit" className={styles.ButtonLogin}>
            <span className={styles.IconLogin}></span>
            Đăng nhập
          </Button>
        </>
      )}
    </Form>
  );
};
