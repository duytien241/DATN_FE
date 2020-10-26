import React from 'react';
import { deleteFood, orderFood } from 'components/actions';
import { Obj } from 'interfaces/common';
import { useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';

interface QuantityOrder {
  order: Obj;
}

export default (props: QuantityOrder) => {
  const dispatch = useDispatch();
  const onDeleteFood = () => {
    dispatch(deleteFood(props.order));
  };

  const onOrder = () => {
    dispatch(
      orderFood({
        name: props.order.name,
        price: props.order.price,
        image: props.order.image,
        id_food: props.order.id_food,
      })
    );
  };

  return (
    <div className="OrderQuantity">
      <div className="Quantity">{props.order.quantity}</div>
      <div className="ControlButtons">
        <button onClick={onOrder}>
          <Icon name="caret up" />
        </button>
        <button onClick={onDeleteFood}>
          <Icon name="caret down" />
        </button>
      </div>
    </div>
  );
};
