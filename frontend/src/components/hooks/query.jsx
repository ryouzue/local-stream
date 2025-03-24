import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { log } from '../../utils/common.js';

const useQuery = () => {
  const location = useLocation();
  
  const [load, setLoad] = useState(true);
  const [loadVideo, setLoadVideo] = useState(true);
  const [loadList, setLoadList] = useState(true);

  const [type, setType] = useState('music');
  const [page, setPage] = useState(1);
  const [list, setList] = useState({
    amount: 0,
    files: []
  })

  const [video, setVideo] = useState();
  const [query, setQuery] = useState({});

  useEffect(() => {
    const param = new URLSearchParams(location.search);
    if (!(param.get('index') || param.get('name'))) return;
    console.log('trigger PARAMS');
    setQuery({
      index: param.get('index'),
      name: param.get('name')
    })
  }, [location.search]);

  useEffect(() => {
    if (!(query.index || query.name)) return;
    (async () => {
      console.log('trigger VIDEO');
      setLoadVideo(true);
      try {
        const getVideo = await fetch(`/api/${type}/query?type=video&${query.index ? 'index=' + query.index : 'name=' + query.name}`);
        setVideo(getVideo.url);
        setLoadVideo(false);
      } catch (err) {
        log(3, err.message);
      }
    })();
  }, [query, type]);

  useEffect(() => {
    if (!(type || page)) return;
    (async () => {
      console.log('trigger LIST');
      setLoadList(true);
      try {
        const offset = (page - 1) * 10;
        const getList = await fetch(`/api/${type}?from=${offset}&to=${offset + 10}`);
        setList(await getList.json());
        setLoadList(false);
      } catch (err) {
        log(3, err.message);
      }
    })();
  }, [type, page]);

  return {
    load, setLoad,
    loadVideo, setLoadVideo,
    loadList, setLoadList,
    /* */
    video, setVideo,
    list, setList,
    page, setPage,
    type, setType
  };
}

export default useQuery;