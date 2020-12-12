import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumb, Button, Dropdown, DropdownProps, Header, Icon, Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Column } from 'react-table';
import Cookie from 'js-cookie';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import DataTable from 'elements/Datatable';
import Fallback from 'components/Fallback';
import { Obj } from 'interfaces/common';
import { FIELD_VALID, handleError, notificationErrorValidate } from 'utils/common';
import { createSaleCode, querySaleCodeList, querySaleType } from './actions';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();

  const [openModal, setOpenModal] = useState(false);
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string) : null;
  const saleCodeList = useSelector((state: State) => state.saleCodeList);
  const saleTypeList = useSelector((state: State) => state.saleTypeList);
  const createSaleResult = useSelector((state: State) => state.createSaleResult);

  const ref = useRef<{
    columnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
    saleTypeList: Obj[];
    expired: number;
    id_sale?: number;
    sale_type?: string;
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
        Header: 'Loại Sale',
        accessor: 'type',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Mã Sale',
        accessor: 'code',
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
        Header: 'Số ngày hiệu lực',
        accessor: 'exprired_days',
        className: 'Center',
        width: 70,
      },
    ],
    data: [],
    saleTypeList: [],
    expired: 0,
  });

  useEffect(() => {
    requestDataSaleType();
    requestDataSaleList();
  }, []);

  useEffect(() => {
    if (createSaleResult && createSaleResult.data) {
      requestDataSaleList();
      setOpenModal(false);
    }
  }, [createSaleResult]);

  useEffect(() => {
    if (saleTypeList && saleTypeList.data) {
      if (typeof saleTypeList?.data === 'object') {
        ref.current.saleTypeList = (saleTypeList?.data as Obj[]).map((item: Obj) => {
          return {
            key: item.id,
            text: item.type,
            value: item.id,
          };
        });
        ref.current.sale_type = ref.current.saleTypeList[0].text as string;
      }
    }
    setRedraw({});
  }, [saleTypeList]);

  useEffect(() => {
    if (saleCodeList && saleCodeList.data) {
      if (typeof saleCodeList?.data === 'object') {
        ref.current.data = saleCodeList?.data as Obj[];
      }
    }
    setRedraw({});
  }, [saleCodeList]);

  const requestDataSaleList = () => {
    const params = {
      id_user: userLogin.data.id,
    };

    dispatch(querySaleCodeList(params));
  };

  const requestDataSaleType = () => {
    dispatch(querySaleType());
  };

  const showCreateMenuModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const onChangeNumber = (value: number) => {
    ref.current.expired = value;
  };

  const submitCreate = () => {
    const isValidNumberSale = notificationErrorValidate(ref.current.expired, FIELD_VALID.NUMBER, 'số ngày hiệu lực');
    if (isValidNumberSale === true) {
      const params = {
        id_user: userLogin.data.id,
        id_sale: ref.current.id_sale,
        expired: ref.current.expired,
      };

      dispatch(createSaleCode(params));
    }
  };

  const changeSaleType = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    const text = ref.current.saleTypeList.find((item) => {
      return item.value === data.value;
    })?.text;
    ref.current.id_sale = data.value as number;
    ref.current.sale_type = text as string;
    setRedraw({});
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Breadcrumb>
        <Breadcrumb.Section link>Quản lý</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link active>
          Quản lý mã giảm giá
        </Breadcrumb.Section>
      </Breadcrumb>
      <Header>
        <Icon name="food" />
        Quản lý mã giảm giá
      </Header>
      <div className={styles.SaleManage}>
        <Button onClick={showCreateMenuModal} color="blue" content="Thêm Mã giảm giá" />
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)} onOpen={() => setOpenModal(true)} closeIcon={true}>
        <Modal.Header>Tạo mã giảm giá</Modal.Header>
        <Modal.Content>
          <Dropdown
            button
            className="icon"
            floating
            labeled
            options={ref.current.saleTypeList}
            value
            text={(ref.current.sale_type as string) ? ref.current.sale_type : 'Choose Type'}
            onChange={changeSaleType}
          />
          <TextBox
            placeholder={'Số ngày hiệu lực'}
            label="Số ngày hiệu lực"
            type={TEXTBOX_TYPE.TEXT}
            isNumberInput
            onChangeNumber={onChangeNumber}
          />
          <Button color="blue" onClick={submitCreate} content="Lưu" />
        </Modal.Content>
      </Modal>
    </ErrorBoundary>
  );
};
