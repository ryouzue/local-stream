import React from 'react';

const Loading = ({ type, size }) => {
  return (
    <>{type === 'circle' && (
      <div 
        className='loading-circle' 
        style={{ 
          width: size + 'em',
          height: size + 'em'
        }}
      ></div>
    )}</>
  );
};

export default Loading;