import React from 'react';
import TopBar from 'components/TopBar';
import Sidebar from 'elements/Sidebar';
import { targetMap } from 'components';
import { Segment } from 'semantic-ui-react';
import styles from './styles.scss';

const menus = [
  { title: 'Quản lý danh sách đăng ký bán hàng', target: 'manage_shop_list', isLeaf: true },
  { title: 'Danh sách đăng ký bán hàng chờ duyệt', target: 'manage_shop_pending_list', isLeaf: true },
  { title: 'Quản lý khách đăng ký', target: 'manage_cus_list', isLeaf: true },
  { title: 'Thông tin tài khoản', target: 'admin_info', isLeaf: true },
  { title: 'Đăng xuất', target: 'log_out', isLeaf: true },
];

interface DashboardAdminProps extends React.ClassAttributes<DashboardAdmin> {
  activeTarget?: string;
}

interface DashboardAdminState {
  redraw: boolean;
}

class DashboardAdmin extends React.Component<DashboardAdminProps, DashboardAdminState> {
  private activeTarget?: string;

  constructor(props: DashboardAdminProps) {
    super(props);
    this.activeTarget = this.props.activeTarget ? this.props.activeTarget : 'manage_shop_list';

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
      <div className={styles.DashboardAdmin}>
        <TopBar />
        <div className={styles.DashboardAdminContainer}>
          <Sidebar menus={menus} onClickItem={this.onClickItem} activeTab={this.activeTarget} />
          <Segment attached className={styles.DashboardAdminBody}>
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

export default DashboardAdmin;
