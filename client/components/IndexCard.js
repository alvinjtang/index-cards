import React from 'react';
import { Link } from 'react-router-dom';

const IndexCard = ({ front, back, collectionId }) => {
  return (
    <div>
      <div className='collection-card'>
        <h2>{front}</h2>
        <p>{back}</p>
      </div>
    </div>
  );
};

export default IndexCard;
