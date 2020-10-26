import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import Cookie from 'js-cookie';
import { Breadcrumb, Button, Header, Icon, Modal } from 'semantic-ui-react';
import { Column } from 'react-table';
import { Obj } from 'interfaces/common';
import Fallback from 'components/Fallback';
import DataTable from 'elements/Datatable';
import { queryFoodFavoriteList, deleteFoodFavoriteItem } from './actions';
import { handleError } from 'utils/common';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [openModal, setOpenModal] = useState(false);

  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string) : null;

  const foodList = useSelector((state: State) => state.foodList);
  const updateFoodResult = useSelector((state: State) => state.updateFoodResult);

  const foodFormRef = useRef<{
    name: string;
    price: number;
    info: string;
    image?: FileList;
    id?: number;
  }>({
    name: '',
    price: 0,
    info: '',
  });

  useEffect(() => {
    if (updateFoodResult && updateFoodResult.data) {
      requestData();
      onClose();
    }
  }, [updateFoodResult]);

  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    if (foodList && foodList.data) {
      ref.current.data = foodList?.data as Obj[];
    }
    setRedraw({});
  }, [foodList]);

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
        Header: 'Tên món ăn',
        accessor: 'name',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Mô tả',
        accessor: 'info',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Giá',
        accessor: 'price',
        className: 'Center',
        width: 70,
      },
      {
        Header: '',
        accessor: 'update',
        Cell: (data: any) => {
          return (
            <Button className={styles.Update} onClick={() => showUpdateForm(data.row.original)} positive>
              {'Xóa'}
            </Button>
          );
        },
        className: 'Right NoBorder',
        headerClassName: 'Right NoBorder',
        width: 55,
      },
    ],
    data: [],
  });

  const requestData = () => {
    const params = {
      id_user: userLogin.data.id,
    };

    dispatch(queryFoodFavoriteList(params));
  };

  const showUpdateForm = (data: Obj) => {
    foodFormRef.current.name = data.name as string;
    foodFormRef.current.price = data.price as number;
    foodFormRef.current.info = data.info as string;
    foodFormRef.current.id = data.id as number;
    setOpenModal(true);
    setRedraw({});
  };

  const deleteFoodFavorite = () => {
    const params = {};
    dispatch(deleteFoodFavoriteItem(params));
  };

  const onClose = () => {
    foodFormRef.current.name = '';
    foodFormRef.current.info = '';
    foodFormRef.current.price = 0;
    foodFormRef.current.image = undefined;
    setOpenModal(false);
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <Breadcrumb>
        <Breadcrumb.Section link>Manage</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link active>
          Food
        </Breadcrumb.Section>
      </Breadcrumb>
      <Header>
        <Icon name="food" />
        Danh sách món ăn yêu thích
      </Header>
      <div className={styles.FavoriteFoodCus}>
        <DataTable columns={(ref.current.columnDefs as unknown) as Column<object>[]} data={ref.current.data as Obj[]} />
      </div>
      <Modal
        size="small"
        closeIcon={true}
        open={openModal}
        onClose={onClose}
        onOpen={() => setOpenModal(true)}
        mountNode={document.querySelector('.FoodManage')}
      >
        <Modal.Header>Xóa món ăn yêu thích</Modal.Header>
        <Button onClick={deleteFoodFavorite}>Xác nhận</Button>
      </Modal>
    </ErrorBoundary>
  );
};
