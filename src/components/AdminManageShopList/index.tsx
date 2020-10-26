import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import Cookie from 'js-cookie';
import { Breadcrumb, Button, Header, Icon, Modal } from 'semantic-ui-react';
import { Column } from 'react-table';
import { Obj } from 'interfaces/common';
import Fallback from 'components/Fallback';
import DataTable from 'elements/Datatable';
import { queryFoodList } from 'components/actions';
import { decisionShopRegister } from 'components/ShopRegisterPending/actions';
import { FORM_TYPE, handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState(FORM_TYPE.CREATE);
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null;
  const shopList = useSelector((state: State) => state.shopList);
  const decisionShopResult = useSelector((state: State) => state.decisionShopResult);

  const foodFormRef = useRef<{ id?: number }>({});

  useEffect(() => {
    if (decisionShopResult && decisionShopResult.data) {
      requestData();
      onClose();
    }
  }, [decisionShopResult]);

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (shopList && shopList.data) {
      ref.current.data = shopList?.data as Obj[];
      console.log(ref.current.data);
    }
    setRedraw({});
  }, [shopList]);

  const ref = useRef<{
    columnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
  }>({
    pageIndex: 0,
    columnDefs: [
      {
        Header: 'STT',
        maxWidth: 50,
        accessor: 'index',
        filterable: false,
        className: 'Center',
        Cell: (data: any) => {
          return <span>{data.row.index + 1}</span>;
        },
      },
      {
        Header: 'Tên cửa hàng',
        accessor: 'NameR',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Địa chỉ',
        accessor: 'Address_R',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Email',
        accessor: 'Email_R',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Mô tả',
        accessor: 'desc',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Ngân hàng thụ hưởng',
        accessor: 'BankCore',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Số tài khoản',
        accessor: 'BankNum',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Ngày đăng ký',
        accessor: 'create_at',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'SĐT',
        accessor: 'SDT',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Đánh giá',
        accessor: 'avg_rating',
        className: 'Center',
        width: 70,
      },
      {
        Header: '',
        accessor: 'sell',
        Cell: (data: any) => {
          return (
            <Button className={styles.Hidden} negative onClick={() => showRefuseForm(data.row.original)}>
              {'Xóa'}
            </Button>
          );
        },
        className: 'Right',
        width: 55,
      },
    ],
    data: [],
  });

  const requestData = () => {
    dispatch(queryFoodList());
  };

  const showRefuseForm = (data: Obj) => {
    foodFormRef.current.id = data.id as number;
    setType(FORM_TYPE.DELETE);
    setOpenModal(true);
  };

  const submit = () => {
    const params = {
      id_user: userLogin.id,
      result: 'IGNORE',
    };
    dispatch(decisionShopRegister(params));
  };

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Breadcrumb>
        <Breadcrumb.Section link>Manage</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link active>
          Pending shop list
        </Breadcrumb.Section>
      </Breadcrumb>
      <Header>
        <Icon name="food" />
        Quản lý đăng ký cửa hàng
      </Header>
      <div className={styles.AdminManageShopList}>
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
      <Modal
        size="small"
        closeIcon={true}
        open={openModal}
        onClose={onClose}
        onOpen={() => setOpenModal(true)}
        mountNode={document.querySelector('.AdminManageShopList')}
      >
        <Modal.Header>{type === FORM_TYPE.UPDATE ? 'Duyệt cửa hàng' : 'Từ chối đăng ký'}</Modal.Header>
        <Modal.Content>
          <div className={'FoodForm'}>
            <div className={'HeaderFoodForm'}>
              {type === FORM_TYPE.CREATE ? 'Xác nhận duyệt đăng ký cửa hàng' : 'Từ chối đăng ký của cửa hàng'}
            </div>
            <div className={'InputFoodForm'}>
              <Button onClick={submit} content="Xác nhận" />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </ErrorBoundary>
  );
};
