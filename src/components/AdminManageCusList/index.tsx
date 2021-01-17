import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
// import Cookie from 'js-cookie';
import { Breadcrumb, Button, Header, Icon, Modal, Tab } from 'semantic-ui-react';
import { Column } from 'react-table';
import { Obj } from 'interfaces/common';
import Fallback from 'components/Fallback';
import DataTable from 'elements/Datatable';
import { queryCusList, deleteCus } from './actions';
import { COMP_TYPE, handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';
import { UpdateInfoCus } from 'components/UpdateInfoCus';
import { OrderManageCus } from 'components/OrderManageCus';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const cusList = useSelector((state: State) => state.cusList);
  const deleteCusResult = useSelector((state: State) => state.deleteCusResult);

  const cusListRef = useRef<{
    name: string;
    price: number;
    info: string;
    image?: FileList;
    id?: number;
  }>({
    name: '',
    price: 0,
    info: '',
  });

  useEffect(() => {
    if (deleteCusResult && deleteCusResult.data) {
      requestData();
      onClose();
    }
  }, [deleteCusResult]);

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    console.log(cusList);
    if (cusList && cusList.data) {
      ref.current.data = (cusList?.data as Obj).results as Obj[];
    }
    setRedraw({});
  }, [cusList]);

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
        Header: 'Tên đăng nhập',
        accessor: 'username',
        className: 'Center',
        width: 170,
      },
      {
        Header: 'Email',
        accessor: 'email',
        className: 'Center',
        width: 170,
      },
      {
        Header: 'Tên khách hàng',
        accessor: 'first_name',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'SĐT',
        accessor: 'phone',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Ngày sinh',
        accessor: 'birthday',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Địa chỉ',
        accessor: 'address',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'avatar',
        accessor: 'image',
        className: 'Center',
        width: 70,
        Cell: (data: any) => {
          return <img src={`${data.row.original.image}`} className={styles.FoodImage} />;
        },
      },
      {
        Header: 'Hủy kích hoạt',
        accessor: 'sell',
        Cell: (data: any) => {
          return (
            <Button className={styles.Hidden} negative onClick={() => showDeleteForm(data.row.original)}>
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
    dispatch(queryCusList());
  };

  const showDeleteForm = (data: Obj) => {
    cusListRef.current.id = data.id as number;
    setOpenModal(true);
  };

  const submitDelete = () => {
    const params = {
      id: cusListRef.current.id,
    };
    dispatch(deleteCus(params));
  };

  const onClose = () => {
    cusListRef.current.name = '';
    cusListRef.current.info = '';
    cusListRef.current.price = 0;
    cusListRef.current.image = undefined;
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
          Danh sách khách đăng ký
        </Breadcrumb.Section>
      </Breadcrumb>
      <Header>
        <Icon name="user" />
        Quản lý khách hàng
      </Header>
      <div className={styles.AdminManageCusList}>
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
      <Modal
        size="small"
        closeIcon={true}
        open={openModal}
        onClose={onClose}
        onOpen={() => setOpenModal(true)}
        mountNode={document.querySelector('.AdminManageCusList')}
      >
        <Modal.Header>Hủy kích hoạt người dùng</Modal.Header>
        <Modal.Content>
          <div className={'FoodForm'}>
            <div className={'HeaderFoodForm'}>Bạn có chắc muốn hủy kích hoạt người dùng này</div>
            <div className={'InputFoodForm'}>
              <Button onClick={submitDelete} content="Xác nhận" />
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
        mountNode={document.querySelector('.AdminManageCusList')}
      >
        <Modal.Header>{'Chi tiết khách đăng ký'}</Modal.Header>
        <Modal.Content>
          <div className={'FoodForm'}>
            <Tab
              panes={[
                {
                  menuItem: 'Thông tin cá nhân',
                  render: () => (
                    <Tab.Pane>
                      <UpdateInfoCus compType={COMP_TYPE.MODAL} id_cus={cusListRef.current.id} />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: 'Lịch sử đặt hàng',
                  render: () => (
                    <Tab.Pane>
                      <OrderManageCus compType={COMP_TYPE.MODAL} id_cus={cusListRef.current.id} />
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
