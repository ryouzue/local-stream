import React from 'react';

const SkipForward = ({ size }) => {
  return (
    <svg 
      className='icon skip-forward'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round'
    ><polygon 
        points='5 4 15 12 5 20 5 4'
      ></polygon>
      <line 
        x1='19' 
        y1='5' 
        x2='19' 
        y2='19'
      ></line>
    </svg>
  )
}

export default SkipForward;