import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Breadcrumb, Button, Header, Icon, Modal, Tab } from 'semantic-ui-react';
import { Column } from 'react-table';
import { Obj } from 'interfaces/common';
import Fallback from 'components/Fallback';
import DataTable from 'elements/Datatable';
import { queryShopList } from 'components/actions';
import { decisionShopRegister } from 'components/ShopRegisterPending/actions';
import { COMP_TYPE, handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';
import { FoodManage } from 'components/FoodManage';
import { UserInfoForm } from 'components/UserInfoForm';
import { StatisticalManage } from 'components/StatisticalManage';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
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
        width: 170,
      },
      {
        Header: 'Địa chỉ',
        accessor: 'Address_R',
        className: 'Center',
        width: 170,
      },
      {
        Header: 'Email',
        accessor: 'Email_R',
        className: 'Center',
        width: 200,
      },
      {
        Header: 'Mô tả',
        accessor: 'desc',
        className: 'Center',
        width: 170,
      },
      {
        Header: 'Ngân hàng thụ hưởng',
        accessor: 'BankCore',
        className: 'Center',
        width: 170,
      },
      {
        Header: 'Số tài khoản',
        accessor: 'BankNum',
        className: 'Center',
        width: 100,
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
        accessor: 'detail',
        Cell: (data: any) => {
          return (
            <Button className={styles.Hidden} positive onClick={() => showDetailForm(data.row.original)}>
              {'Chi tiết'}
            </Button>
          );
        },
        className: 'Right',
        width: 55,
      },
      {
        Header: '',
        accessor: 'delete',
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
    dispatch(queryShopList());
  };

  const showRefuseForm = (data: Obj) => {
    foodFormRef.current.id = data.id as number;
    setOpenModal(true);
  };

  const showDetailForm = (data: Obj) => {
    foodFormRef.current.id = data.id as number;
    setOpenDetailModal(true);
  };

  const submit = () => {
    const params = {
      id_user: foodFormRef.current.id,
      result: 'IGNORE',
    };
    dispatch(decisionShopRegister(params));
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const onCloseDetail = () => {
    setOpenDetailModal(false);
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Breadcrumb>
        <Breadcrumb.Section link>Quản lý</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link active>
          Danh sách cửa hàng
        </Breadcrumb.Section>
      </Breadcrumb>
      <Header>
        <Icon name="food" />
        Danh sách cửa hàng
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
        <Modal.Header>{'Hủy kích hoạt cửa hàng'}</Modal.Header>
        <Modal.Content>
          <div className={'FoodForm'}>
            <div className={'HeaderFoodForm'}>Từ chối đăng ký của cửa hàng</div>
            <div className={'InputFoodForm'}>
              <Button onClick={submit} content="Xác nhận" />
            </div>
          </div>
        </Modal.Content>
      </Modal>
      <Modal
        size="large"
        closeIcon={true}
        open={openDetailModal}
        onClose={onCloseDetail}
        onOpen={() => setOpenDetailModal(true)}
        mountNode={document.querySelector('.AdminManageShopList')}
      >
        <Modal.Header>{'Chi tiết cửa hàng'}</Modal.Header>
        <Modal.Content>
          <div className={'FoodForm'}>
            <Tab
              panes={[
                {
                  menuItem: 'Thông tin cá nhân',
                  render: () => (
                    <Tab.Pane>
                      <UserInfoForm compType={COMP_TYPE.MODAL} id_user={foodFormRef.current.id} />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: 'Thông tin món ăn',
                  render: () => (
                    <Tab.Pane>
                      <FoodManage compType={COMP_TYPE.MODAL} id_user={foodFormRef.current.id} />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: 'Thống kê đơn hàng',
                  render: () => (
                    <Tab.Pane>
                      <StatisticalManage compType={COMP_TYPE.MODAL} id_user={foodFormRef.current.id} />
                    </Tab.Pane>
                  ),
                },
              ]}
            />
          </div>
        </Modal.Content>
      </Modal>
    </ErrorBoundary>
  );
};
