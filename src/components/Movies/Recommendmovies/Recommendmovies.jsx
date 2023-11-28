import React, { useEffect, useState } from 'react'
import { getPopularMovies,getRecommendedMovies } from '../../../Api/movie-api/Api';
import Moviecard from '../../Common/Moviecard/Moviecard';

const Recommendmovies = ({ id }) => {
    const [recommendMovies, setRecommendMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const getData = async () => {
        const res = await getRecommendedMovies(id);
        setRecommendMovies(res.results);
        const res2 = await getPopularMovies();
        setUpcomingMovies(res2.results);
    }
    useEffect(() => {
        getData();
    },[id])

    return (
        <div>
            <div>
                <div className='ml-1 font-semibold text-md md:text-lg lg:text-2xl text-[#e7dfdf]'>
                    <p>You may Also like this</p>
                </div>
            </div>
            <div className='flex gap-x-4 overflow-x-auto overflow-y-hidden py-4'>
                {
                    recommendMovies.length>0?
                    recommendMovies && recommendMovies.map((movie) => (
                        <Moviecard data={movie} />
                    )):upcomingMovies && upcomingMovies.map((movie)=>(
                        <Moviecard data={movie} />
                    ))
                }
            </div>
        </div>
    )
}
export default Recommendmovies