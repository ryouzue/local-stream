import React from 'react';

const VideoOn = ({ size }) => {
  return (
    <svg 
      className='icon video-on'
      width={size + 'px'}
      height={size + 'px'}
      viewBox='0 0 24 24' 
      fill='none' 
      stroke='currentColor' 
      strokeWidth='2' 
      strokeLinecap='round' 
      strokeLinejoin='round'
    ><polygon 
        points='23 7 16 12 23 17 23 7'
      ></polygon>
      <rect 
        x='1' 
        y='5' 
        width='15' 
        height='14' 
        rx='2' 
        ry='2'
      ></rect>
    </svg>
  )
}

export default VideoOn;