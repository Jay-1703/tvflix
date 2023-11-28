import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../../../Api/movie-api/Api';
import Moviecard from '../../Common/Moviecard/Moviecard';

const Popularmovies = () => {
  const [popularMovieList, setPopularMovieList] = useState([]);

  const getData = async () => {
    const data = await getPopularMovies();
    setPopularMovieList(data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="px-2 md:px-5 mt-3">
        <div className="text-gray-200 font-semibold text-lg title">Popular movies</div>
        <div className="flex gap-x-4 overflow-x-auto overflow-y-hidden py-4">
          {popularMovieList.map((movie) => (
           <Moviecard data={movie} key={movie.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popularmovies;