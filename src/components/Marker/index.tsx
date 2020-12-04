import React from 'react';
import './styles.scss';

const Marker = (props: any) => {
  const { color, name, id } = props;
  return (
    <div id={id}>
      <div className="pin bounce" style={{ backgroundColor: color, cursor: 'pointer' }} title={name} />
      <div className="pulse" />
    </div>
  );
};

export default Marker;
