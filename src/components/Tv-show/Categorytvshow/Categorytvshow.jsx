import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TvShowCard from '../../Common/Tvshow-card/TvShowcard';
import { getCategoryTvShows } from '../../../Api/tvshow-api/api';

const Categorytvshow = () => {
    const { id } = useParams();
    const {categoryname} = useParams();
    const [page, setPage] = useState(1);
    const [loading , setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [categorymovies, setCategoryMovies] = useState([]);

    const getMoviesData = async (page, id) => {
        const data = await getCategoryTvShows(page, id);
        if (page === 1) {
            setCategoryMovies(data.results);
            setTotalPages(data.total_pages);
        } else {
            setCategoryMovies(prevMovies => [...prevMovies, ...data.results]);
        }
    }

    const loadMore = () => {
        if (page <= totalPages) {
            setLoading(true);
            let nextPage = page + 1; 
            setPage(nextPage);
            getMoviesData(nextPage,id)
            setLoading(false);
        }
        else {
            console.log("Not data");
        }
    }

    useEffect(() => {
        getMoviesData(page, id);
    }, [id]);
    return (
        <div className='mt-16'>
            <div className="p-2 md:p-5">
                <div className="text-gray-200 font-semibold mb-4 text-lg md:text-3xl title">{categoryname}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-y-7 gap-x-4">
                    {categorymovies && categorymovies.map((movie) => (
                       <TvShowCard data={movie} key={movie.id}/>
                    ))}
                </div>
                <div className='flex justify-center items-center mt-2'>
                    <button disabled={loading} onClick={loadMore} type='button' className='my-3 inline-flex items-center justify-center py-[6px] px-[8px] text-center text-sm font-medium transition-all border border-[#F53855] rounded-md hover:bg-[#F53855] text-[#F53855] hover:text-white sm:py-2 sm:px-2.5 sm:text-base'>
                        {loading ? <span>Loading....</span> : <span>Load More</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Categorytvshow