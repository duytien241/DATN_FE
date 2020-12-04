import { getFoodType } from 'components/reducers';
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
  const foodType = useSelector(getFoodType);

  const [, setRedraw] = useState();
  const ref = useRef<{
    lsFoodType: Obj[];
    textFoodType: string;
  }>({
    lsFoodType: [],
    textFoodType: '',
  });

  useEffect(() => {
    if (foodType) {
      ref.current.lsFoodType = foodType;
    }
    setRedraw({});
  }, [foodType]);

  const onChangeValue = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    ref.current.textFoodType = (data.options as any).find((item: any) => item.id === data.value).text;
    if (props.changeText) {
      props.changeText(data);
    }
    setRedraw({});
  };

  return (
    <Dropdown
      button
      className="icon"
      floating
      labeled
      icon="food"
      options={ref.current.lsFoodType}
      search
      text={isBlank(ref.current.textFoodType) ? props.defaultText : ref.current.textFoodType}
      onChange={onChangeValue}
    />
  );
};
