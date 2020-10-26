import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, DropdownProps, Header, Icon, Modal } from 'semantic-ui-react';
import { Column } from 'react-table';
import { ErrorBoundary } from 'react-error-boundary';
import Cookie from 'js-cookie';
import Fallback from 'components/Fallback';
import DataTable from 'elements/Datatable';
import { FORM_TYPE, handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import { queryOrderShop, updateOrderShop, queryOrderStatus, queryOrderDetail } from './actions';
import styles from './styles.scss';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [type, setType] = useState(FORM_TYPE.CREATE);

  const orderList = useSelector((state: State) => state.orderList);
  const orderStatusList = useSelector((state: State) => state.orderStatusList);
  const updateOrderResult = useSelector((state: State) => state.updateOrderResult);
  const orderDetailShop = useSelector((state: State) => state.orderDetailShop);
  const [openModal, setOpenModal] = useState(false);
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string) : null;

  const ref = useRef<{
    columnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
    name: string;
    desc: string;
    id?: number;
    orderStatusList: Obj[];
    status: string;
    orderDetailList: Obj[];
    subColumnDefs: Obj[];
  }>({
    pageIndex: 0,
    columnDefs: [
      {
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        maxWidth: 50,
        Cell: ({ row }: any) => {
          return (
            <span {...row.getToggleRowExpandedProps()}>
              <span onClick={() => showOrderInfoDetail(row)}>{row.isExpanded ? '👇' : '👉'}</span>
            </span>
          );
        },
      },
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
              {'Cập nhật'}
            </Button>
          );
        },
        className: 'Right NoBorder',
        headerClassName: 'Right NoBorder',
        width: 55,
      },
    ],
    subColumnDefs: [
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
        Header: 'Tên món ăn',
        accessor: 'name',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'số lượng',
        accessor: 'qty',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Giá tiền',
        accessor: 'total',
        className: 'Center',
        width: 70,
      },
    ],
    data: [],
    orderDetailList: [],
    orderStatusList: [],
    status: '',
    name: '',
    desc: '',
  });

  useEffect(() => {
    requestData();
    requestOrderStatus();
  }, []);

  useEffect(() => {
    if (orderDetailShop && orderDetailShop.data) {
      if (typeof orderDetailShop?.data === 'object') {
        ref.current.orderDetailList = orderDetailShop?.data as Obj[];
      }
    }
    setRedraw({});
  }, [orderDetailShop]);

  useEffect(() => {
    if (orderStatusList && orderStatusList.data) {
      if (typeof orderStatusList?.data === 'object') {
        ref.current.orderStatusList = (orderStatusList?.data as Obj[]).map((item: Obj) => {
          return {
            key: item.id,
            text: item.status,
            value: item.status,
          };
        });
      }
    }
    setRedraw({});
  }, [orderStatusList]);

  useEffect(() => {
    if (orderList && orderList.data) {
      ref.current.data = orderList?.data as Obj[];
    }
    setRedraw({});
  }, [orderList]);

  useEffect(() => {
    if (updateOrderResult && updateOrderResult.data) {
      requestData();
      onClose();
    }
  }, [updateOrderResult]);

  const requestData = () => {
    const params = {
      id_user: userLogin.data.id,
    };

    dispatch(queryOrderShop(params));
  };

  const requestOrderStatus = () => {
    dispatch(queryOrderStatus());
  };

  const submitCreate = () => {
    const params = {
      id_user: userLogin.data.id,
      ...(type === FORM_TYPE.UPDATE && {
        id: ref.current.id,
        status: ref.current.status,
      }),
    };

    dispatch(updateOrderShop(params));
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

  const changeOrderStatus = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    ref.current.status = data.value as string;
    setRedraw({});
  };

  const renderRowSubComponent = React.useCallback(({ row }) => {
    return (
      <div className={styles.SubOrderManage}>
        <DataTable
          columns={(ref.current.subColumnDefs as unknown) as Column<object>[]}
          data={ref.current.orderDetailList as Obj[]}
        />
      </div>
    );
  }, []);

  const showOrderInfoDetail = (data: any) => {
    const params = {
      id: data.original.id,
    };
    dispatch(queryOrderDetail(params));
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Header>
        <Icon name="food" />
        Quản lý đơn hàng
      </Header>
      <div className={styles.OrderManage}>
        <DataTable
          columns={(ref.current.columnDefs as unknown) as Column<object>[]}
          data={ref.current.data as Obj[]}
          renderRowSubComponent={renderRowSubComponent}
          haveExpand={true}
        />
      </div>
      <Modal size="small" open={openModal} onClose={onClose} onOpen={() => setOpenModal(true)} closeIcon={true}>
        <Modal.Header>Trạng thái đơn hàng</Modal.Header>
        <Modal.Content>
          <Dropdown
            button
            className="icon"
            floating
            labeled
            options={ref.current.orderStatusList}
            text={(ref.current.status as string) ? ref.current.status : 'Choose Status'}
            onChange={changeOrderStatus}
          />
          <Button color="blue" onClick={submitCreate} content="Duyệt đơn hàng" />
        </Modal.Content>
      </Modal>
    </ErrorBoundary>
  );
};
