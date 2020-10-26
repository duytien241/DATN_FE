import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { Column } from 'react-table';
import { ErrorBoundary } from 'react-error-boundary';
import Cookie from 'js-cookie';
import Fallback from 'components/Fallback';
import DataTable from 'elements/Datatable';
import { FORM_TYPE, handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import styles from './styles.scss';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [type, setType] = useState(FORM_TYPE.CREATE);

  const orderList = useSelector((state: State) => state.orderList);
  const [openModal, setOpenModal] = useState(false);
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string).data : null;

  const ref = useRef<{
    columnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
    name: string;
    desc: string;
    id?: number;
    status: string;
  }>({
    pageIndex: 0,
    columnDefs: [
      {
        Header: 'STT',
        maxWidth: 50,
        accessor: 'id',
        filterable: false,
        className: 'Center',
        Cell: (data: any) => {
          return <span>{data.row.index + 1}</span>;
        },
      },
      {
        Header: 'Price',
        accessor: 'price',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Quantity',
        accessor: 'qty',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'pay',
        accessor: 'pay',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Mô tả',
        accessor: 'note',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'status',
        accessor: 'status',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Total',
        accessor: 'total',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'create_at',
        accessor: 'create_at',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'update_at',
        accessor: 'update_at',
        className: 'Center',
        width: 70,
      },
      {
        Header: '',
        accessor: 'update',
        Cell: (data: any) => {
          return (
            <Button positive onClick={() => showUpdateForm(data.row.original)}>
              {'Hủy đơn hàng'}
            </Button>
          );
        },
        className: 'Right NoBorder',
        headerClassName: 'Right NoBorder',
        width: 55,
      },
    ],
    data: [],
    name: '',
    desc: '',
    status: '',
  });

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (orderList && orderList.data) {
      ref.current.data = orderList?.data as Obj[];
    }
    setRedraw({});
  }, [orderList]);

  const requestData = () => {
    const params = {
      id_user: userLogin.id,
    };

    console.log(params);
  };

  const submitCreate = () => {
    const params = {
      id_user: userLogin.id,
      ...(type === FORM_TYPE.UPDATE && {
        id: ref.current.id,
        status: ref.current.status,
      }),
    };

    dispatch(params);
  };

  const onClose = () => {
    ref.current.name = '';
    ref.current.desc = '';
    ref.current.id = undefined;
    ref.current.status = '';
    setOpenModal(false);
  };

  const showUpdateForm = (data: Obj) => {
    ref.current.name = data.name as string;
    ref.current.desc = data.desc as string;
    ref.current.id = data.id as number;
    ref.current.status = data.status as string;
    setOpenModal(true);
    setType(FORM_TYPE.UPDATE);
    setRedraw({});
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Header>
        <Icon name="food" />
        Lịch sử đặt món
      </Header>
      <div className={styles.OrderManageCus}>
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
      <Modal size="small" open={openModal} onClose={onClose} onOpen={() => setOpenModal(true)} closeIcon={true}>
        <Modal.Header>Trạng thái đơn hàng</Modal.Header>
        <Modal.Content>
          <Button color="blue" onClick={submitCreate} content="Hủy đơn hàng" />
        </Modal.Content>
      </Modal>
    </ErrorBoundary>
  );
};
