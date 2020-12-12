import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { Column } from 'react-table';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'components/Fallback';
import DataTable from 'elements/Datatable';
import { COMP_TYPE, handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import { queryHistory } from 'components/AdminHistory/actions';
import { queryOrderDetail } from 'components/OrderManage/actions';
import styles from './styles.scss';
import { updateOrderShop } from 'components/OrderManage/actions';

interface OrderManageCusProps {
  compType?: COMP_TYPE;
  id_cus?: any;
}

export const OrderManageCus: React.FC<OrderManageCusProps> = (props: OrderManageCusProps) => {
  const { compType, id_cus } = props;
  const dispatch = useDispatch();
  const [, setRedraw] = useState();

  const historyList = useSelector((state: State) => state.historyList);
  const [openModal, setOpenModal] = useState(false);
  const infoAccount = useSelector((state: State) => state.infoAccount);
  const orderDetailShop = useSelector((state: State) => state.orderDetailShop);
  const updateOrderResult = useSelector((state: State) => state.updateOrderResult);

  const ref = useRef<{
    columnDefs: Obj[];
    subColumnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
    name: string;
    desc: string;
    id?: number;
    status: string;
    orderDetailList: Obj[];
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
                  showOrderDetail(row);
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
        Header: 'Phương thức thanh toán',
        accessor: 'payType',
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
        Header: 'Tổng tiền',
        accessor: 'total',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Ngày tạo',
        accessor: 'create_at',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Ngày cập nhật',
        accessor: 'update_at',
        className: 'Center',
        width: 70,
      },
      {
        Header: '',
        accessor: 'update',
        Cell: (data: any) => {
          return (
            data.row.original.status === 'Đang chờ' && (
              <Button className={styles.Update} onClick={() => showIgnoreForm(data.row.original)} negative>
                {'Hủy'}
              </Button>
            )
          );
        },
        className: 'Right NoBorder',
        headerClassName: 'Right NoBorder',
        width: 70,
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
        Header: 'Số lượng',
        accessor: 'qty',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Giá',
        accessor: 'price',
        className: 'Center',
        width: 70,
      },
    ],
    data: [],
    orderDetailList: [],
    name: '',
    desc: '',
    status: '',
  });

  useEffect(() => {
    requestData();
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
    if (historyList && historyList.data) {
      ref.current.data = historyList?.data as Obj[];
    }
    setRedraw({});
  }, [historyList]);

  useEffect(() => {
    if (updateOrderResult && updateOrderResult.data) {
      requestData();
      onClose();
    }
  }, [updateOrderResult]);

  const requestData = () => {
    const params = {
      id_cus: compType === COMP_TYPE.MODAL ? id_cus : infoAccount?.id,
    };

    dispatch(queryHistory(params));
  };

  const showOrderDetail = (data: any) => {
    const params = {
      id: data.original.id,
    };
    dispatch(queryOrderDetail(params));
  };

  const showIgnoreForm = (data: Obj) => {
    ref.current.id = data.id as number;
    setOpenModal(true);
  };

  const submitCreate = () => {
    const params = {
      // id_cus: infoAccount.id,
      // ...(type === FORM_TYPE.UPDATE && {
      id: ref.current.id,
      status: 4,
      // }),
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

  // const showUpdateForm = (data: Obj) => {
  //   ref.current.name = data.name as string;
  //   ref.current.desc = data.desc as string;
  //   ref.current.id = data.id as number;
  //   ref.current.status = data.status as string;
  //   setOpenModal(true);
  //   setType(FORM_TYPE.UPDATE);
  //   setRedraw({});
  // };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      {compType !== COMP_TYPE.MODAL && (
        <Header>
          <Icon name="food" />
          Lịch sử đặt món
        </Header>
      )}
      <div className={styles.OrderManageCus}>
        <DataTable
          haveExpand={true}
          renderRowSubComponent={renderRowSubComponent}
          columns={(ref.current.columnDefs as unknown) as Column<object>[]}
          data={ref.current.data as Obj[]}
        />
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
