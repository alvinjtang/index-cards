import React from 'react';

const CollectionCard = ({ name, description, id, handleClick }) => {
  return (
    <div>
      <div className='card collection-card' onClick={() => handleClick(id)}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
