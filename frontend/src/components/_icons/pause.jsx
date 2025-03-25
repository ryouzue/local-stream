import React from 'react';

const Pause = ({ size }) => {
  return (
    <svg 
      className='icon pause'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round' 
    ><rect 
        x='6' 
        y='4' 
        width='4' 
        height='16'
      ></rect>
      <rect 
        x='14' 
        y='4'
        width='4' 
        height='16'
      ></rect>
    </svg>
  )
}

export default Pause;