import React from 'react';

const Maximize = ({ size }) => {
  return (
    <svg 
      className='icon maximize'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round' 
    ><polyline 
        points='15 3 21 3 21 9'
      ></polyline>
      <polyline 
        points='9 21 3 21 3 15'
      ></polyline>
      <line 
        x1='21' 
        y1='3' 
        x2='14' 
        y2='10'
      ></line>
      <line 
        x1='3' 
        y1='21' 
        x2='10' 
        y2='14'
      ></line>
    </svg>
  )
}

export default Maximize;