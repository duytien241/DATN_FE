import React from 'react';
import { Link } from 'react-router-dom';
import { Obj } from 'interfaces/common';
import './styles.scss';
import { BASE_IMAGE_URL } from 'utils/common';

interface CategoryCardProps {
  categoryItem: Obj;
}

export default (props: CategoryCardProps) => {
  const { categoryItem } = props;

  return (
    <div className="CategoryCard" style={{ width: '237.5px' }}>
      <div className="item_version_2">
        <Link to={`/category/${categoryItem.id}`}>
          <figure>
            <span>{categoryItem.id}</span>
            <img
              src={`${BASE_IMAGE_URL}${categoryItem.image as string}`}
              data-src={`${BASE_IMAGE_URL}${categoryItem.image as string}`}
              alt=""
              className="owl-lazy"
              width={350}
              height={450}
              style={{ opacity: 1 }}
            />
            <div className="info">
              <h3>{categoryItem.type}</h3>
              <small>Avg price $40</small>
            </div>
          </figure>
        </Link>
      </div>
    </div>
  );
};
