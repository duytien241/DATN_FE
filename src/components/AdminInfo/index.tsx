import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Grid, Header, Image, Input } from 'semantic-ui-react';
import Fallback from 'components/Fallback';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import DatePicker from 'elements/DatePicker';
import { State } from 'redux-saga/reducers';
import { BASE_IMAGE_URL, handleError, formatStringToDate } from 'utils/common';
import { queryAdminInfo } from './actions';
import styles from './styles.scss';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const adminInfo = useSelector((state: State) => state.adminInfo);
  const infoAccount = useSelector((state: State) => state.infoAccount);

  const userInfoRef = useRef<{
    id?: number;
    name: string;
    SDT: string;
    Address_P: string;
    Email_P: string;
    Birth?: Date;
    image?: FileList;
  }>({
    name: '',
    SDT: '',
    Address_P: '',
    Email_P: '',
    Birth: undefined,
  });

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (adminInfo && adminInfo.data) {
      if (infoAccount) {
        userInfoRef.current.id = infoAccount.id as number;
        userInfoRef.current.name = infoAccount.first_name as string;
        userInfoRef.current.SDT = infoAccount.phone as string;
        userInfoRef.current.Address_P = infoAccount.address as string;
        userInfoRef.current.Birth = formatStringToDate(infoAccount.birthday as string);
        userInfoRef.current.Email_P = infoAccount.email as string;
        userInfoRef.current.image = infoAccount.avatar as FileList;
        setRedraw({});
      }
    }
  }, [adminInfo]);

  const requestData = () => {
    const params = {
      id_user: infoAccount?.id,
    };
    dispatch(queryAdminInfo(params));
  };

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfoRef.current.image = event.target.files as FileList;
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <div className={styles.AdminInfo}>
        <Header as="h3" textAlign="center">
          Thông tin tài khoản
        </Header>
        <Grid centered columns={3}>
          <Grid.Column>
            <div className={styles.FormImage}>
              <Image
                src={
                  userInfoRef.current.image
                    ? `${BASE_IMAGE_URL}${userInfoRef.current.image}`
                    : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
                }
                size="small"
              />
              <Input type="file" onChange={updateImage} accept="image/x-png,image/gif,image/jpeg" />
            </div>
            <TextBox
              className={'UsernameInput'}
              placeholder={'Họ và tên'}
              icon="user"
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.name}
            />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Số điện thoại'}
              icon="phone"
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.SDT}
            />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Địa chỉ'}
              icon="address book"
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.Address_P}
            />
            <DatePicker value={userInfoRef.current.Birth} startDate={new Date()} maxDate={new Date()} />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Email'}
              icon="mail"
              disabled={true}
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.Email_P}
            />
          </Grid.Column>
        </Grid>
      </div>
    </ErrorBoundary>
  );
};
