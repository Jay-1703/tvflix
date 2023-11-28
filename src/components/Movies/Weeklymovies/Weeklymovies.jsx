import React, { useEffect, useState } from 'react';
import { getWeeklyTrendingMovies } from '../../../Api/movie-api/Api';
import Moviecard from '../../Common/Moviecard/Moviecard';

const Weeklymovies = () => {
  const [weeklyMovieList, setWeeklyMovieList] = useState([]);

  const getData = async () => {
    const data = await getWeeklyTrendingMovies();
    setWeeklyMovieList(data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="px-2 md:px-5">
        <div className="text-gray-200 font-semibold mb-4 text-lg title">Weeklymovies</div>
        <div className="flex gap-x-4 overflow-x-auto overflow-y-hidden py-4">
          {weeklyMovieList.map((movie) => (
            <Moviecard data={movie} key={movie.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weeklymovies;