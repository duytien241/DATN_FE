import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import DatePickerLib from 'react-datepicker';
import { Column } from 'react-table';
import Cookie from 'js-cookie';
import { Form } from 'semantic-ui-react';
import { queryStatisticalOrder } from './actions';
import { Obj } from 'interfaces/common';
import Fallback from 'components/Fallback';
import { handleError, quarterOfTheYear } from 'utils/common';
import DataTable from 'elements/Datatable';
import { State } from 'redux-saga/reducers';
import { STATISTICAL_TYPE } from '..';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.scss';

interface StatisticalContainerProps {
  type?: STATISTICAL_TYPE;
}

export default (props: StatisticalContainerProps) => {
  const { type } = props;
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
        Header: 'Address',
        accessor: 'Address',
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
    ],
    data: [],
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
  }, [type]);

  useEffect(() => {
    requestData();
  }, [month, quarter, year]);

  useEffect(() => {
    if (statisticalOrderList && statisticalOrderList.data) {
      if (typeof statisticalOrderList?.data === 'object') {
        ref.current.data = statisticalOrderList?.data as Obj[];
      }
    }
    setRedraw({});
  }, [statisticalOrderList]);

  const requestData = () => {
    const params = {
      id_user: userLogin.data.id,
      ...(type === STATISTICAL_TYPE.MONTH
        ? { month: month, year: year }
        : type === STATISTICAL_TYPE.QUATER
        ? { quarter: quarter, year: year }
        : { year: year }),
    };

    dispatch(queryStatisticalOrder(params));
  };

  const onChangeDate = (date: Date) => {
    ref.current.data = [];
    setMonth(date.getMonth() + 1);
    setQuarter(quarterOfTheYear(date));
    setYear(date.getFullYear());
    setDate(date);
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <div className={styles.StatisticalContainer}>
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
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
    </ErrorBoundary>
  );
};
