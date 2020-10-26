import React from 'react';
import TopBar from 'components/TopBar';
import Sidebar from 'elements/Sidebar';
import { targetMap } from 'components';
import { Segment } from 'semantic-ui-react';
import styles from './styles.scss';
import { State } from 'redux-saga/reducers';
import { connect } from 'react-redux';
import { logOut } from 'components/Login/actions';
import { withErrorBoundary } from 'react-error-boundary';
import Fallback from 'components/Fallback';
import { handleError } from 'utils/common';

const menus = [
  { title: 'Cập nhật tài khoản', target: 'account_update_info', isLeaf: true },
  { title: 'Đổi mật khẩu', target: 'account_change_password', isLeaf: true },
  { title: 'Đăng xuất', target: 'log_out', isLeaf: true },
];

interface UpdateUserProps extends React.ClassAttributes<UpdateUser> {
  logOut(): void;
}

interface UpdateUserState {
  redraw: boolean;
}

class UpdateUser extends React.Component<UpdateUserProps, UpdateUserState> {
  private activeTarget?: string;

  constructor(props: UpdateUserProps) {
    super(props);
    this.activeTarget = 'account_update_info';

    this.state = {
      redraw: false,
    };
  }

  componentDidMount() {}

  private onClickItem = (value: string) => {
    this.activeTarget = value;

    if (this.activeTarget === 'log_out') {
      this.props.logOut();
    }

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
      <div className={styles.UpdateUser}>
        <TopBar />
        <div className={styles.UpdateUserContainer}>
          <Sidebar menus={menus} onClickItem={this.onClickItem} activeTab={this.activeTarget} />
          <Segment attached className={styles.UpdateUserShopBody}>
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

const mapStateToProps = (state: State) => {
  return {};
};

export default withErrorBoundary(connect(mapStateToProps, { logOut })(UpdateUser), {
  FallbackComponent: Fallback,
  onError: handleError,
});
