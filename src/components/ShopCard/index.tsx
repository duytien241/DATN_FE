import React from 'react';
import { Obj } from 'interfaces/common';
import { Link } from 'react-router-dom';
import foodLogo from '../../assets/defaultFood.png';
import styles from './styles.scss';
import { Icon } from 'semantic-ui-react';

interface ShopCardProps {
  shopItem: Obj;
}

export default (props: ShopCardProps) => {
  const { shopItem } = props;

  return (
    <Link to={`/shop/${shopItem.id}`}>
      <div className={styles.ShopItem}>
        <figure>
          <img
            src={
              shopItem.image_url == null || (shopItem.image_url as string).length === 0
                ? foodLogo
                : (shopItem.image_url as string)
            }
            data-src={shopItem.image_url as string}
            alt=""
            className="lazy"
            width={350}
            height={233}
          />
        </figure>
        <div className="score">
          <strong>
            <Icon name="star" />
            {shopItem.rating}
          </strong>
        </div>
        <em>{shopItem.Address_R}</em>
        <h3>{shopItem.name}</h3>
        <small>{shopItem.description}</small>
        <ul>
          <li>
            <span className="ribbon off">
              <Icon name="gripfire" />
              -30%
            </span>
          </li>
          <li>{shopItem.cost}</li>
        </ul>
      </div>
    </Link>
  );
};
