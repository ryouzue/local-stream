import React from 'react';

const PauseRound = ({ size }) => {
  return (
    <svg 
      className='icon pause-round'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round'
    ><circle 
        cx='12' 
        cy='12' 
        r='10'>
      </circle>
      <line 
        x1='10' 
        y1='15' 
        x2='10' 
        y2='9'
      ></line>
      <line 
        x1='14' 
        y1='15' 
        x2='14' 
        y2='9'
      ></line>
    </svg>
  )
}

export default PauseRound;