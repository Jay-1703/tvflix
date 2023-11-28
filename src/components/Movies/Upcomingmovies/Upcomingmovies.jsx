import React, { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../../../Api/movie-api/Api';
import Moviecard from '../../Common/Moviecard/Moviecard';

const Upcomingmovies = () => {
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);

  const getData = async () => {
    const data = await getUpcomingMovies();
    setUpcomingMoviesList(data.results);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="px-2 md:px-5">
        <div className="text-gray-200 font-semibold text-lg title">Upcoming movies</div>
        <div className="flex gap-x-4 overflow-x-auto overflow-y-hidden py-4">
          {upcomingMoviesList.map((movie) => (
            <Moviecard data={movie} key={movie.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcomingmovies;