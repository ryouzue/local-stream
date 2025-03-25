import React from 'react';

const VolumeMute = ({ size }) => {
  return (
    <svg 
      className='icon volume-mute'
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
      <line 
        x1='23' 
        y1='9' 
        x2='17' 
        y2='15'
      ></line>
      <line 
        x1='17' 
        y1='9' 
        x2='23' 
        y2='15'
      ></line>
    </svg>
  )
}

export default VolumeMute;