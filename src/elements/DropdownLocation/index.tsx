import { getLocationData } from 'components/reducers';
import { Obj } from 'interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { isBlank } from 'utils/common';

interface DropdownLocationProps {
  type?: string;
  defaultText?: string;
  text?: string;

  changeText?(data: Obj): void;
}

export enum DROPDOWN_TYPE {
  LOCATION = 'location',
  SHOP_TYPE = 'shop_type',
  FOOD_TYPE = 'food_type',
}

export default (props: DropdownLocationProps) => {
  const locationData = useSelector(getLocationData);

  const [, setRedraw] = useState();
  const ref = useRef<{
    lsCity: Obj[];
    lsShopType: Obj[];
    lsFoodType: Obj[];
  }>({
    lsCity: [],
    lsFoodType: [],
    lsShopType: [],
  });

  useEffect(() => {
    if (locationData) {
      ref.current.lsCity = locationData;
    }
    setRedraw({});
  }, [locationData]);

  const onChangeCity = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    if (props.changeText) {
      props.changeText(data);
    }
  };

  return (
    <Dropdown
      button
      className="icon"
      floating
      labeled
      icon="world"
      options={ref.current.lsCity}
      search
      text={isBlank(props.text) ? props.defaultText : props.text}
      onChange={onChangeCity}
    />
  );
};
