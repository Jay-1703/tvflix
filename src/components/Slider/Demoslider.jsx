import React, { useEffect, useState } from 'react';
import { getMovieDetails, getPopularMovies, IMAGE_BASE_URL } from '../../Api/movie-api/Api';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
const DemoSlider = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [popularMovies, setPopularMovies] = useState([]);

    const fetchPopularMoviesData = async () => {
        try {
            const data = await getPopularMovies();
            setPopularMovies(data.results);
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        }
    };
    //-------------- Date Format  --------------
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };
    const getMovieData = async (movieid) => {
        try {
            const data = await getMovieDetails(movieid);
            setMovieDetails(data);
        } catch (error) {
            console.error('Error fetching movie details', error);
        }
    };

    useEffect(() => {
        // Fetch popular movies on component mount
        fetchPopularMoviesData();
    }, []);

    useEffect(() => {
        // Call getMovieData when popularMovies changes
        if (popularMovies.length > 0) {
            const firstMovieId = popularMovies[0].id; // You might need to adjust this based on your data
            getMovieData(firstMovieId);
        }
    }, [popularMovies]);
    return (
        <div>
            <Carousel autoPlay={true} interval={5000} centerMode={true} centerSlidePercentage={100} showArrows={false} showStatus={false} showIndicators={true} showThumbs={false} stopOnHover={false} infiniteLoop={true} transitionTime={1000}>
                {
                    popularMovies.map((items, index) => (
                        <Link to={`/moviedetails/${items.id}`} key={index}>
                            <div className='h-[270px] md:h-[330px] lg:h-[500px] w-screen px-2 lg:px-5'>
                                <img src={`${IMAGE_BASE_URL}/w1280/${items.backdrop_path}`} className='h-full w-full opacity-50' />
                                <div className='legend'>
                                    <p className='text-xl md:text-3xl lg:text-5xl z-40'>{items.title}</p>
                                    <div className='md:mt-5'>
                                        <p className='text-gray-200 text-md hidden md:block md:text-md lg:text-lg'>{items?.overview}</p>
                                        <div className='flex flex-1 items-center mt-2 md:mt-5 text-gray-200'>
                                            <div>
                                                <p className='text-md md:text-lg lg:text-2xl'>{formatDate(items?.release_date)}</p>
                                            </div>
                                        </div>
                                        <div className='mt-3 inline-flex gap-x-2 items-center'>
                                            {
                                                movieDetails && movieDetails.genres && movieDetails.genres.map((item) => (
                                                    <p key={item.name} className='text-gray-200 text-md md:text-lg lg:text-2xl'>{item.name} |</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </Carousel>
        </div>
    );
};
export default DemoSlider;
{/* <div className="slider border border-white mt-20">
                <ul>
                    {popularMovies?.map((items, index) => (
                        <li key={index} className='w-full'>
                            <img src={`${IMAGE_BASE_URL}/w1280/${items.poster_path}`} alt={`Slide ${index + 1}`} className='w-full' />
                            <div style={{ background: `url(${IMAGE_BASE_URL}/w1280/${items.poster_path})`,backgroundRepeat:'no-repeat'}} className='background-img w-full'></div>
                        </li>
                    ))}
                </ul>
            </div> */}