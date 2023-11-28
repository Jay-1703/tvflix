import React, { useEffect, useState } from 'react'
import { getMovieByCategory } from '../../../Api/movie-api/Api'
import { useParams } from 'react-router-dom'
import Moviecard from '../../Common/Moviecard/Moviecard';

const Categorymovies = () => {
    const { id } = useParams();
    const {categoryname} = useParams();
    const [page, setPage] = useState(1);
    const [loading , setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [categorymovies, setCategoryMovies] = useState([]);

    const getMoviesData = async (page, id) => {
        setLoading(true);
        const data = await getMovieByCategory(page, id);
        if (page === 1) {
            setCategoryMovies(data.results);
            setTotalPages(data.total_pages);
        } else {
            setCategoryMovies(prevMovies => [...prevMovies, ...data.results]);
        }
        setLoading(false);
    };

    const loadMore = () => {
        if (page <= totalPages) {
            let nextPage = page + 1;
            setPage(nextPage);
            getMoviesData(nextPage, id);
        } else {
            console.log("No more data");
        }
    };

    useEffect(() => {
        getMoviesData(page, id);
    }, [id]);
    return (
        <div className='mt-16'>
            <div className="p-2 md:p-5">
                <div className="text-gray-200 font-semibold mb-4 text-lg md:text-3xl title">{categoryname}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-y-7 gap-x-4">
                    {categorymovies && categorymovies.map((movie) => (
                       <Moviecard key={movie.id} data={movie}/>
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
export default Categorymovies


    // const getMoviesData = async (page, id) => {
    //     const data = await getMovieByCategory(page, id);
    //     if(page === 1){
    //         setCategoryMovies(data.results);
    //         setTotalPages(data.total_pages)
    //     }else{
    //         // data.results.forEach(element => {
    //         //     setCategoryMovies([...categorymovies,element])
    //         // })
    //         for (let index = 0; index < data.results.length; index++) {
    //             const element = data.results[index];
    //             console.log("element",element)
    //             setCategoryMovies([...categorymovies,element])
    //         }
    //     }
    // }