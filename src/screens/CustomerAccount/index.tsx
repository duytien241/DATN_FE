import React from 'react';
import { Segment } from 'semantic-ui-react';
import TopBar from 'components/TopBar';
import Sidebar from 'elements/Sidebar';
import { targetMap } from 'components';
import styles from './styles.scss';

const menus = [
  { title: 'Cập nhật tài khoản', target: 'update_account_cus', isLeaf: true },
  { title: 'Đổi mật khẩu', target: 'account_change_password', isLeaf: true },
  { title: 'Quản lý địa chỉ', target: 'manage_address_cus', isLeaf: true },
  { title: 'Đăng xuất', target: 'log_out', isLeaf: true },
];

interface CustomerAccountProps extends React.ClassAttributes<CustomerAccount> {}

interface CustomerAccountState {
  redraw: boolean;
}

class CustomerAccount extends React.Component<CustomerAccountProps, CustomerAccountState> {
  private activeTarget?: string;

  constructor(props: CustomerAccountProps) {
    super(props);
    this.activeTarget = 'update_account_cus';

    this.state = {
      redraw: false,
    };
  }

  componentDidMount() {}

  private onClickItem = (value: string) => {
    this.activeTarget = value;

    this.setState({
      redraw: !this.state.redraw,
    });
  };

  render() {
    let Comp: React.ComponentType<{ type?: string }> | null = null;

    if (targetMap != null && this.activeTarget) {
      Comp = targetMap[this.activeTarget];
    }

    return (
      <div className={styles.CustomerAccount}>
        <TopBar />
        <div className={styles.CustomerAccountContainer}>
          <Sidebar menus={menus} onClickItem={this.onClickItem} activeTab={this.activeTarget} />
          <Segment attached className={styles.CustomerAccountBody}>
            {Comp && (
              //@ts-ignore
              <Comp ref={this.compRef} />
            )}
          </Segment>
        </div>
      </div>
    );
  }
}

export default CustomerAccount;
