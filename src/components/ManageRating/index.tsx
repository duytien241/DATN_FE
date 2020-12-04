import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Column } from 'react-table';
import Cookie from 'js-cookie';
import DataTable from 'elements/Datatable';
import Fallback from 'components/Fallback';
import { Obj } from 'interfaces/common';
import { handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import { queryRatingList } from './actions';
import styles from './styles.scss';
import { Header, Icon } from 'semantic-ui-react';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();

  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string) : null;
  const ratingList = useSelector((state: State) => state.ratingList);

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
        Header: 'Người đánh giá',
        accessor: 'Name',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Mức rating',
        accessor: 'ratingLevel',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'thời gian',
        accessor: 'time',
        className: 'Center',
        width: 70,
      },
    ],
    data: [],
  });

  useEffect(() => {
    requestDataRatingList();
  }, []);

  useEffect(() => {
    if (ratingList && ratingList.data) {
      if (typeof ratingList?.data === 'object') {
        ref.current.data = ratingList?.data as Obj[];
      }
    }
    setRedraw({});
  }, [ratingList]);

  const requestDataRatingList = () => {
    const params = {
      id: userLogin.data.id,
    };

    dispatch(queryRatingList(params));
  };
  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Header>
        <Icon name="food" />
        Quản lý đánh giá
      </Header>
      <div className={styles.ManageRating}>
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
    </ErrorBoundary>
  );
};
