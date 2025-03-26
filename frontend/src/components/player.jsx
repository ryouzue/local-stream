import React, { useState, useEffect, useRef } from 'react';

import { PlaySVG, PauseSVG, ArrowDRSVG, ArrowULSVG, VolumeMuteSVG, VolumeMinSVG, VolumeMidSVG, VolumeMaxSVG } from './_icons/.export';
import { log } from '../utils/common.js';

import Loading from './loading';

const Player = ({ video, state }) => {
  const [load, setLoad] = useState(true);
  const [status, setStatus] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [volume, setVolume] = useState(1);
  const [time, setTime] = useState({});
  const videoRef = useRef(null);

  const togglePlay = () => {
    if(load) return;
    if(videoRef.current) status
      ? videoRef.current.pause()
      : videoRef.current.play();
    setStatus(!status);
  };

  const toggleFullscreen = () => {
    isFull
      ? document.exitFullscreen().catch((err) => log(5, err.message))
      : videoRef.current?.requestFullscreen();
    setIsFull(!isFull);
  };

  const volumeIconRender = () => {
    if(volume > .01 && volume <= .33) return <VolumeMinSVG size={26} />;
    else if(volume > .33 && volume <= .66) return <VolumeMidSVG size={26} />;
    else if(volume > .66) return <VolumeMaxSVG size={26} />;
    else return <VolumeMuteSVG size={26} />;
  }

  const onLoadStart = () => {
    setTime({});
    setLoad(true);
    setStatus(false);
  }

  const onLoadedData = () => {
     /* To be gone after rewriting backend soon */
    if(videoRef.current) {
      const tot = videoRef.current?.duration;
      isFinite(tot) && setTime({ 
        tot: forTime(tot) 
      });
    }

    setLoad(false);
    setStatus(true);
  }

  const onTimeUpdate = () => {
    if(videoRef.current) {
      const tot = videoRef.current.duration; /* To be gone soon */
      const cur = videoRef.current.currentTime;
      const rem = tot - cur;
      setTime({
        tot: forTime(tot), /* To also be gone soon */
        cur: forTime(cur),
        rem: forTime(rem)
      });
    }
  }

  const zf = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2
  })

  const forTime = (time) => {
    const sec = Math.floor(time % 60);
    const min = Math.floor(time / 60) % 60;
    const hr = Math.floor(time / 3600);

    const result = `${hr ? zf.format(hr) + ':' : ''}${zf.format(min)}:${zf.format(sec)}`
    return result;
  }

  const forSkip = (sec) => {
    if(videoRef.current) videoRef.current.currentTime += sec;
    return;
  }

  const onKeyDown = (event) => {
    event.preventDefault();
    switch (event.key) {
      case ' ':
        togglePlay();
        break;
      case 'Escape':
        toggleFullscreen();
        break;
      case 'ArrowLeft':
        forSkip(-5);
        break;
      case 'ArrowRight':
        forSkip(5);
        break;
      case 'ArrowUp':
        console.log(volume);
        setVolume(Math.min(1, volume + .1));
        break;
      case 'ArrowDown':
        console.log(volume);
        setVolume(Math.max(0, volume - .1));
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  useEffect(() => {
    if(!videoRef.current) return;
    console.log(volume);
    videoRef.current.volume = volume;
  }, [volume])

  return (
    <div id='player'>
      { load && <Loading type='circle' size={5} /> }
      <video
        className={state ? 'stream' : '_default'}
        ref={state ? videoRef : null}
        src={state ? video : '/_media/videos/rendergirl.mp4'}
        muted={state ? false : true}
        loop={state ? false : true}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
        onLoadStart={onLoadStart}
        onLoadedData={onLoadedData}
        onEnded={togglePlay}
        onTimeUpdate={onTimeUpdate}
        type='video/mp4'
        autoPlay
        disablePictureInPicture
      />
      <div className='options'>
        <div className='timeline'></div>
        <div className='controls'>
          <button className='btn-play' onClick={togglePlay}>
            { status 
              ? <PauseSVG size={24} /> 
              : <PlaySVG size={24} /> 
            }
          </button>
          <div className='volume-control'>
            <button className='btn-volume' onClick={() => volume === 0 ? setVolume(1) : setVolume(0)}>
              {volumeIconRender(volume)}
            </button>
            <div className='slider'>
              <input 
                id='volume-range'
                type='range' 
                min='0' 
                max='1' 
                step='any'
                value={volume}
                onChange={(event) => setVolume(parseFloat(event.target.value))}
              />
            </div>
          </div>
          <div className='duration-view'>
            <div id='current'>{time.cur ? time.cur : '--:--'}</div>
            •
            <div id='total'>{time.tot ? time.tot : '--:--'}</div>
          </div>
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