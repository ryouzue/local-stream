import React from 'react';

const SkipBackward = ({ size }) => {
  return (
    <svg 
      className='icon skip-backward'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round'
    ><polygon 
        points='19 20 9 12 19 4 19 20'
      ></polygon>
      <line 
        x1='5' 
        y1='19' 
        x2='5' 
        y2='5'
      ></line>
    </svg>
  )
}

export default SkipBackward;