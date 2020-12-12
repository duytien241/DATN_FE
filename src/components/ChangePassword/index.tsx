import React, { useEffect, useRef, useState } from 'react';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import { Button, Grid, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from './actions';
import { State } from 'redux-saga/reducers';
import { isBlank } from 'utils/common';

interface ChangePasswordState {
  errorOldPasswordContent?: string;
  errorNewPasswordContent?: string;
  errorRetypePasswordContent?: string;
}

export default () => {
  const dispatch = useDispatch();
  const infoAccount = useSelector((state: State) => state.infoAccount);
  const loginPassword = useSelector((state: State) => state.loginPassword);
  const [state, setState] = useState<ChangePasswordState>({});

  const ref = useRef<{ oldPassword: string; newPassword: string; retypeNewPassword: string }>({
    oldPassword: '',
    newPassword: '',
    retypeNewPassword: '',
  });

  useEffect(() => {
    if (loginPassword && loginPassword.success) {
    }
  }, [loginPassword]);

  const validateOldPass = () => {
    let errorOldPassContent = '';
    if (isBlank(ref.current.oldPassword)) {
      errorOldPassContent = 'Mật khẩu cũ không được để trống';
    }

    return errorOldPassContent;
  };

  const validateNewPassword = () => {
    let errorNewPasswordContent = '';
    if (isBlank(ref.current.newPassword)) {
      errorNewPasswordContent = 'Mật khẩu mới không được để trống';
    } else if (ref.current.newPassword.length < 8) {
      errorNewPasswordContent = 'Mật khẩu mới phải nhiều hơn 8 ký tự';
    }

    return errorNewPasswordContent;
  };

  const validateRetypeNewPassword = () => {
    let errorRetypeNewPasswordContent = '';
    if (isBlank(ref.current.retypeNewPassword)) {
      errorRetypeNewPasswordContent = 'Mật khẩu mới không được để trống';
    } else if (ref.current.retypeNewPassword !== ref.current.newPassword) {
      errorRetypeNewPasswordContent = 'Mật khẩu xác nhận cần giống mật khẩu mới';
    } else if (ref.current.newPassword.length < 8) {
      errorRetypeNewPasswordContent = 'Mật khẩu mới phải nhiều hơn 8 ký tự';
    }

    return errorRetypeNewPasswordContent;
  };

  const validateChangePassword = () => {
    const errorOldPasswordContent = validateOldPass();
    const errorNewPasswordContent = validateNewPassword();
    const errorRetypePasswordContent = validateRetypeNewPassword();

    setState((prevState) => ({
      ...prevState,
      errorOldPasswordContent,
      errorNewPasswordContent,
      errorRetypePasswordContent,
    }));

    return {
      errorOldPassword: !isBlank(errorOldPasswordContent),
      errorNewPassword: !isBlank(errorNewPasswordContent),
      errorRetypePassword: !isBlank(errorRetypePasswordContent),
    };
  };

  const onChangeOldPassword = (value: string) => {
    ref.current.oldPassword = value;
  };

  const onChangeNewPassword = (value: string) => {
    ref.current.newPassword = value;
  };

  const onChangeRetypeNewPassword = (value: string) => {
    ref.current.retypeNewPassword = value;
  };

  const onChangePassword = () => {
    const { errorOldPassword, errorNewPassword, errorRetypePassword } = validateChangePassword();
    if (errorOldPassword !== true && errorNewPassword !== true && errorRetypePassword !== null) {
      const params = {
        id: infoAccount?.id,
        oldPass: ref.current.oldPassword,
        newPass: ref.current.newPassword,
      };
      dispatch(changePassword(params));
    }
  };
  console.log();

  return (
    <>
      <Header as="h3" textAlign="center">
        Đổi mật khẩu
      </Header>
      <Grid centered columns={3}>
        <Grid.Column>
          <TextBox
            className={'PasswordInput'}
            placeholder={'Mật khẩu cũ'}
            icon="lock"
            iconPosition="left"
            type={TEXTBOX_TYPE.PASSWORD}
            onChangeText={onChangeOldPassword}
            errorContent={state.errorOldPasswordContent}
          />
          <TextBox
            className={'PasswordInput'}
            placeholder={'Mật khẩu mới'}
            icon="lock"
            iconPosition="left"
            type={TEXTBOX_TYPE.PASSWORD}
            onChangeText={onChangeNewPassword}
            errorContent={state.errorNewPasswordContent}
          />
          <TextBox
            className={'PasswordInput'}
            placeholder={'Nhập lại mật khẩu mới'}
            icon="lock"
            iconPosition="left"
            type={TEXTBOX_TYPE.PASSWORD}
            onChangeText={onChangeRetypeNewPassword}
            errorContent={state.errorRetypePasswordContent}
          />
          <Button color="blue" content="Đổi mật khẩu" onClick={onChangePassword} />
        </Grid.Column>
      </Grid>
    </>
  );
};
