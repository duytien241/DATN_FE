import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Grid, Header, Image, Input } from 'semantic-ui-react';
import Cookie from 'js-cookie';
import Fallback from 'components/Fallback';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import DatePicker from 'elements/DatePicker';
import { State } from 'redux-saga/reducers';
import { BASE_IMAGE_URL, handleError, formatStringToDate, formatDateToString, COMP_TYPE } from 'utils/common';
import { queryCusInfo, updateCusInfo } from './actions';
import styles from './styles.scss';

interface UpdateInfoCusProps {
  compType?: COMP_TYPE;
  id_cus?: any;
}

export const UpdateInfoCus: React.FC<UpdateInfoCusProps> = (props: UpdateInfoCusProps) => {
  const { compType, id_cus } = props;
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const cusInfo = useSelector((state: State) => state.cusInfo);
  const updateCusInfoResult = useSelector((state: State) => state.updateCusInfoResult);
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null;

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
    if (cusInfo && cusInfo.data) {
      if (typeof cusInfo?.data === 'object') {
        userInfoRef.current.id = cusInfo.data[0].id;
        userInfoRef.current.name = cusInfo.data[0].Name;
        userInfoRef.current.SDT = cusInfo.data[0].SDT;
        userInfoRef.current.Address_P = cusInfo.data[0].Address;
        userInfoRef.current.Birth = formatStringToDate(cusInfo.data[0].Birth, 'dd/MM/yyyy');
        userInfoRef.current.Email_P = cusInfo.data[0].Email;
        userInfoRef.current.image = cusInfo.data[0].image;
        setRedraw({});
      }
    }
  }, [cusInfo]);

  useEffect(() => {
    if (updateCusInfoResult && updateCusInfoResult.data) {
      requestData();
      setRedraw({});
    }
  }, [updateCusInfoResult]);

  const requestData = () => {
    const params = {
      id: compType === COMP_TYPE.MODAL ? id_cus : userLogin.id,
    };
    dispatch(queryCusInfo(params));
  };

  const onChangeName = (value: string) => {
    userInfoRef.current.name = value;
  };

  const onChangePhone = (value: string) => {
    userInfoRef.current.SDT = value;
  };

  const onChangeAddressP = (value: string) => {
    userInfoRef.current.Address_P = value;
  };

  const onChangeBirth = (value: Date) => {
    userInfoRef.current.Birth = value;
  };

  const updateInfo = () => {
    const params = {
      id: userInfoRef.current.id,
      SDT: userInfoRef.current.SDT,
      Address_P: userInfoRef.current.Address_P,
      Birth: formatDateToString(userInfoRef.current.Birth),
      image: userInfoRef.current.image,
      email: userInfoRef.current.Email_P,
      accType: 'CUS',
    };

    dispatch(updateCusInfo(params));
  };

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfoRef.current.image = event.target.files as FileList;
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <div className={styles.UpdateInfoCus}>
        {compType !== COMP_TYPE.MODAL && (
          <Header as="h3" textAlign="center">
            Thông tin tài khoản
          </Header>
        )}
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
              {compType !== COMP_TYPE.MODAL && (
                <Input type="file" onChange={updateImage} accept="image/x-png,image/gif,image/jpeg" />
              )}
            </div>
            <TextBox
              className={'UsernameInput'}
              placeholder={'Họ và tên'}
              icon="user"
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              onChangeText={onChangeName}
              value={userInfoRef.current.name}
            />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Số điện thoại'}
              icon="phone"
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.SDT}
              onChangeText={onChangePhone}
            />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Địa chỉ'}
              icon="address book"
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.Address_P}
              onChangeText={onChangeAddressP}
            />
            <DatePicker
              value={userInfoRef.current.Birth}
              startDate={new Date()}
              maxDate={new Date()}
              onChange={onChangeBirth}
            />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Email'}
              icon="mail"
              disabled={true}
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.Email_P}
            />
            {compType !== COMP_TYPE.MODAL && <Button content="Lưu thông tin" onClick={updateInfo} color="blue" />}
          </Grid.Column>
        </Grid>
      </div>
    </ErrorBoundary>
  );
};
