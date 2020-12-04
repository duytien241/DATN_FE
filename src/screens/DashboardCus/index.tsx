import React from 'react';
import TopBar from 'components/TopBar';
import Sidebar from 'elements/Sidebar';
import { targetMap } from 'components';
import { Segment } from 'semantic-ui-react';
import styles from './styles.scss';

const menus = [
  { title: 'Quản lý đơn hàng', target: 'manage_order_cus', isLeaf: true },
  { title: 'Thông tin tài khoản', target: 'manage_account_cus', isLeaf: true },
  { title: 'Đổi mật khẩu', target: 'account_change_password', isLeaf: true },
  { title: 'Đăng xuất', target: 'log_out', isLeaf: true },
];

interface DashboardCusProps extends React.ClassAttributes<DashboardCus> {
  activeTarget?: string;
}

interface DashboardCusState {
  redraw: boolean;
}

class DashboardCus extends React.Component<DashboardCusProps, DashboardCusState> {
  private activeTarget?: string;

  constructor(props: DashboardCusProps) {
    super(props);
    this.activeTarget = this.props.activeTarget ? this.props.activeTarget : 'manage_order_cus';

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
    let Comp: React.ComponentType<{}> | null = null;

    if (targetMap != null && this.activeTarget) {
      Comp = targetMap[this.activeTarget];
    }

    return (
      <div className={`${styles.DashboardCus} ParentContainer`}>
        <TopBar />
        <div className={styles.DashboardCusContainer}>
          <Sidebar
            title="Quản lý tài khoản"
            menus={menus}
            onClickItem={this.onClickItem}
            activeTab={this.activeTarget}
          />
          <Segment attached className={styles.DashboardCusBody}>
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

export default DashboardCus;
