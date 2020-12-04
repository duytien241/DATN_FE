import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Breadcrumb, Header, Icon } from 'semantic-ui-react';
import { Column } from 'react-table';
import { Obj } from 'interfaces/common';
import Fallback from 'components/Fallback';
import DataTable from 'elements/Datatable';
import { queryHistory } from './actions';
import { handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const historyList = useSelector((state: State) => state.historyList);

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (historyList && historyList.data) {
      ref.current.data = historyList?.data as Obj[];
    }
    setRedraw({});
  }, [historyList]);

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
    ],
    data: [],
  });

  const requestData = () => {
    dispatch(queryHistory());
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Breadcrumb>
        <Breadcrumb.Section link>Manage</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link active>
          History
        </Breadcrumb.Section>
      </Breadcrumb>
      <Header>
        <Icon name="food" />
        Thống kê
      </Header>
      <div className={styles.AdminHistory}>
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
    </ErrorBoundary>
  );
};
