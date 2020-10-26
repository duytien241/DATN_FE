import React from 'react';
import TopBar from 'components/TopBar';
import styles from './styles.scss';
import Sidebar from 'elements/Sidebar';
import { targetMap } from 'components';
import { Segment } from 'semantic-ui-react';

const menus = [
  { title: 'Quản lý đơn hàng', target: 'manage_order', isLeaf: true },
  { title: 'Quản lý món ăn', target: 'manage_food', isLeaf: true },
  { title: 'Quản lý menu', target: 'manage_menu', isLeaf: true },
  { title: 'Quản lý Sale', target: 'manage_sale', isLeaf: true },
  { title: 'Đánh giá cửa hàng', target: 'manage_rating', isLeaf: true },
  {
    title: 'Thống kê',
    target: 'manage_stattiscal',
    isLeaf: true,
  },
];

interface DashboardShopProps extends React.ClassAttributes<DashboardShop> {
  activeTarget?: string;
}

interface DashboardShopState {
  redraw: boolean;
}

class DashboardShop extends React.Component<DashboardShopProps, DashboardShopState> {
  private activeTarget?: string;

  constructor(props: DashboardShopProps) {
    super(props);
    this.activeTarget = this.props.activeTarget ? this.props.activeTarget : 'manage_menu';

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
      <div className={styles.DashboardShop}>
        <TopBar />
        <div className={styles.DashboardShopContainer}>
          <Sidebar menus={menus} onClickItem={this.onClickItem} activeTab={this.activeTarget} />
          <Segment attached className={styles.DashboardShopBody}>
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

export default DashboardShop;
