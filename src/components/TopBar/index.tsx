import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withErrorBoundary } from 'react-error-boundary';
import { Dropdown, Image, Menu, Modal, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Fallback from 'components/Fallback';
// import DropdownLocation from 'elements/DropdownLocation';
import RegisterCus from 'components/RegisterCus';
import RegisterAccount from 'components/RegisterShop';
import Login from 'components/Login';
import { handleError, USER_ROLE } from 'utils/common';
import { logOut } from 'components/Login/actions';
import { queryShopType } from 'components/actions';
import { State } from 'redux-saga/reducers';
import styles from './styles.scss';
import { Obj } from 'interfaces/common';
import SearchFood from 'components/SearchFood';

interface TopbarProps {
  isFix?: boolean;
  showSearch?: boolean;
  changeLocation?(data: Obj): void;
}

const TopBar = (props: TopbarProps) => {
  const dispatch = useDispatch();
  const ref = useRef<{ userLogin?: Obj }>({});

  const [, setRedraw] = useState();
  // const [location, setLocation] = useState('');
  const signOut = () => {
    dispatch(logOut());
  };

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const shopRegisterResult = useSelector((state: State) => state.shopRegisterResult);
  const infoAccount = useSelector((state: State) => state.infoAccount);

  useEffect(() => {
    dispatch(queryShopType());
  }, []);

  useEffect(() => {
    if (infoAccount) {
      ref.current.userLogin = infoAccount;
      setRedraw({});
    }
  }, [infoAccount]);

  useEffect(() => {
    if (shopRegisterResult && shopRegisterResult.data && open === true) {
      setOpen(false);
    }
  }, [shopRegisterResult]);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const openModal = (activeIndex?: number) => {
    setOpen(true);
    setActiveIndex(activeIndex as number);
  };

  // const changeLocation = (data: Obj) => {
  //   setLocation((data.options as any).find((item: any) => item.id === data.value).text);
  //   props.changeLocation && props.changeLocation(data);
  // };

  const menuShop = [
    {
      text: 'Quản lý cửa hàng',
      value: 'Order_History',
      as: Link,
      to: '/manage_shop',
    },
    {
      text: 'Cập nhật tài khoản',
      value: 'Update_Account',
      as: Link,
      to: '/update_account',
    },
    {
      text: 'Đăng xuất',
      value: 'Log_Out',
      onClick: signOut,
    },
  ];

  const menuCus = [
    {
      text: 'Quản lý tài khoản',
      value: 'Update_Account_Cus',
      as: Link,
      to: '/update_account',
    },
    {
      text: 'Đăng xuất',
      value: 'Log_Out',
      onClick: signOut,
    },
  ];

  const menuAdmin = [
    {
      text: 'Đăng xuất',
      value: 'Log_Out',
      onClick: signOut,
    },
  ];

  const menuDefault = [
    {
      text: 'Đăng nhập',
      value: 'login',
      onClick: () => openModal(0),
    },
    {
      text: 'Tạo tài khoản',
      value: 'register',
      onClick: () => openModal(1),
    },
    {
      text: 'Tạo tài khoản bán hàng',
      value: 'register_shop',
      onClick: () => openModal(2),
    },
  ];

  const panes = [
    {
      menuItem: 'Đăng nhập',
      render: () => (
        <Tab.Pane>
          <Login />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Đăng ký',
      render: () => (
        <Tab.Pane>
          <RegisterCus />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Đăng ký bán hàng',
      render: () => (
        <Tab.Pane>
          <RegisterAccount />
        </Tab.Pane>
      ),
    },
  ];

  const onTabChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setActiveIndex((event.target as any).value);
  };

  let x = ['Topbar'];
  if (scrolled && props.isFix === true) {
    x.push('Scrolled');
  }

  return (
    <>
      <div className={x.join(' ')}>
        <div className={styles.TopbarWrapper}>
          <div className={styles.MenuLeft}>
            <div className={styles.CompanyLogo}>
              <Link to="/home">
                <img
                  src={
                    'https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/127194294_1630913430427913_3697172868772040508_n.jpg?_nc_cat=103&ccb=2&_nc_sid=730e14&_nc_ohc=9Qm-eTs2O88AX_Qn12R&_nc_ht=scontent.fhan2-6.fna&oh=bc594a38049a61bf70f1fa1b73ff9d99&oe=5FE59F96'
                  }
                />
              </Link>
            </div>
            {/* {(ref.current.userLogin == null ||
              (ref.current.userLogin && ref.current.userLogin.role === USER_ROLE.CLIENT)) && (
              <DropdownLocation defaultText={'Chọn khu vực'} changeText={changeLocation} text={location} />
            )} */}
            {props.showSearch === true && <SearchFood />}
          </div>
          <Menu.Menu position="right">
            {ref.current.userLogin && ref.current.userLogin.role === USER_ROLE.OWNER_SHOP && (
              <Menu.Item as={Link} to="/manage_shop">
                Quản lý cửa hàng
              </Menu.Item>
            )}
            <Menu.Item>
              <Dropdown
                trigger={
                  <Image
                    avatar
                    src={
                      ref.current.userLogin
                        ? 'https://yt3.ggpht.com/a-/AOh14GiO93jaj-QgqVnq2cVPC0bpBbbxzQQ4ryfUfA-txw=s88-c-k-c0xffffffff-no-rj-mo'
                        : 'data:image/jpeg;base64,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'
                    }
                  />
                }
                pointing="top right"
                icon={null}
                options={
                  ref.current.userLogin?.role === USER_ROLE.OWNER_SHOP
                    ? menuShop
                    : ref.current.userLogin?.role === USER_ROLE.CLIENT
                    ? menuCus
                    : ref.current.userLogin?.role === USER_ROLE.ADMIN
                    ? menuAdmin
                    : menuDefault
                }
              />
            </Menu.Item>
          </Menu.Menu>
        </div>
      </div>
      <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} closeIcon={true}>
        <Modal.Header>
          {activeIndex === 1 ? 'Đăng nhập' : activeIndex === 2 ? 'Đăng ký tài khoản' : 'Đăng ký tài khoản cửa hàng'}
        </Modal.Header>
        <Modal.Content>
          <Tab panes={panes} activeIndex={activeIndex} onTabChange={onTabChange} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default withErrorBoundary(TopBar, {
  FallbackComponent: Fallback,
  onError: handleError,
});
