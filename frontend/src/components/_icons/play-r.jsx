import React from 'react';

const PlayRound = ({ size }) => {
  return (
    <svg 
      className='icon play-round'
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
        r='10'
      ></circle>
      <polygon 
        points='10 8 16 12 10 16 10 8'
      ></polygon>
    </svg>
  )
}

export default PlayRound;