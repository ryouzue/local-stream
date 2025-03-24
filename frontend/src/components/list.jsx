import { useState } from 'react';

import Loading from './loading';
import Paginate from './paginate';

// import { log } from '../utils/common.js';
import useQuery from './hooks/query';

const List = ({ video, meta }) => {
  const perPage = 10;
  const [loadImage, setLoadImage] = useState({});

  const { 
    list, type, loadList,  
    setLoadList, setPage
  } = useQuery();

  const handleImageLoad = (index) => {
    setLoadImage((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className='side'>
      <div id='opts'>
        <Paginate 
          total={list.total} 
          perPage={perPage} 
          onChange={(page) => {
            setPage(page);
            setLoadList(true);
            setLoadImage({});
          }}
        />
      </div>
      <div id='list'>
        {loadList ? (
          <Loading type='circle' size={5} />
        ) : list.files ? (
            list.files.map((item, index) => (
              <a 
                key={index} 
                onClick={() => {
                  video(item.video.url);
                  meta(item.name)
                }}
              >
                <div className='item'>
                  <div className='thumbnail'>
                    {!loadImage[index] && <Loading type='circle' size={3} />}
                    <img 
                      onLoad={(event) => {
                        event.preventDefault();
                        handleImageLoad(index);
                      }}
                      src={item.image.url}
                    />
                  </div>
                  <div className='video-title'>{
                    item.name.replace(/\s*\(.*?\)\s*|\.mp4$/g, ' ')
                  }</div>
                </div>
              </a>
            ))
        ) : (
          <div className='no-videos'>No {type} videos available.</div> 
        )}
      </div>
    </div>
  )
}

export default List;