import React from 'react';

const CollectionCard = ({ name, description, id, handleClick }) => {
  return (
    <div>
      <div className='card collection-card' onClick={() => handleClick(id)}>
        <h1>{name}</h1>
        <h3>{description}</h3>
      </div>
    </div>
  );
};

export default CollectionCard;
