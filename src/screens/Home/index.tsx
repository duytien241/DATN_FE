import React from 'react';
import { connect } from 'react-redux';
import { Card, Image, Tab } from 'semantic-ui-react';
import { withErrorBoundary } from 'react-error-boundary';
import TopBar from 'components/TopBar';
import DropdownFoodType from 'elements/DropdownFoodType';
import DropdownShopType from 'elements/DropdownShopType';
import DropdownLocation, { DROPDOWN_TYPE } from 'elements/DropdownLocation';
import { Obj } from 'interfaces/common';
import { BASE_IMAGE_URL, handleError } from 'utils/common';
import Fallback from 'components/Fallback';
import { queryFoodList, queryShopList } from 'components/actions';
import { State } from 'redux-saga/reducers';
import foodLogo from '../../assets/defaultFood.png';
import styles from './styles.scss';
import FoodGrid from 'components/FoodGrid';
import { Link } from 'react-router-dom';

export enum TAB_TYPE {
  FOOD = 'FOOD',
  SHOP = 'SHOP',
}

interface HomeProps extends React.ClassAttributes<Home> {
  shopList: Obj[];
  foodList: Obj[];

  queryFoodList(params: Obj): void;
  queryShopList(params: Obj): void;
}

interface HomeState {
  redraw: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  private textLocaltion = '';
  private textFoodType = '';
  private textShopType = '';

  constructor(props: HomeProps) {
    super(props);

    this.state = {
      redraw: false,
    };
  }

  componentDidUpdate() {
    console.log(this.props.shopList);
  }

  private changeAddress = (data: Obj) => {
    console.log(data);
    this.textLocaltion = (data.options as any).find((item: any) => item.id === data.value).text;

    let params = null;
    params = {
      location: data.value,
    };
    this.props.queryFoodList(params);

    this.setState({
      redraw: !this.state.redraw,
    });
  };

  private changeFoodType = (data: Obj) => {
    this.textFoodType = (data.options as any).find((item: any) => item.id === data.value).text;

    const params = {
      type: data.value,
    };
    this.props.queryFoodList(params);
    this.setState({
      redraw: !this.state.redraw,
    });
  };

  private changeShopType = (data: Obj) => {
    this.textShopType = (data.options as any).find((item: any) => item.id === data.value).text;
    const params = {
      type: data.value,
    };
    this.props.queryShopList(params);
    this.setState({
      redraw: !this.state.redraw,
    });
  };

  render() {
    return (
      <div className={styles.Home}>
        <TopBar />
        <Tab
          menu={{ attached: false, tabular: false }}
          panes={[
            {
              menuItem: 'Cửa hàng',
              render: () => (
                <Tab.Pane attached={false}>
                  <div>
                    <DropdownLocation type={DROPDOWN_TYPE.LOCATION} defaultText="Chọn địa điểm" />
                    <DropdownShopType
                      defaultText="Chọn loại cửa hàng"
                      changeText={this.changeShopType}
                      text={this.textShopType}
                    />
                  </div>
                  {this.props.shopList.map((shop: Obj) => {
                    return (
                      <Link to={`/shop/${shop.id}`}>
                        <Card className={styles.ShopCard}>
                          <Image
                            src={shop.image == null ? foodLogo : `${BASE_IMAGE_URL}${shop.image}`}
                            wrapped
                            ui={false}
                          />
                          <Card.Content>
                            <Card.Header>{shop.NameR}</Card.Header>
                            <Card.Meta>
                              <span className="date">{shop.Address_R}</span>
                            </Card.Meta>
                            <Card.Description>{shop.desc}</Card.Description>
                          </Card.Content>
                        </Card>
                      </Link>
                    );
                  })}
                </Tab.Pane>
              ),
            },
          ]}
        />
        <Tab
          menu={{ attached: false, tabular: false }}
          panes={[
            {
              menuItem: 'Món ăn',
              render: () => (
                <Tab.Pane attached={false}>
                  <div>
                    <DropdownLocation
                      defaultText="Chọn địa điểm"
                      changeText={this.changeAddress}
                      text={this.textLocaltion}
                    />
                    <DropdownFoodType
                      defaultText="Chọn loại món ăn"
                      changeText={this.changeFoodType}
                      text={this.textFoodType}
                    />
                  </div>
                  <FoodGrid />
                </Tab.Pane>
              ),
            },
          ]}
        />
      </div>
    );
  }
}
const mapStateToProps = (state: State) => {
  return {};
};

export default withErrorBoundary(connect(mapStateToProps, { queryFoodList, queryShopList })(Home), {
  FallbackComponent: Fallback,
  onError: handleError,
});
