import React from 'react';

const Play = ({ size }) => {
  return (
    <svg 
      className='icon play'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round'
    ><polygon 
        points='5 3 19 12 5 21 5 3'
      ></polygon>
    </svg>
  )
}

export default Play;