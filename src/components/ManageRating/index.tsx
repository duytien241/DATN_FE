import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Column } from 'react-table';
import DataTable from 'elements/Datatable';
import Fallback from 'components/Fallback';
import { Obj } from 'interfaces/common';
import { handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import { queryRatingList } from './actions';
import styles from './styles.scss';
import { Breadcrumb, Header, Icon } from 'semantic-ui-react';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();

  const infoAccount = useSelector((state: State) => state.infoAccount);
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
        accessor: 'results',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Mức rating',
        accessor: 'rating',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'thời gian',
        accessor: 'time',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Nội dung',
        accessor: 'content',
        className: 'Center',
        width: 270,
      },
    ],
    data: [],
  });

  useEffect(() => {
    requestDataRatingList();
  }, []);

  useEffect(() => {
    if (ratingList && ratingList.data) {
      console.log(ratingList);
      if (typeof ratingList?.data === 'object') {
        ref.current.data = (ratingList?.data as Obj)?.results as Obj[];
      }
    }
    setRedraw({});
  }, [ratingList]);

  const requestDataRatingList = () => {
    const params = {
      id: infoAccount?.restaurant,
    };

    dispatch(queryRatingList(params));
  };
  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Breadcrumb>
        <Breadcrumb.Section link>Quản lý</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link active>
          Quản lý đánh giá
        </Breadcrumb.Section>
      </Breadcrumb>
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
