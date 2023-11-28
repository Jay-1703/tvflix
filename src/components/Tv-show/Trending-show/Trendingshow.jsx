import React, { useEffect, useState } from 'react';
import { getAllTrendingTvShow } from '../../../Api/tvshow-api/api';
import TvShowCard from '../../Common/Tvshow-card/TvShowcard';

const Trendingshow = () => {
  const [trendingShowList, setTrendingShowList] = useState([]);

  const getData = async () => {
    const data = await getAllTrendingTvShow();
    setTrendingShowList(data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="px-2 md:px-5 mt-3">
        <div className="text-gray-200 font-semibold text-lg title">Trending TV-Show</div>
        <div className="flex gap-x-4 overflow-x-auto overflow-y-hidden py-4">
          {trendingShowList.map((tv) => (
           <TvShowCard data={tv} key={tv.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trendingshow;