import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Tab } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import TopBar from 'components/TopBar';
import FoodGrid from 'components/FoodGrid';
// import DropdownFoodType from 'elements/DropdownFoodType';
// import DropdownShopType from 'elements/DropdownShopType';
// import Slider from 'elements/Slider';
// import DropdownLocation, { DROPDOWN_TYPE } from 'elements/DropdownLocation';
// import { Obj } from 'interfaces/common';
// import topBaner from '../../assets/topbanner.jpg';
import { handleError } from 'utils/common';
import Fallback from 'components/Fallback';
import { State } from 'redux-saga/reducers';
// import foodLogo from '../../assets/defaultFood.png';
import styles from './styles.scss';
import Footer from 'components/Footer';
import FooterTop from 'components/FooterTop';
import ShopGrid from 'components/ShopGrid';
import BannerCenterHome from 'components/BannerCenterHome';
import CategoryGrid from 'components/CategoryGrid';
import Banner from 'components/Banner';
// import Navbar from 'components/NavBar';

export enum TAB_TYPE {
  FOOD = 'FOOD',
  SHOP = 'SHOP',
}

interface HomeProps extends React.ClassAttributes<Home> {}

interface HomeState {
  redraw: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  // private textLocaltion = '';
  // private textFoodType = '';
  // private textShopType = '';
  // private shopList: Obj[] = [];

  constructor(props: HomeProps) {
    super(props);

    this.state = {
      redraw: false,
    };
  }

  componentDidMount() {
    // this.props.queryShopList();
  }

  render() {
    return (
      <div className={styles.Home}>
        <TopBar isFix={true} showSearch={true} />
        <Banner />
        <CategoryGrid />
        <div className={styles.ContainerSection}>
          <Tab
            className={styles.ShopSection}
            menu={{ attached: false, tabular: false, className: 'MenuSection' }}
            panes={[
              {
                menuItem: (
                  <Header as="h3">
                    <Icon name="shop" />
                    <Header.Content>Cửa hàng</Header.Content>
                  </Header>
                ),
                render: () => (
                  <Tab.Pane attached={false}>
                    <ShopGrid />
                  </Tab.Pane>
                ),
              },
            ]}
          />
          <BannerCenterHome />
          <Tab
            className={styles.FoodSection}
            menu={{ attached: false, tabular: false, className: 'MenuSection' }}
            panes={[
              {
                menuItem: (
                  <Header as="h3">
                    <Icon name="food" />
                    <Header.Content>Món ăn</Header.Content>
                  </Header>
                ),
                render: () => (
                  <Tab.Pane attached={false}>
                    <FoodGrid limit={12} />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </div>
        <FooterTop />
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state: State) => {
  return {
    shopList: state.shopList,
  };
};

export default withErrorBoundary(connect(mapStateToProps, {})(Home), {
  FallbackComponent: Fallback,
  onError: handleError,
});
