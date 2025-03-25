import React from 'react';

const ArrowUpLeft = ({ size }) => {
  return (
    <svg 
      className='icon arrow-up-left'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round' 
    ><line 
        x1='17' 
        y1='17' 
        x2='7' 
        y2='7'
      ></line>
      <polyline 
        points='7 17 7 7 17 7'
      ></polyline>
    </svg>
  )
}

export default ArrowUpLeft;