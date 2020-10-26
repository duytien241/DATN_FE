import React from 'react';
import { connect } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { Button, Image, List, Modal } from 'semantic-ui-react';

interface OrderInfoModalProps {}

interface OrderInfoModalState {
  showOrderFormInfo: boolean;
  showSaleList: boolean;
}

class OrderInfoModal extends React.Component<OrderInfoModalProps, OrderInfoModalState> {
  constructor(props: OrderInfoModalProps) {
    super(props);

    this.state = {
      showOrderFormInfo: false,
      showSaleList: false,
    };
  }

  private showOrderInfo = () => {
    this.setState({
      showOrderFormInfo: true,
    });
  };

  private setOpenOrderInfo = (showOrderFormInfo: boolean) => {
    this.setState({
      showOrderFormInfo: showOrderFormInfo,
    });
  };

  private showSaleList = () => {
    this.setState({
      showSaleList: true,
    });
  };

  private setOpenSaleList = (showSaleList: boolean) => {
    this.setState({
      showSaleList: showSaleList,
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.showOrderInfo} content="Show"></Button>
        <Modal
          closeIcon={true}
          onClose={() => this.setOpenOrderInfo(false)}
          onOpen={() => this.setOpenOrderInfo(true)}
          open={this.state.showOrderFormInfo}
        >
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions></Modal.Actions>
          <Button onClick={this.showSaleList} content="Show" />
          <Modal
            onClose={() => this.setOpenSaleList(false)}
            onOpen={() => this.setOpenSaleList(true)}
            open={this.state.showSaleList}
          >
            <List divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right">
                  <Button onClick={() => this.setOpenSaleList(false)}>Add</Button>
                </List.Content>
                <Image avatar src="/images/avatar/small/lena.png" />
                <List.Content>Lena</List.Content>
              </List.Item>
            </List>
          </Modal>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({});

export default connect(mapStateToProps, {})(OrderInfoModal);
