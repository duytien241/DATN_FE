import React from 'react';
import { Link } from 'react-router-dom';
import { Obj } from 'interfaces/common';
import './styles.scss';

interface CategoryCardProps {
  categoryItem: Obj;
}

export default (props: CategoryCardProps) => {
  const { categoryItem } = props;

  return (
    <div className="CategoryCard" style={{ width: '250px' }}>
      <div className="item_version_2">
        <Link to={`/category/${categoryItem.id}`}>
          <figure>
            <span>{categoryItem.id}</span>
            <img
              src={categoryItem.image_url as string}
              data-src={categoryItem.image_url as string}
              alt=""
              className="owl-lazy"
              width={350}
              height={450}
              style={{ opacity: 1 }}
            />
            <div className="info">
              <h3>{categoryItem.type}</h3>
              <small>{categoryItem.name}</small>
            </div>
          </figure>
        </Link>
      </div>
    </div>
  );
};
