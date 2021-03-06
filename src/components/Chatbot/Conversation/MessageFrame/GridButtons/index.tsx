import React from 'react';
import { Button } from 'components/Semantic';
import { Obj } from 'interfaces/common';
import styles from './styles.scss';

interface QuickButtonsProps {
  slidesToShow?: number;
  buttons?: Obj[];
  arrows?: boolean;

  onClickButton?(data?: Obj): void;
}

export default (props: QuickButtonsProps) => {
  const { buttons } = props;

  return (
    <div className={styles.BannerChatbot}>
      <div className="Buttons">
        {buttons?.map((button, index) => {
          if (((button as unknown) as string).length != 0) {
            return (
              <Button basic color="blue" key={index} content={button} onClick={() => props.onClickButton!(button)} />
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
};
