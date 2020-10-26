/* eslint-disable react/jsx-key */
import React, { useRef, useEffect, useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Scrollbars, positionValues } from 'react-custom-scrollbars';
import {
  useTable,
  useSortBy,
  useFlexLayout,
  Column,
  HeaderGroup,
  ColumnInstance,
  usePagination,
  UsePaginationInstanceProps,
  TableOptions,
  UseTableInstanceProps,
  useExpanded,
} from 'react-table';
import { ErrorBoundary } from 'react-error-boundary';
import { Obj } from 'interfaces/common';
import { handleError } from 'utils/common';
import Fallback from 'components/Fallback';
import styles from './styles.scss';

const enum PAGE_ACTION {
  NEXT_PAGE = 'NEXT_PAGE',
  PRE_PAGE = 'PRE_PAGE',
  LAST_PAGE = 'LAST_PAGE',
  FIRST_PAGE = 'FIRST_PAGE',
}

interface DataTableProps {
  columns: Column<object>[];
  data: Obj[];
  autoHideTimeout?: number;
  autoHideDuration?: number;
  autoHideScrollBar?: boolean;
  isPagination?: boolean;
  dataSize?: number;
  pageIndex?: number;
  pageSize?: number;
  hasLoadMore?: boolean;
  loading?: boolean;
  haveExpand?: boolean;

  loadMore?(): void;

  changePage?(pageNumber: number): void;

  renderRowSubComponent?({ row }: any): void;
}

interface HeaderGroupType<D extends object = {}> extends HeaderGroup<D> {
  headerClassName: string;
}

interface ColumnInstanceType<D extends object = {}> extends ColumnInstance<D> {
  className: string;
}

interface TableInstance<D extends object = {}>
  extends Omit<TableOptions<D>, 'columns' | 'pageCount'>,
    UseTableInstanceProps<D>,
    UsePaginationInstanceProps<D> {}

const DataTable = (props: DataTableProps) => {
  const {
    data,
    columns,
    autoHideDuration,
    autoHideScrollBar,
    autoHideTimeout,
    isPagination,
    dataSize,
    hasLoadMore,
    loading,
    haveExpand,
    renderRowSubComponent,
  } = props;
  const scrollBarRef = useRef() as React.RefObject<Scrollbars>;
  const ref = React.useRef<{
    loading?: boolean;
    inLoadMore?: boolean;
    blockLoadMore?: boolean;
  }>({
    loading: false,
    inLoadMore: false,
    blockLoadMore: false,
  });
  const [, redraw] = useState();
  useEffect(() => {
    ref.current.inLoadMore = false;
    if (props.loadMore) {
      ref.current.loading = false;
    }
  }, [loading]);

  useEffect(() => {
    if (props.changePage) {
      ref.current.loading = false;
    }
  }, [data]);

  const pageCountData = Math.ceil(
    (dataSize ? dataSize : data ? data.length : 0) / (props.pageSize ? props.pageSize : 40)
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: props.pageIndex ? props.pageIndex : 0 },
      manualPagination: true,
      pageCount: pageCountData,
    },
    useSortBy,
    useFlexLayout,
    useExpanded,
    usePagination
  ) as TableInstance;

  const onScrollFrame = (values: positionValues) => {
    if (
      values.top >= (data.length > 80 ? (data.length - 5) / data.length : 0.8) &&
      props.loadMore &&
      !ref.current.inLoadMore &&
      hasLoadMore
    ) {
      ref.current.inLoadMore = true;
      ref.current.loading = true;
      redraw({});
      props.loadMore();
    }
  };

  const changePage = (action: PAGE_ACTION) => {
    ref.current.loading = true;
    if (props.changePage) {
      switch (action) {
        case PAGE_ACTION.FIRST_PAGE:
          gotoPage(0);
          props.changePage(0);
          break;
        case PAGE_ACTION.LAST_PAGE:
          gotoPage(pageCount - 1);
          props.changePage(pageCountData - 1);
          break;
        case PAGE_ACTION.NEXT_PAGE:
          nextPage();
          props.changePage(pageIndex + 1);
          break;
        case PAGE_ACTION.PRE_PAGE:
          previousPage();
          props.changePage(pageIndex - 1);
          break;
        default:
          break;
      }
    }
  };

  return (
    <ErrorBoundary onError={handleError} FallbackComponent={Fallback}>
      <table className={styles.DataTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: HeaderGroupType) => (
                <th {...column.getHeaderProps({ className: column.headerClassName })}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <Dimmer.Dimmable>
          <tbody {...getTableBodyProps()}>
            <Scrollbars
              autoHeight
              autoHide={autoHideScrollBar}
              autoHideTimeout={autoHideTimeout}
              autoHeightMin={0}
              autoHideDuration={autoHideDuration}
              autoHeightMax="100%"
              onScrollFrame={onScrollFrame}
              universal={true}
              ref={scrollBarRef}
            >
              {isPagination
                ? page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps({ className: (cell.column as ColumnInstanceType).className })}>
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                : rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <>
                        <tr {...row.getRowProps()} key={i}>
                          {row.cells.map((cell) => {
                            return (
                              <td {...cell.getCellProps({ className: (cell.column as ColumnInstanceType).className })}>
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
                        </tr>
                        {haveExpand === true && (row.isExpanded ? renderRowSubComponent!({ row }) : null)}
                      </>
                    );
                  })}
            </Scrollbars>
          </tbody>
          {isPagination && dataSize && (
            <div className="pagination">
              <button onClick={() => changePage(PAGE_ACTION.FIRST_PAGE)} disabled={!canPreviousPage}>
                {'<<'}
              </button>{' '}
              <button onClick={() => changePage(PAGE_ACTION.PRE_PAGE)} disabled={!canPreviousPage}>
                {'<'}
              </button>{' '}
              <button onClick={() => changePage(PAGE_ACTION.NEXT_PAGE)} disabled={!canNextPage}>
                {'>'}
              </button>{' '}
              <button onClick={() => changePage(PAGE_ACTION.LAST_PAGE)} disabled={!canNextPage}>
                {'>>'}
              </button>{' '}
              <span>
                {'Trang'}{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span>
            </div>
          )}
          {props.changePage && (
            <Dimmer active={ref.current.loading}>
              <Loader />
            </Dimmer>
          )}
          {props.loadMore && <Loader className={styles.LoadMore} active={ref.current.loading} />}
        </Dimmer.Dimmable>
      </table>
    </ErrorBoundary>
  );
};

DataTable.defaultProps = {
  autoHideScrollBar: true,
  autoHideTimeout: 1000,
  autoHideDuration: 200,
};
export default DataTable;
