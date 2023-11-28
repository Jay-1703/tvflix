import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailsOfSeason, getDetailsOfTvShow, IMAGE_BASE_URL, getVideosOfSeason, getRecommendTvShows } from '../../../Api/tvshow-api/api'
import ReactPlayer from 'react-player'
import { Grid } from '@mui/material'
import TvShowCard from '../../Common/Tvshow-card/TvShowcard';

const Showdetails = () => {
    const { showid } = useParams();
    const [movieDetails, setMovieDetails] = useState();
    const [seasonDetails, setSeasonDetails] = useState([]);
    const [videos, setVidoes] = useState([]);
    const [recommendedTvShow, setRecommendedTvShow] = useState([]);
    //-------------- get season Data --------------
    const getMovieData = async () => {
        const data = await getDetailsOfTvShow(showid);
        setMovieDetails(data);
        const data1 = await getVideosOfSeason(showid);
        setVidoes(data1);
        const data2 = await getRecommendTvShows(showid);
        setRecommendedTvShow(data2.results);
    }
    //-------------- Active Tabs --------------
    const [activeTab, setActiveTab] = useState('Episodes');
    const [seasonActiveTab, setSeasonActiveTab] = useState('Season 1');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const seasonTabClick = (tab, seasonNumber) => {
        setSeasonActiveTab(tab);
        getDetailofSeason(seasonNumber)
    };
    //-------------- Get details of season --------------
    const getDetailofSeason = async (seasonNumber) => {
        const data = await getDetailsOfSeason(showid, seasonNumber);
        setSeasonDetails(data.episodes);
    }
    //-------------- Date Format  --------------
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };
    useEffect(() => {
        getMovieData();
        getDetailofSeason(1);
    }, [showid])
    return (
        <div>
            <div className='h-screen w-screen relative overflow-x-hidden bg-[#131419] mt-10 z-10'>
                <img alt={movieDetails?.title} src={`${IMAGE_BASE_URL}${"w1280" || "original"}${movieDetails?.backdrop_path}`} className='w-full h-72 md:h-full opacity-20 hidden md:block' />
                <div className='absolute top-0'>
                    <div className='w-screen my-5 md:my-10 px-5'>
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
                                            <p className='text-gray-200 text-2xl md:text-3xl xl:text-5xl title'>{movieDetails?.name}</p>
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
                                                {/* <div className='ml-4'>
                                                    <p className='text-md md:text-lg lg:text-2xl'>{movieDetails?.runtime}m</p>
                                                </div> */}
                                                <div className='ml-4'>
                                                    <p className='text-gray-200 text-md md:text-lg lg:text-2xl'>{movieDetails?.number_of_seasons} seasons</p>
                                                </div>
                                                <div className='ml-4'>
                                                    <p className='text-md md:text-lg lg:text-2xl'>{movieDetails?.first_air_date.split('-')[0]}</p>
                                                </div>
                                            </div>
                                            <div className='mt-3 inline-flex gap-x-2'>
                                                {
                                                    movieDetails && movieDetails.genres && movieDetails.genres.map((item) => (
                                                        <p key={item.name} className='text-gray-400 text-md md:text-lg lg:text-2xl'>{item.name} |</p>
                                                    ))
                                                }
                                            </div>
                                            <div className='mt-3 flex w-full items-center'>
                                                <p className='text-gray-200 text-md md:text-lg lg:text-2xl'>Directors</p>
                                                <div className='inline-flex flex-wrap gap-x-2 ml-4'>
                                                    {
                                                        movieDetails && movieDetails.created_by && movieDetails.created_by.map((item) => (
                                                            <p key={item.name} className='text-gray-400 text-sm md:text-md lg:text-lg'>{item.name},</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className='mt-3 flex w-full items-center'>
                                                <p className='text-gray-200 text-md md:text-lg lg:text-2xl'>Producers</p>
                                                <div className='inline-flex flex-wrap gap-x-2 ml-4'>
                                                    {
                                                        movieDetails && movieDetails.production_companies && movieDetails.production_companies.map((item) => (
                                                            <p key={item.name} className='text-gray-400 text-sm md:text-md lg:text-lg'>{item.name},</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='w-screen bg-[#131419] py-3 px-5'>
                        {/* ------ Tabs of options ----- */}
                        <div className="tab-container inline-flex bg-[#131419] w-full md:justify-center gap-x-4 md:gap-x-7 py-3 md:text-lg">
                            <div className={`tab cursor-pointer ${activeTab === 'Episodes' ? 'active text-white border-b-2 pb-1' : 'text-gray-300'}`} onClick={() => handleTabClick('Episodes')}>
                                Episodes
                            </div>
                            <div className={`tab cursor-pointer ${activeTab === 'More Like This' ? 'active text-white border-b-2 pb-1' : 'text-gray-300'}`} onClick={() => handleTabClick('More Like This')}>
                                More Like This
                            </div>
                            <div className={`tab cursor-pointer ${activeTab === 'Trailers & More' ? 'active text-white border-b-2 pb-1' : 'text-gray-300'}`} onClick={() => handleTabClick('Trailers & More')}>
                                Trailers & More
                            </div>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'Episodes' && (
                                <div>
                                    {/* ------ Tabs of seasons ----- */}
                                    <div className={`flex border-t-2 border-[#272727]`}>
                                        <div className="tab-container inline-flex bg-[#131419] w-full justify-start gap-x-4 md:gap-x-7 py-3 md:text-lg overflow-y-hidden overflow-x-auto">
                                            {movieDetails &&
                                                movieDetails.seasons &&
                                                movieDetails.seasons.map((items) => (
                                                    <div
                                                        key={items.name}
                                                        className={`tab font-thin cursor-pointer ${seasonActiveTab === items.name ? 'text-white' : 'text-gray-300'}`}
                                                        onClick={() => { seasonTabClick(items.name, items.season_number) }}
                                                    >
                                                        {items.name}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    {/* ------ Details of seasons ----- */}
                                    <div className='mt-2 overflow-x-hidden overflow-y-auto h-96'>
                                        {
                                            seasonDetails?.map((items) => (
                                                <div className='flex mb-3 lg:px-4 py-3 rounded-md cursor-pointer transition-all duration-300 hover:bg-[#272727]' key={items.id}>
                                                    <div className='w-full h-28 md:w-96 md:h-40'>
                                                        <img src={`${IMAGE_BASE_URL}/w1280/${items?.still_path}`} className='w-full h-full  rounded-md' />
                                                    </div>
                                                    <div className='w-full h-full mx-5'>
                                                        <div className='font-medium text-gray-300'>
                                                            <h3 className='text-lg'>{items?.name}</h3>
                                                        </div>
                                                        <div className='lg:my-3'>
                                                            <div className='flex font-semibold text-white'>
                                                                <h3 className='text-lg'>S{items?.season_number}</h3>
                                                                <h3 className='text-lg ml-1'>E{items?.episode_number}</h3>
                                                            </div>
                                                            <div className='sm:flex font-semibold text-white'>
                                                                <h3 className='text-sm md:text-lg'>{formatDate(items?.air_date)}</h3>
                                                                <h3 className='text-sm md:text-lg md:ml-3'>{items?.runtime}min</h3>
                                                            </div>
                                                        </div>
                                                        <div className='hidden md:flex font-medium text-gray-300'>
                                                            <h3 className='text-lg'>{items?.overview}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                            {/* ------ videos of seasons ----- */}
                            <div className='mt-2'>
                                {activeTab === 'Trailers & More' && (
                                    <div className={`border-t-2 border-[#272727] flex overflow-x-auto overflow-y-hidden`}>
                                        <div className='inline-flex gap-x-3 py-2 overflow-x-auto overflow-y-hidden'>
                                            {
                                                videos.results && videos.results.length > 0
                                                    ? videos.results
                                                        .filter(({ type, site }) => (type === "Trailer") && site === "YouTube")
                                                        .map((items) => (
                                                            <div key={items.key}>
                                                                <ReactPlayer url={`https://www.youtube.com/watch?v=${items.key}`} className="react-player" controls />
                                                                <div className='inline-flex gap-x-2 font-medium text-gray-300 py-1'>
                                                                    <h3 className='text-lg'>{movieDetails?.name}</h3><span>-</span>
                                                                    <h3 className='text-lg'>{items?.name}</h3>
                                                                </div>
                                                            </div>
                                                        ))
                                                    : 
                                                    <div className='flex justify-center font-medium text-gray-300'>
                                                        <h3 className='text-center text-lg'>Trailers & videos are not available !</h3>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* ------ More like this ----- */}
                            <div className='mt-2'>
                                {activeTab === 'More Like This' && (
                                    <div className={`border-t-2 border-[#272727] flex overflow-x-auto overflow-y-hidden`}>
                                        <div className="flex gap-x-4 overflow-x-auto overflow-y-hidden py-4">
                                            {recommendedTvShow.map((tv) => (
                                                <TvShowCard data={tv} key={tv.id} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Showdetails
//<p className='text-gray-200 text-md hidden md:block md:text-lg lg:text-lg'>{movieDetails?.overview}</p>
//bg-gradient-to-b from-gray-900 from-100%
// bg-gradient-to-b from-transparent to-gray-800 from-10%