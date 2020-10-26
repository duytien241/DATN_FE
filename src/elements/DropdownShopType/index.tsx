import { getShopType } from 'components/reducers';
import { Obj } from 'interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { isBlank } from 'utils/common';

interface DropdownLocationProps {
  defaultText?: string;
  text?: string;

  changeText?(data: Obj): void;
}
export default (props: DropdownLocationProps) => {
  const shopType = useSelector(getShopType);

  const [, setRedraw] = useState();
  const ref = useRef<{
    lsShopType: Obj[];
  }>({
    lsShopType: [],
  });

  useEffect(() => {
    if (shopType) {
      ref.current.lsShopType = shopType;
    }
    setRedraw({});
  }, [shopType]);

  const onChangeValue = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    if (props.changeText) {
      props.changeText(data);
    }
  };

  console.log(props.text);

  return (
    <Dropdown
      button
      className="icon"
      floating
      labeled
      icon="world"
      options={ref.current.lsShopType}
      search
      text={isBlank(props.text) ? props.defaultText : props.text}
      onChange={onChangeValue}
    />
  );
};
