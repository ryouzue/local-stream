import React from 'react';

const VolumeMin = ({ size }) => {
  return (
    <svg 
      className='icon volume-min'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round'
    ><polygon 
        points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'
      ></polygon>
    </svg>
  )
}

export default VolumeMin;