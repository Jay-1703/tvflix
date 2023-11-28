import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, IMAGE_BASE_URL } from '../../../Api/movie-api/Api'
import ReactPlayer from 'react-player'
import { Grid } from '@mui/material'
import Recommendmovies from '../Recommendmovies/Recommendmovies'

const Moviedetails = () => {
    const { movieid } = useParams();
    const [movieDetails, setMovieDetails] = useState();

    const getMovieData = async () => {
        const data = await getMovieDetails(movieid);
        setMovieDetails(data);
    }
    useEffect(() => {
        getMovieData();
    }, [movieid])
    return (
        <div>
            <div className='h-screen w-screen relative overflow-x-hidden bg-[#131419] mt-10 z-10'>
                <img alt={movieDetails?.title} src={`${IMAGE_BASE_URL}${"w1280" || "original"}${movieDetails?.backdrop_path}`} className='w-full h-72 md:h-full opacity-20 hidden md:block' />
                {/* <div className='w-full h-[400px] md:h-[450px] lg:h-screen bg-img' style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}${"w1280" || "original"}${movieDetails?.backdrop_path})`,
                    backgroundPosition: "center",
                }}>
                </div> */}
                <div className='absolute top-0'>
                    <div className='w-screen my-10 px-5'>
                        <Grid container>
                            <Grid item xs={8} sm={4} md={3} lg={3}>
                                <div className='h-60 md:h-[32rem]'>
                                    <img alt={movieDetails?.title} src={`${IMAGE_BASE_URL}${"w1280" || "original"}${movieDetails?.poster_path}`} className='h-full w-full rounded-md' />
                                </div>
                            </Grid>
                            <Grid item sm={8} md={9} lg={9}>
                                <div className='py-7 md:py-10 md:px-5 lg:px-10 overflow-y-auto overflow-x-hidden'>
                                    <div>
                                        <div>
                                            <p className='text-gray-200 text-2xl md:text-3xl xl:text-5xl title'>{movieDetails?.title}</p>
                                        </div>
                                        <div className='mt-5 md:mt-7 xl:mt-12'>
                                            <p className='text-gray-200 text-md hidden md:block md:text-lg lg:text-lg'>{movieDetails?.overview}</p>
                                            <div className='flex flex-1 items-center mt-2 md:mt-5 text-gray-400'>
                                                <div>
                                                    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="w-4 h-4 iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000">
                                                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                        <g id="SVGRepo_iconCarrier">
                                                            <path
                                                                fill="#FFAC33"
                                                                d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379z"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div className='ml-1 text-md md:text-lg lg:text-2xl'>
                                                    <p>{movieDetails?.vote_average.toFixed(1)}</p>
                                                </div>
                                                <div className='ml-4'>
                                                    <p className='text-md md:text-lg lg:text-2xl'>{movieDetails?.runtime}m</p>
                                                </div>
                                                <div className='ml-4'>
                                                    <p className='text-md md:text-lg lg:text-2xl'>{movieDetails?.release_date.split('-')[0]}</p>
                                                </div>
                                            </div>
                                            <div className='mt-3 inline-flex gap-x-2 items-center'>
                                                {
                                                    movieDetails && movieDetails.genres && movieDetails.genres.map((item) => (
                                                        <p key={item.name} className='text-gray-400 text-md md:text-lg lg:text-2xl'>{item.name} |</p>
                                                    ))
                                                }
                                            </div>
                                            <div className='mt-3 flex w-full'>
                                                <p className='text-gray-200 text-md md:text-lg lg:text-2xl'>Starring</p>
                                                <div className='inline-flex flex-wrap gap-x-2 ml-4'>
                                                    {
                                                        movieDetails && movieDetails.casts.cast && movieDetails.casts.cast.slice(0, 10).map((item) => (
                                                            <p key={item.name} className='text-gray-400 text-sm md:text-md lg:text-lg'>{item.name},</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className=''>
                                        <div className='mt-7'>
                                            <div className='ml-1 font-semibold text-md md:text-lg lg:text-2xl text-gray-400'>
                                                <p>Trailers & More</p>
                                            </div>
                                        </div>
                                        <div className='flex md:mt-0'>
                                            <div className='flex py-3 px-2 gap-x-3 overflow-x-auto overflow-y-hidden'>
                                                {
                                                    movieDetails &&
                                                    movieDetails.videos &&
                                                    movieDetails.videos.results &&
                                                    movieDetails.videos.results
                                                        .filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "YouTube")
                                                        .map((items) => (
                                                            <div>
                                                                <ReactPlayer url={`https://www.youtube.com/watch?v=${items.key}`} className="react-player" controls />
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </Grid>
                        </Grid>
                        <div className={movieDetails?.videos?.results?.filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "YouTube").length > 0? 'block': 'hidden'}>
                            <div className='mt-7'>
                                <div className='ml-1 font-semibold text-md md:text-lg lg:text-2xl text-[#e7dfdf]'>
                                    <p>Trailers & More</p>
                                </div>
                            </div>
                            <div className='flex md:mt-0'>
                                <div className='flex py-3 gap-x-3 overflow-x-auto overflow-y-hidden'>
                                    {
                                        movieDetails &&
                                        movieDetails.videos &&
                                        movieDetails.videos.results &&
                                        movieDetails.videos.results
                                            .filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "YouTube")
                                            .map((items) => (
                                                <div key={items.key}>
                                                    <ReactPlayer url={`https://www.youtube.com/watch?v=${items.key}`} className="react-player" controls />
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <Recommendmovies id={movieid} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Moviedetails
//<p className='text-gray-200 text-md hidden md:block md:text-lg lg:text-lg'>{movieDetails?.overview}</p>
//bg-gradient-to-b from-gray-900 from-100%
// bg-gradient-to-b from-transparent to-gray-800 from-10%