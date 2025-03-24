import React, { useState, useEffect } from 'react';

import Player from './player';
import List from './list';

import useQuery from './hooks/query';

const Watch = () => {
  const [info, setInfo] = useState();
  const { 
    video, setVideo 
  } = useQuery();

  useEffect(() => {
    setVideo(video);
  }, [video, setVideo]);

  return (
    <section id='watch'>
      <div className='card'>
        <div id='content'>
          <Player
            video={video}
            state={video ? true : false}
          />
          <div className='info'>
            <div className='title'>{info ? info.replace(/\.mp4/g, '') : 'No video playing.'}</div>
          </div>
        </div>
        <List 
          video={setVideo}
          meta={setInfo}
        />
      </div>
    </section>
  );
}

export default Watch;