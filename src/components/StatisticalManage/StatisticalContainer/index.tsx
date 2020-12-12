import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import DatePickerLib from 'react-datepicker';
import { Column } from 'react-table';
import Cookie from 'js-cookie';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';
import { queryStatisticalOrder } from './actions';
import { Obj } from 'interfaces/common';
import Fallback from 'components/Fallback';
import { COMP_TYPE, handleError, quarterOfTheYear } from 'utils/common';
import DataTable from 'elements/Datatable';
import { State } from 'redux-saga/reducers';
import { STATISTICAL_TYPE } from '..';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.scss';

export const orderStatus = [
  { key: 0, text: 'Tất cả(Trạng thái đơn hàng)', value: undefined },
  { key: 1, text: 'Đang chờ', value: 1 },
  { key: 2, text: 'Đã xác nhận', value: 2 },
  { key: 4, text: 'Bị huỷ', value: 4 },
];

interface StatisticalContainerProps {
  type?: STATISTICAL_TYPE;
  compType?: COMP_TYPE;
  id_user?: any;
}

export default (props: StatisticalContainerProps) => {
  const { type, compType, id_user } = props;
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [quarter, setQuarter] = useState(quarterOfTheYear(new Date()));
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date());
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string) : null;
  const statisticalOrderList = useSelector((state: State) => state.statisticalOrderList);

  const ref = useRef<{
    columnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
    status: string;
    statusId: number;
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
        Header: 'HTTT',
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
        Header: 'trạng thái',
        accessor: 'status',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Tổng',
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
    ],
    data: [],
    status: orderStatus[0].text,
    statusId: orderStatus[0].value as number,
  });

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    ref.current.data = [];
    setMonth(new Date().getMonth() + 1);
    setQuarter(quarterOfTheYear(new Date()));
    setYear(new Date().getFullYear());
    setDate(new Date());
    setRedraw({});
    requestData();
  }, [type, compType, id_user]);

  useEffect(() => {
    requestData();
  }, [month, quarter, year]);

  useEffect(() => {
    if (statisticalOrderList && statisticalOrderList.data) {
      console.log(statisticalOrderList.data);

      if (typeof statisticalOrderList?.data === 'object') {
        ref.current.data = statisticalOrderList?.data as Obj[];
      }
    }
    setRedraw({});
  }, [statisticalOrderList]);

  const requestData = () => {
    const params = {
      id_user: compType === COMP_TYPE.MODAL ? id_user : userLogin.data.id,
      ...(type === STATISTICAL_TYPE.MONTH
        ? { month: month, year: year }
        : type === STATISTICAL_TYPE.QUATER
        ? { quarter: quarter, year: year }
        : { year: year }),
      status: ref.current.statusId,
    };
    console.log(params);

    dispatch(queryStatisticalOrder(params));
  };

  const onChangeDate = (date: Date) => {
    ref.current.data = [];
    setMonth(date.getMonth() + 1);
    setQuarter(quarterOfTheYear(date));
    setYear(date.getFullYear());
    setDate(date);
  };

  const changeOrderStatus = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    ref.current.statusId = data.value as number;
    ref.current.status = orderStatus.find((statusData: any) => statusData.value === data.value)?.text as string;
    requestData();
    setRedraw({});
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <div className={styles.StatisticalContainer}>
        <div className={styles.FilterContainer}>
          <Form.Field
            control={DatePickerLib}
            className={styles.DateTime}
            selected={date}
            onChange={onChangeDate}
            {...(type === STATISTICAL_TYPE.MONTH
              ? {
                  dateFormat: 'MM/yyyy',
                  showMonthYearPicker: true,
                }
              : type === STATISTICAL_TYPE.QUATER
              ? {
                  dateFormat: 'yyyy, QQQ',
                  showQuarterYearPicker: true,
                }
              : {
                  showYearPicker: true,
                  dateFormat: 'yyyy',
                })}
          />
          <Dropdown
            button
            className="icon"
            floating
            labeled
            options={orderStatus}
            text={(ref.current.status as string) ? ref.current.status : 'Choose Status'}
            onChange={changeOrderStatus}
          />
        </div>
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
    </ErrorBoundary>
  );
};
