import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { BASE_IMAGE_URL, formatNumber } from 'utils/common';
import foodLogo from '../../assets/defaultFood.png';
import { Obj } from 'interfaces/common';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

interface FoodCardProps {
  foodItem: Obj;
}

export default (props: FoodCardProps) => {
  const { image, name, Address_R, price, info, id_food } = props.foodItem;

  return (
    <Link to={`/food/${id_food}`}>
      <Card className={styles.FoodCard}>
        <Image src={image == null ? foodLogo : `${BASE_IMAGE_URL}${image}`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className="date">{Address_R}</span>
          </Card.Meta>
          <Card.Description>{info}</Card.Description>
        </Card.Content>
        <Card.Content extra>{`${formatNumber(price as number)} VND`}</Card.Content>
      </Card>
    </Link>
  );
};
