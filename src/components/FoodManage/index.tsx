import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Breadcrumb, Button, Dropdown, DropdownProps, Header, Icon, Input, Modal } from 'semantic-ui-react';
import { Column } from 'react-table';
import { Obj } from 'interfaces/common';
import Fallback from 'components/Fallback';
import TextArea from 'elements/TextArea';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import DataTable from 'elements/Datatable';
import { createFood, queryFoodList, updateFood, deleteFoodManage, queryFoodType } from 'components/actions';
import { BASE_IMAGE_URL, FORM_TYPE, handleError, COMP_TYPE, isBlank, FIELD_VALID } from 'utils/common';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';
import { changeStatusFood } from './actions';
import { notificationErrorValidate } from 'utils/common';
import { getFoodTypeOrigin } from 'components/reducers';

export const foodStatus = [
  { key: 0, text: 'Hết hàng', value: 0 },
  { key: 1, text: 'Còn hàng', value: 1 },
];

interface FoodManageProps {
  compType?: COMP_TYPE;
  id_user?: any;
}

export const FoodManage: React.FC<FoodManageProps> = (props: FoodManageProps) => {
  const { compType } = props;
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState(FORM_TYPE.CREATE);
  const foodType = useSelector(getFoodTypeOrigin);

  const infoAccount = useSelector((state: State) => state.infoAccount);
  const foodList = useSelector((state: State) => state.foodList);
  const createFoodResult = useSelector((state: State) => state.createFoodResult);
  const updateFoodResult = useSelector((state: State) => state.updateFoodResult);
  const deleteFoodManageResult = useSelector((state: State) => state.deleteFoodManageResult);

  const foodFormRef = useRef<{
    name: string;
    price: number;
    info: string;
    image?: FileList;
    id?: number;
    foodStatus: string;
    foodStatusId?: number;
    lsFoodType: Obj[];
    foodType?: string;
    foodTypeId?: number;
  }>({
    name: '',
    price: 0,
    info: '',
    foodStatus: '',
    lsFoodType: [],
  });

  const ref = useRef<{
    columnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
  }>({
    pageIndex: 0,
    columnDefs:
      props.compType !== COMP_TYPE.MODAL
        ? [
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
              width: 270,
            },
            {
              Header: 'Giá',
              accessor: 'price',
              className: 'Center',
              width: 70,
            },
            {
              Header: 'Loại món ăn',
              accessor: 'type',
              className: 'Center',
              width: 70,
            },
            {
              Header: 'Hình ảnh',
              accessor: 'image',
              className: 'Center',
              width: 70,
              Cell: (data: any) => {
                return <img src={data.row.original.image_url} className={styles.FoodImage} />;
              },
            },
            {
              Header: '',
              accessor: 'update',
              Cell: (data: any) => {
                return (
                  <Button className={styles.Update} onClick={() => showUpdateForm(data.row.original)} positive>
                    {'Cập nhật'}
                  </Button>
                );
              },
              className: 'Right NoBorder',
              headerClassName: 'Right NoBorder',
              width: 55,
            },
            {
              Header: '',
              accessor: 'sell',
              Cell: (data: any) => {
                return (
                  <Button className={styles.Hidden} negative onClick={() => showDeleteForm(data.row.original)}>
                    {'Xóa'}
                  </Button>
                );
              },
              className: 'Right',
              width: 55,
            },
          ]
        : [
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
              width: 270,
            },
            {
              Header: 'Loại món ăn',
              accessor: 'type',
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
              Header: 'Hình ảnh',
              accessor: 'image',
              className: 'Center',
              width: 70,
              Cell: (data: any) => {
                return <img src={`${BASE_IMAGE_URL}${data.row.original.image}`} className={styles.FoodImage} />;
              },
            },
          ],
    data: [],
  });

  useEffect(() => {
    requestData();
    dispatch(queryFoodType());
  }, []);

  useEffect(() => {
    if (createFoodResult && createFoodResult.data) {
      requestData();
      onClose();
    }
  }, [createFoodResult]);

  useEffect(() => {
    if (updateFoodResult && updateFoodResult.data) {
      requestData();
      onClose();
    }
  }, [updateFoodResult]);

  useEffect(() => {
    if (foodType && foodType.length > 0) {
      console.log(foodType);

      foodFormRef.current.lsFoodType = foodType as Obj[];
      foodFormRef.current.foodType = foodType[0]?.text as string;
      foodFormRef.current.foodTypeId = foodType[0]?.value as number;
    }
    setRedraw({});
  }, [foodType]);

  useEffect(() => {
    if (deleteFoodManageResult && deleteFoodManageResult.data) {
      requestData();
      onClose();
    }
  }, [deleteFoodManageResult]);

  useEffect(() => {
    console.log(foodList);
    if (foodList && foodList.data) {
      ref.current.data = (foodList?.data as Obj).results as Obj[];
    }
    setRedraw({});
  }, [foodList]);

  const requestData = () => {
    const params = {
      id_user: compType === COMP_TYPE.MODAL ? props.id_user : infoAccount?.id,
    };

    dispatch(queryFoodList(params));
  };

  const showUpdateForm = (data: Obj) => {
    console.log(data);

    foodFormRef.current.foodType = data.type as string;
    foodFormRef.current.foodTypeId = data.id_type as number;
    foodFormRef.current.name = data.name as string;
    foodFormRef.current.price = data.price as number;
    foodFormRef.current.info = data.info as string;
    foodFormRef.current.id = data.id as number;
    foodFormRef.current.foodStatus = foodStatus.find((foodStatusData: any) => foodStatusData.value === data.status)
      ?.text as string;
    foodFormRef.current.foodStatusId = data.status as number;

    setOpenModal(true);
    setType(FORM_TYPE.UPDATE);
    setRedraw({});
  };

  const showDeleteForm = (data: Obj) => {
    foodFormRef.current.id = data.id as number;
    setType(FORM_TYPE.DELETE);
    setOpenModal(true);
  };

  const showCreateFoodModal = () => {
    setType(FORM_TYPE.CREATE);
    setOpenModal((openModal) => !openModal);
  };

  const onChangeFoodName = (value: string) => {
    foodFormRef.current.name = value;
  };

  const onChangeInfoFood = (value: string) => {
    foodFormRef.current.info = value;
  };

  const onChangePrice = (value: number) => {
    foodFormRef.current.price = value;
  };

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    foodFormRef.current.image = event.target.files as FileList;
  };

  const submitCreate = () => {
    const isValidName = notificationErrorValidate(foodFormRef.current.name, undefined, 'tên món ăn', 50);
    const isValidPrice = notificationErrorValidate(foodFormRef.current.price, FIELD_VALID.NUMBER, 'giá món ăn');
    const isValidInfo = notificationErrorValidate(
      foodFormRef.current.info,
      FIELD_VALID.TEXT,
      'thông tin chi tiết món ăn',
      500,
      false
    );
    console.log(infoAccount);

    if (isValidName === true && isValidPrice === true && isValidInfo === true) {
      const params = {
        name: foodFormRef.current.name,
        info: foodFormRef.current.info,
        price: foodFormRef.current.price,
        image: foodFormRef.current.image,
        id_user: infoAccount?.id,
        restaurant: infoAccount?.restaurant,
        id_food: foodFormRef.current.id,
        ...(type === FORM_TYPE.UPDATE && {
          id_food: foodFormRef.current.id,
        }),
        ...(type === FORM_TYPE.CREATE && {
          type: foodFormRef.current.foodTypeId,
        }),
      };
      if (type === FORM_TYPE.CREATE) {
        dispatch(createFood(params));
      } else {
        dispatch(updateFood(params));
      }
    }
  };

  const submitDelete = () => {
    console.log(foodFormRef.current);
    const params = {
      id: foodFormRef.current.id,
    };
    dispatch(deleteFoodManage(params));
  };

  const changeFoodStatus = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    foodFormRef.current.foodStatusId = data.value as number;
    foodFormRef.current.foodStatus = foodStatus.find((foodStatusData: any) => foodStatusData.value === data.value)
      ?.text as string;
    const params = {
      status: foodFormRef.current.foodStatusId,
      id: foodFormRef.current.id,
    };
    dispatch(changeStatusFood(params));
    setRedraw({});
  };

  const onClose = () => {
    foodFormRef.current.name = '';
    foodFormRef.current.info = '';
    foodFormRef.current.price = 0;
    foodFormRef.current.image = undefined;
    setOpenModal(false);
  };

  const changeFoodType = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    const text = foodFormRef.current.lsFoodType.find((item) => {
      return item.value === data.value;
    })?.text;
    foodFormRef.current.foodTypeId = data.value as number;
    foodFormRef.current.foodType = text as string;
    setRedraw({});
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      {compType !== COMP_TYPE.MODAL && (
        <>
          <Breadcrumb>
            <Breadcrumb.Section link>Quản lý</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section link active>
              Danh sách món ăn
            </Breadcrumb.Section>
          </Breadcrumb>
          <Header>
            <Icon name="food" />
            Quản lý món ăn
          </Header>
        </>
      )}
      <div className={styles.FoodManage}>
        {compType !== COMP_TYPE.MODAL && (
          <Button onClick={showCreateFoodModal} content="Thêm món ăn" icon="add" color="blue" />
        )}
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
        <Modal.Header>
          {type === FORM_TYPE.CREATE ? 'Thêm món ăn' : type === FORM_TYPE.UPDATE ? 'Cập nhật món ăn' : 'Xóa món ăn'}
        </Modal.Header>
        {type === FORM_TYPE.CREATE || type === FORM_TYPE.UPDATE ? (
          <Modal.Content>
            <div className={'FoodForm'}>
              <div className={'HeaderFoodForm'}></div>
              <div className={'InputFoodForm'}>
                <Input type="file" onChange={updateImage} accept="image/x-png,image/gif,image/jpeg" />
                <TextBox
                  placeholder={'Tên món ăn'}
                  value={foodFormRef.current.name}
                  label="Tên món ăn"
                  type={TEXTBOX_TYPE.TEXT}
                  onChangeText={onChangeFoodName}
                />
                <TextBox
                  placeholder={'Giá'}
                  isNumberInput={true}
                  label="Giá"
                  value={foodFormRef.current.price.toString()}
                  type={TEXTBOX_TYPE.TEXT}
                  onChangeNumber={onChangePrice}
                />
                <TextArea
                  value={foodFormRef.current.info}
                  placeholder="Nhập chi tiết"
                  label="Chi tiết món ăn"
                  onChangeText={onChangeInfoFood}
                />
                <Dropdown
                  button
                  className="icon"
                  floating
                  labeled
                  options={foodFormRef.current.lsFoodType}
                  text={!isBlank(foodFormRef.current.foodType) ? foodFormRef.current.foodType : 'Thay đổi loại'}
                  disabled={type === FORM_TYPE.UPDATE}
                  onChange={changeFoodType}
                />
                {type === FORM_TYPE.UPDATE && (
                  <Dropdown
                    button
                    className="icon"
                    floating
                    labeled
                    options={foodStatus}
                    text={
                      !isBlank(foodFormRef.current.foodStatus) ? foodFormRef.current.foodStatus : 'Thay đổi trạng thái'
                    }
                    onChange={changeFoodStatus}
                  />
                )}
                <Button positive onClick={submitCreate} content={type === FORM_TYPE.UPDATE ? 'Cập nhật' : 'Thêm'} />
              </div>
            </div>
          </Modal.Content>
        ) : type === FORM_TYPE.DELETE ? (
          <Modal.Content>
            <div className={'FoodForm'}>
              <div className={'HeaderFoodForm'}>Bạn có chắc muốn xóa món ăn này khỏi danh sách</div>
              <div className={'InputFoodForm'}>
                <Button negative onClick={submitDelete} content="Xác nhận" />
              </div>
            </div>
          </Modal.Content>
        ) : null}
      </Modal>
    </ErrorBoundary>
  );
};
