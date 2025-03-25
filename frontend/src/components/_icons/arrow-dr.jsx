import React from 'react';

const ArrowDownRight = ({ size }) => {
  return (
    <svg 
      className='icon arrow-down-right'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round'
    ><line 
        x1='7' 
        y1='7' 
        x2='17' 
        y2='17'
      ></line>
      <polyline 
        points='17 7 17 17 7 17'
      ></polyline>
    </svg>
  )
}

export default ArrowDownRight;