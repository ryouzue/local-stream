import React, { useState, useEffect, useRef } from 'react';

import { PlaySVG, PauseSVG, ArrowDRSVG, ArrowULSVG } from './_icons/.export';
import Loading from './loading';

import { log } from '../utils/common.js';
import useQuery from './hooks/query';

const Player = ({ video, state }) => {
  const { 
    loadVideo, setLoadVideo,
  } = useQuery();

   /* eslint-disable */
  const [anim, setAnim] = useState('');
  const [isPlay, setIsPlay] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if(loadVideo) return;
    if(videoRef.current) isPlay
      ? videoRef.current.pause()
      : videoRef.current.play();
    setIsPlay(!isPlay);
  };

  const toggleFullscreen = () => {
    isFull
      ? document.exitFullscreen().catch((err) => log(5, err.message))
      : videoRef.current?.requestFullscreen();
    setIsFull(!isFull);
  };

  const onKeyDown = (event) => {
    if(event.key === 'Escape' && !isFull) {
      event.preventDefault();
      toggleFullscreen();
    }

    if(event.key === ' ') {
      event.preventDefault();
      togglePlay();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div id='player'>
      { loadVideo && <Loading type='circle' size={5} /> }
      <video
        ref={state ? videoRef : null}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        onLoadStart={() => {
          setLoadVideo(true)
          setIsPlay(false);
        }}
        onLoadedData={() => {
          setLoadVideo(false);
          setIsPlay(true);
        }}
        className={state ? 'stream' : 'default'}
        src={state ? video : '/_media/videos/rendergirl.mp4'}
        type='video/mp4'
        autoPlay
        loop={state ? false : true}
        muted={state ? false : true}
        disablePictureInPicture
        onEnded={togglePlay}
      />
      <div className='options'>
        <div className='timeline'></div>
        <div className='controls'>
          <button className='btn-play' onClick={togglePlay}>
            { isPlay 
              ? <PauseSVG size={24} /> 
              : <PlaySVG size={24} /> 
            }
          </button>
          <button className='btn-fullscreen' onClick={toggleFullscreen}>
            { isFull 
              ? <ArrowDRSVG size={30} /> 
              : <ArrowULSVG size={30} />
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;