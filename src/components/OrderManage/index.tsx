import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Button, Dropdown, DropdownProps, Header, Icon, Modal } from 'semantic-ui-react';
import { Column } from 'react-table';
import { ErrorBoundary } from 'react-error-boundary';
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
  const updateOrderResult = useSelector((state: State) => state.updateOrderResult);
  const orderDetailShop = useSelector((state: State) => state.orderDetailShop);
  const [openModal, setOpenModal] = useState(false);
  const infoAccount = useSelector((state: State) => state.infoAccount);

  const orderStatusList: Obj[] = [
    {
      text: 'Chưa giao hàng',
      value: 'Chưa giao hàng',
    },
    {
      text: 'Đã giao hàng',
      value: 'Đã giao hàng',
    },
    {
      text: 'Đã hủy',
      value: 'Đã hủy',
    },
  ];
  const ref = useRef<{
    columnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
    name: string;
    desc: string;
    id?: number;
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
        Cell: ({ row, rows, toggleRowExpanded }: any) => {
          return (
            <span {...row.getToggleRowExpandedProps()}>
              <span
                onClick={() => {
                  showOrderInfoDetail(row);
                  const expandedRow = rows.find((row2: any) => {
                    return row2.isExpanded;
                  });
                  if (expandedRow) {
                    const isSubItemOfRow = Boolean(expandedRow && row.id.split('.')[0] === expandedRow.id);

                    if (isSubItemOfRow) {
                      const expandedSubItem = expandedRow.subRows.find((subRow: any) => subRow.isExpanded);

                      if (expandedSubItem) {
                        const isClickedOnExpandedSubItem = expandedSubItem.id === row.id;
                        if (!isClickedOnExpandedSubItem) {
                          toggleRowExpanded(expandedSubItem.id, false);
                        }
                      }
                    } else {
                      toggleRowExpanded(expandedRow.id, false);
                    }
                  }
                }}
              >
                {row.isExpanded ? '👇' : '👉'}
              </span>
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
        Header: 'HTTT',
        accessor: 'payType',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Người đặt',
        accessor: 'Name',
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
        Header: 'Trạng thái',
        accessor: 'status',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Tổng tiền',
        accessor: 'total',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Tạo lúc',
        accessor: 'create_at',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Cập nhật lúc',
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
        accessor: 'item',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'số lượng',
        accessor: 'quantity',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Giá tiền',
        accessor: 'price',
        className: 'Center',
        width: 70,
      },
    ],
    data: [],
    orderDetailList: [],
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
      id_user: infoAccount?.id,
    };

    dispatch(queryOrderShop(params));
  };

  const requestOrderStatus = () => {
    dispatch(queryOrderStatus());
  };

  const submitCreate = () => {
    const params = {
      id_user: infoAccount?.id,
      ...(type === FORM_TYPE.UPDATE && {
        id: ref.current.id,
        status: orderStatusList.find((obj) => obj.value === ref.current.status)!.key,
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
    console.log(row);
    return (
      <div className={styles.SubOrderManage}>
        <DataTable
          columns={(ref.current.subColumnDefs as unknown) as Column<object>[]}
          data={(row.original as Obj).order_detail as Obj[]}
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
      <Breadcrumb>
        <Breadcrumb.Section link>Quản lý</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link active>
          Quản lý đơn hàng
        </Breadcrumb.Section>
      </Breadcrumb>
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
            options={orderStatusList}
            text={(ref.current.status as string) ? ref.current.status : 'Choose Status'}
            onChange={changeOrderStatus}
          />
          <Button color="blue" onClick={submitCreate} content="Duyệt đơn hàng" />
        </Modal.Content>
      </Modal>
    </ErrorBoundary>
  );
};
