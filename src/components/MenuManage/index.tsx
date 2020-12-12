import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Button, Checkbox, CheckboxProps, Header, Icon, Modal, Tab } from 'semantic-ui-react';
import { Column } from 'react-table';
import { ErrorBoundary } from 'react-error-boundary';
import Cookie from 'js-cookie';
import TextBox, { TEXTBOX_TYPE } from 'elements/TextBox';
import Fallback from 'components/Fallback';
import TextArea from 'elements/TextArea';
import DataTable from 'elements/Datatable';
import { FORM_TYPE, handleError, notificationErrorValidate, FIELD_VALID } from 'utils/common';
import { State } from 'redux-saga/reducers';
import { Obj } from 'interfaces/common';
import {
  createMenuShop,
  deleteFoodMenuShop,
  deleteMenuShop,
  insertFoodMenuShop,
  queryFoodInMenu,
  queryMenuShop,
  updateMenuShop,
} from './actions';
import { queryFoodList } from 'components/actions';
import styles from './styles.scss';

export default () => {
  const dispatch = useDispatch();
  const [, setRedraw] = useState();
  const [type, setType] = useState(FORM_TYPE.CREATE);

  const menuList = useSelector((state: State) => state.menuList);
  const foodList = useSelector((state: State) => state.foodList);
  const foodInMenu = useSelector((state: State) => state.foodInMenu);
  const createMenuResult = useSelector((state: State) => state.createMenuResult);
  const updateMenuResult = useSelector((state: State) => state.updateMenuResult);
  const deleteMenuResult = useSelector((state: State) => state.deleteMenuResult);
  const insertFoodMenuResult = useSelector((state: State) => state.insertFoodMenuResult);
  const deleteFoodMenuResult = useSelector((state: State) => state.deleteFoodMenuResult);
  const [openModal, setOpenModal] = useState(false);
  const userLogin = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo') as string) : null;

  const menuFormRef = useRef<{
    name: string;
    desc: string;
    id?: number;
  }>({
    name: '',
    desc: '',
  });

  const ref = useRef<{
    columnDefs: Obj[];
    subColumnDefs: Obj[];
    pageIndex: number;
    data: Obj[];
    dataFoodInMenu: Obj[];
    dataFoodList: Obj[];
    checkBoxList?: boolean[];
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
                  showFoodInMenu(row);
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
        accessor: 'index',
        filterable: false,
        className: 'Center',
        Cell: (data: any) => {
          return <span>{data.row.index + 1}</span>;
        },
      },
      {
        Header: 'Tên Menu',
        accessor: 'name',
        className: 'Center',
        width: 70,
      },
      {
        Header: 'Mô tả',
        accessor: 'desc',
        className: 'Center',
        width: 170,
      },
      {
        Header: '',
        accessor: 'update',
        Cell: (data: any) => {
          return (
            <Button positive className={styles.Update} onClick={() => showUpdateForm(data.row.original)}>
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
        accessor: 'hidden',
        Cell: (data: any) => {
          return (
            <Button negative className={styles.Hidden} onClick={() => showDeleteForm(data.row.original)}>
              {'Xóa'}
            </Button>
          );
        },
        className: 'Right',
        width: 55,
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
        Header: 'Mô tả',
        accessor: 'info',
        className: 'Center',
        width: 170,
      },
      {
        Header: 'Giá',
        accessor: 'price',
        className: 'Center',
        width: 70,
      },
    ],
    data: [],
    dataFoodInMenu: [],
    dataFoodList: [],
    checkBoxList: [],
  });

  useEffect(() => {
    requestData();
    requestDataFood();
  }, []);

  useEffect(() => {
    if (foodInMenu && foodInMenu.data) {
      if (typeof foodInMenu?.data === 'object') {
        ref.current.dataFoodInMenu = foodInMenu?.data as Obj[];
        ref.current.dataFoodList.map((foodItem: Obj, index: number) => {
          ref.current.checkBoxList![index] =
            ref.current.dataFoodInMenu.findIndex((foodInMenuItem: Obj) => foodInMenuItem.name === foodItem.name) > -1;
        });
      }
    }
    setRedraw({});
  }, [foodInMenu]);

  useEffect(() => {
    if (menuList && menuList.data) {
      if (typeof menuList?.data === 'object') {
        ref.current.data = menuList?.data as Obj[];
      }
    }
    setRedraw({});
  }, [menuList]);

  useEffect(() => {
    if (foodList && foodList.data) {
      if (typeof foodList?.data === 'object') {
        ref.current.dataFoodList = foodList?.data as Obj[];
        ref.current.dataFoodList.map((foodItem: Obj, index: number) => {
          ref.current.checkBoxList![index] =
            ref.current.dataFoodInMenu.findIndex((foodInMenuItem: Obj) => foodInMenuItem.name === foodItem.name) > -1;
        });
      }
    }
    setRedraw({});
  }, [foodList]);

  useEffect(() => {
    if (createMenuResult && createMenuResult.data) {
      requestData();
      onClose();
    }
  }, [createMenuResult]);

  useEffect(() => {
    if (updateMenuResult && updateMenuResult.data) {
      requestData();
      onClose();
    }
  }, [updateMenuResult]);

  useEffect(() => {
    if (deleteMenuResult && deleteMenuResult.data) {
      requestData();
      onClose();
    }
  }, [deleteMenuResult]);

  useEffect(() => {
    if (insertFoodMenuResult && insertFoodMenuResult.data) {
      requestData();
    }
  }, [insertFoodMenuResult]);
  useEffect(() => {
    if (deleteFoodMenuResult && deleteFoodMenuResult.data) {
      requestData();
    }
  }, [deleteFoodMenuResult]);

  const showFoodInMenu = (data: any) => {
    const params = {
      id_menu: data.original.id,
    };
    dispatch(queryFoodInMenu(params));
  };

  const requestData = () => {
    const params = {
      id_user: userLogin.data.id,
    };

    dispatch(queryMenuShop(params));
  };

  const requestDataFood = () => {
    const params = {
      id_user: userLogin.data.id,
    };

    dispatch(queryFoodList(params));
  };

  const showCreateMenuModal = () => {
    setType(FORM_TYPE.CREATE);
    setOpenModal((openModal) => !openModal);
  };

  const onChangeMenuName = (value: string) => {
    menuFormRef.current.name = value;
  };

  const onChangeDescMenu = (value: string) => {
    menuFormRef.current.desc = value;
  };

  const submitCreate = () => {
    const isValidName = notificationErrorValidate(menuFormRef.current.name, FIELD_VALID.TEXT, 'tên menu', 50);
    const isValidDesc = notificationErrorValidate(
      menuFormRef.current.desc,
      FIELD_VALID.TEXT,
      'chi tiết menu',
      500,
      false
    );
    if (isValidName === true && isValidDesc === true) {
      const params = {
        id_user: userLogin.data.id,
        name: menuFormRef.current.name,
        desc: menuFormRef.current.desc,
        ...(type === FORM_TYPE.UPDATE && {
          id: menuFormRef.current.id,
        }),
      };
      if (type === FORM_TYPE.CREATE) {
        dispatch(createMenuShop(params));
      } else {
        dispatch(updateMenuShop(params));
      }
    }
  };

  const onClose = () => {
    menuFormRef.current.name = '';
    menuFormRef.current.desc = '';
    menuFormRef.current.id = undefined;
    setOpenModal(false);
  };

  const showUpdateForm = (data: Obj) => {
    menuFormRef.current.name = data.name as string;
    menuFormRef.current.desc = data.desc as string;
    menuFormRef.current.id = data.id as number;
    const params = {
      id_menu: data.id,
    };
    dispatch(queryFoodInMenu(params));
    setOpenModal(true);
    setType(FORM_TYPE.UPDATE);
  };

  const showDeleteForm = (data: Obj) => {
    menuFormRef.current.id = data.id as number;
    setOpenModal(true);
    setType(FORM_TYPE.DELETE);
  };

  const submitDelete = () => {
    const params = {
      id: menuFormRef.current.id,
    };
    dispatch(deleteMenuShop(params));
  };

  const onChangeCheckBox = (
    event: React.MouseEvent<HTMLInputElement>,
    data: CheckboxProps,
    food: Obj,
    index: number
  ) => {
    const params = {
      id_food: [food.id],
      id_menu: menuFormRef.current.id,
    };
    if (data.checked === true) {
      dispatch(insertFoodMenuShop(params));
      ref.current.checkBoxList![index] = true;
    } else {
      dispatch(deleteFoodMenuShop(params));
      ref.current.checkBoxList![index] = false;
    }
    setRedraw({});
  };

  const menuForm = () => {
    return (
      <Modal.Content>
        <TextBox
          value={menuFormRef.current.name}
          placeholder={'Tên Menu'}
          label="Tên Menu"
          type={TEXTBOX_TYPE.TEXT}
          onChangeText={onChangeMenuName}
        />
        <TextArea
          value={menuFormRef.current.desc}
          placeholder="Nhập chi tiết"
          label="Chi tiết menu"
          onChangeText={onChangeDescMenu}
        />
        <Button onClick={submitCreate} content={type === FORM_TYPE.UPDATE ? 'Cập nhật' : 'Thêm menu'} color="blue" />
      </Modal.Content>
    );
  };

  const renderRowSubComponent = React.useCallback(({ row }) => {
    return (
      <div className={styles.SubMenuManage}>
        <DataTable
          columns={(ref.current.subColumnDefs as unknown) as Column<object>[]}
          data={ref.current.dataFoodInMenu as Obj[]}
        />
      </div>
    );
  }, []);

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
      <>
        <Breadcrumb>
          <Breadcrumb.Section link>Quản lý</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link active>
            Menu
          </Breadcrumb.Section>
        </Breadcrumb>
        <Header>
          <Icon name="food" />
          Quản lý menu
        </Header>
      </>
      <div className={styles.MenuManage}>
        <Button onClick={showCreateMenuModal} content="Thêm Menu" color="blue" />
        <DataTable
          columns={(ref.current.columnDefs as unknown) as Column<object>[]}
          data={ref.current.data as Obj[]}
          renderRowSubComponent={renderRowSubComponent}
          haveExpand={true}
        />
      </div>
      <Modal size="small" open={openModal} onClose={onClose} onOpen={() => setOpenModal(true)} closeIcon={true}>
        {type === FORM_TYPE.CREATE ? (
          menuForm()
        ) : type === FORM_TYPE.UPDATE ? (
          <Tab
            panes={[
              { menuItem: 'Cập nhật menu', render: () => <Tab.Pane>{menuForm()}</Tab.Pane> },
              {
                menuItem: 'Cập nhật món ăn trong menu',
                render: () => (
                  <Tab.Pane>
                    <Header>Thêm món ăn vào menu</Header>
                    <div className={styles.CheckBoxFoodList}>
                      {ref.current.dataFoodList.map((foodItem: Obj, index: number) => {
                        return (
                          <Checkbox
                            onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>, data: CheckboxProps) =>
                              onChangeCheckBox(event, data, foodItem, index)
                            }
                            key={foodItem.id as number}
                            label={foodItem.name}
                            checked={ref.current.checkBoxList![index]}
                          />
                        );
                      })}
                    </div>
                  </Tab.Pane>
                ),
              },
            ]}
          />
        ) : type === FORM_TYPE.DELETE ? (
          <Modal.Content>
            <div className={'FoodForm'}>
              <div className={'HeaderFoodForm'}>Bạn có chắc muốn xóa menu khỏi danh sách</div>
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
