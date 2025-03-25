import React from 'react';
import useQuery from './hooks/query';

const Paginate = ({ total, perPage, onChange }) => {
  const { page, setPage } = useQuery();
  const pages = Math.ceil(total / perPage);

  const handleNext = () => {
    if(page < pages) {
      setPage(prev => prev + 1);
      onChange(page + 1);
    }
  }

  const handlePrev = () => {
    if(page > 1) {
      setPage(prev => prev - 1);
      onChange(page - 1);
    }
  }

  const handleClick = (num) => {
    setPage(num);
    onChange(num);
  }

  return (
    <div className='paginate'>
      <button onClick={() => handlePrev()} disabled={page === 1}>{'⋞'}</button>
      <div className='pages'>
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={page === index + 1 ? 'active' : ''}
          >{index + 1}</button>
        ))}
      </div>
      <button onClick={() => handleNext()} disabled={page === pages}>{'⋟'}</button>
    </div>
  );
}

export default Paginate;