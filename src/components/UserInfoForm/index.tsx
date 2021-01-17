import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Dropdown, DropdownProps, Grid, Header, Image, Input } from 'semantic-ui-react';
import Fallback from 'components/Fallback';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import TextArea from 'elements/TextArea';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import { BASE_IMAGE_URL, COMP_TYPE, handleError } from 'utils/common';
import { updateUserInfo } from 'components/RegisterShop/actions';
import { queryShopInfo, queryShopType } from 'components/actions';
import styles from './styles.scss';

interface UserInfoFormProps {
  compType?: COMP_TYPE;
  id_user?: any;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = (props: UserInfoFormProps) => {
  const dispatch = useDispatch();
  const { compType, id_user } = props;
  const [, setRedraw] = useState();
  const shopType = useSelector((state: State) => state.shopType);
  const userShopInfo = useSelector((state: State) => state.userShopInfo);
  const shopUpdateInfoResult = useSelector((state: State) => state.shopUpdateInfoResult);
  const infoAccount = useSelector((state: State) => state.infoAccount);

  const userInfoRef = useRef<{
    id?: number;
    name: string;
    NameR: string;
    SDT: string;
    Address_R: string;
    F_type: number;
    F_type_string?: string;
    idNo: string;
    Email_R: string;
    BankNum: string;
    BankCore: string;
    Role: number;
    desc: string;
    shopTypeList: Obj[];
    image?: FileList;
  }>({
    name: '',
    NameR: '',
    SDT: '',
    Address_R: '',
    F_type: 0,
    idNo: '',
    Email_R: '',
    BankNum: '',
    BankCore: '',
    Role: 1,
    shopTypeList: [],
    desc: '',
  });

  useEffect(() => {
    requestDataShopType();
    requestData();
  }, []);

  useEffect(() => {
    if (userShopInfo && userShopInfo.data) {
      if (typeof userShopInfo?.data === 'object') {
        userInfoRef.current.id = userShopInfo.data[0].id;
        userInfoRef.current.name = userShopInfo.data[0].Name;
        userInfoRef.current.SDT = userShopInfo.data[0].SDT;
        userInfoRef.current.idNo = userShopInfo.data[0].idNo;
        userInfoRef.current.NameR = userShopInfo.data[0].NameR;
        userInfoRef.current.Address_R = userShopInfo.data[0].Address_R;
        userInfoRef.current.Email_R = userShopInfo.data[0].Email_R;
        userInfoRef.current.BankCore = userShopInfo.data[0].BankCore;
        userInfoRef.current.BankNum = userShopInfo.data[0].BankNum;
        userInfoRef.current.desc = userShopInfo.data[0].desc;
        userInfoRef.current.F_type = userShopInfo.data[0].F_type;
        userInfoRef.current.image = userShopInfo.data[0].image;
        const text = userInfoRef.current.shopTypeList.find((item) => item.value === userShopInfo.data![0].F_type)?.text;
        userInfoRef.current.F_type_string = text as string;
        setRedraw({});
      }
    }
  }, [userShopInfo]);

  useEffect(() => {
    if (shopType && shopType.data) {
      if (typeof shopType?.data === 'object') {
        userInfoRef.current.shopTypeList = (shopType.data as Obj[]).map((item: Obj) => {
          return {
            key: item.id,
            text: item.name,
            value: item.id,
          };
        });
        const text = userInfoRef.current.shopTypeList.find((item) => item.value === userInfoRef.current.F_type)?.text;
        userInfoRef.current.F_type_string = text as string;
        setRedraw({});
      }
    }
  }, [shopType]);

  useEffect(() => {
    if (shopUpdateInfoResult && shopUpdateInfoResult.data) {
      requestData();
      setRedraw({});
    }
  }, [shopUpdateInfoResult]);

  const requestData = () => {
    const params = {
      id: compType === COMP_TYPE.MODAL ? id_user : infoAccount?.id,
    };
    dispatch(queryShopInfo(params));
  };

  const requestDataShopType = () => {
    dispatch(queryShopType());
  };

  const onChangeName = (value: string) => {
    userInfoRef.current.name = value;
  };

  const onChangePhone = (value: string) => {
    userInfoRef.current.SDT = value;
  };

  const onChangeIDNo = (value: string) => {
    userInfoRef.current.idNo = value;
  };

  const onChangeAddressR = (value: string) => {
    userInfoRef.current.Address_R = value;
  };

  const changeShopType = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    const text = userInfoRef.current.shopTypeList.find((item) => item.value === data.value)?.text;
    userInfoRef.current.F_type = data.value as number;
    userInfoRef.current.F_type_string = text as string;
    setRedraw({});
  };

  const onChangeDesc = (value: string) => {
    userInfoRef.current.desc = value;
  };

  const updateInfo = () => {
    const params = {
      id: userInfoRef.current.id,
      SDT: userInfoRef.current.SDT,
      Address_R: userInfoRef.current.Address_R,
      F_type: userInfoRef.current.F_type,
      idNo: userInfoRef.current.idNo,
      BankNum: userInfoRef.current.BankNum,
      BankCore: userInfoRef.current.BankCore,
      desc: userInfoRef.current.desc,
      image: userInfoRef.current.image,
    };

    dispatch(updateUserInfo(params));
  };

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfoRef.current.image = event.target.files as FileList;
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <div className={styles.UserInfoForm}>
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
              placeholder={'CNND/CCCD'}
              icon="id card"
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              onChangeText={onChangeIDNo}
              value={userInfoRef.current.idNo}
            />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Tên cửa hàng'}
              icon="shop"
              disabled={true}
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.NameR}
            />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Địa chỉ cửa hàng'}
              icon="address book"
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.Address_R}
              onChangeText={onChangeAddressR}
            />
            <Dropdown
              button
              className="icon"
              floating
              labeled
              options={userInfoRef.current.shopTypeList}
              text={(userInfoRef.current.F_type_string as string) ? userInfoRef.current.F_type_string : 'Choose Type'}
              onChange={changeShopType}
            />
            <TextBox
              className={'UsernameInput'}
              placeholder={'Email'}
              icon="mail"
              disabled={true}
              iconPosition="left"
              type={TEXTBOX_TYPE.TEXT}
              value={userInfoRef.current.Email_R}
            />
            <TextArea placeholder="Nhập mô tả cửa hàng" value={userInfoRef.current.desc} onChangeText={onChangeDesc} />
            {compType !== COMP_TYPE.MODAL && <Button content="Lưu thông tin" onClick={updateInfo} color="blue" />}
          </Grid.Column>
        </Grid>
      </div>
    </ErrorBoundary>
  );
};
