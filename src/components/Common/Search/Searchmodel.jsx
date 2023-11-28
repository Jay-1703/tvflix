import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { searchAll, searchMovies, searchTV } from '../../../Api/Search/Search';
import Moviecard from '../Moviecard/Moviecard';
import { Typography } from '@mui/material';
import { getPopularMovies } from '../../../Api/movie-api/Api';
import { getAllTrendingTvShow } from '../../../Api/tvshow-api/api';
import TvShowCard from '../Tvshow-card/TvShowcard'

export default function Searchmodel({ open, handleClickOpen, handleClose, scroll }) {
    const descriptionElementRef = React.useRef(null);
    const secondaryListItems = [{ name: 'Movies' }, { name: 'TV' },]

    const [allSearchData, setAllSearchData] = React.useState([]);
    const [movieSearchData, setMovieSearchData] = React.useState([]);
    const [tvSearchData, setTvSearchData] = React.useState([]);
    const [popularSearch, setPopularSearch] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState('Movies');

    const search = async (search) => {
        setMovieSearchData('');
        setTvSearchData('');
        setAllSearchData('');
        if (selectedItem === "All") {

            const data = await searchAll(search);
            setAllSearchData(data.results);
        }
        if (selectedItem === "TV") {

            const data = await searchTV(search);
            setTvSearchData(data.results);
        }
        if (selectedItem === "Movies") {

            const data = await searchMovies(search);
            setMovieSearchData(data.results);
        }
    }

    const fetchData = async () => {
        const movie = await getPopularMovies();
        const tv = await getAllTrendingTvShow();
        setPopularSearch([...movie.results, ...tv.results]);
    }

    React.useEffect(() => {
        fetchData();
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    React.useEffect(() => {
        setAllSearchData('');
        setMovieSearchData('');
        setTvSearchData('');
    }, [selectedItem])

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} scroll={scroll} maxWidth={'lg'} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle id="scroll-dialog-title" className='bg-[#131419]'>
                    <div className="border-b border-[#252733]">
                        <div className="relative">
                            <input onChange={(e) => { search(e.target.value) }} className="w-full text-gray-300 bg-[#272727] focus:ring-transparent placeholder-gray-300 appearance-none py-3 pl-10 pr-4 outline-none" type="search" placeholder="Search movie,tv-show…" />
                            <button className="absolute inset-0 right-auto group" aria-label="Search">
                                <svg
                                    className="w-4 h-4 shrink-0 fill-current text-gray-300 ml-4 mr-2"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} className='bg-[#131419]'>
                    <div>
                        {
                            secondaryListItems.map((items) => (
                                <div key={items.name} className={`center mr-3 mb-2 relative inline-block select-none whitespace-nowrap rounded-full ${items.name === selectedItem ? 'border-2 bg-white text-[#272727] hover:bg-white scale-110' : 'border-none text-gray-300 hover:bg-[#272727]'} py-2 px-3 align-baseline font-sans text-xs font-bold uppercase leading-none cursor-pointer`}>
                                    <button onClick={() => setSelectedItem(items.name)} className="mt-px">
                                        <Typography variant="h6" noWrap component="div">
                                            <p className='text-sm lg:text-lg font-semibold'>{items.name}</p>
                                        </Typography>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        {/* {
                            allSearchData.length > 0 ?
                                <div className='grid grid-cols-5 px-1 gap-x-5 gap-y-4'>
                                    {
                                        allSearchData?.filter(({ media_type }) => (media_type === 'tv')) ? allSearchData.filter(item => item.media_type === 'tv').map((movie) => (
                                            <TvShowCard key={movie.id} data={movie} width={'w-24'} height={'h-40'} display={'hidden'} handleClose={handleClose} />
                                        )) :
                                            allSearchData?.filter(({ media_type }) => (!media_type.media_type)).map((movie) => {
                                                <Moviecard key={movie.id} data={movie} width={'w-24'} height={'h-40'} display={'hidden'} handleClose={handleClose} />
                                            })
                                    }
                                </div> :
                                <div>
                                    <div className='mb-2 ml-2'>
                                        <Typography variant="h6" noWrap component="div">
                                            <p className='text-lg lg:text-2xl font-semibold text-gray-300'>Popular Search</p>
                                        </Typography>
                                    </div>
                                    <div className='flex lg:justify-start'>
                                        <div className='grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 xl:gap-x-5 gap-y-4 px-1'>

                                            {
                                                popularSearch.slice(0, 20)?.map((movie) => (
                                                    <Moviecard key={movie.id} data={movie} width={'w-24'} height={'h-40'} display={'hidden'} handleClose={handleClose} />
                                                ))
                                            }
                                            {
                                                popularSearch.slice(20)?.map((movie) => (
                                                    <TvShowCard key={movie.id} data={movie} width={'w-24'} height={'h-40'} display={'hidden'} handleClose={handleClose} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                        } */}
                        {
                            tvSearchData ?
                                <div className='grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 xl:gap-x-5 gap-y-4 px-1'>
                                    {
                                        tvSearchData.map((movie) => (
                                            <TvShowCard key={movie.id} data={movie} width={'w-24'} height={'h-40'} display={'hidden'} handleClose={handleClose} />
                                        ))
                                    }
                                </div> : null
                        }
                        {
                            movieSearchData ?
                                <div className='grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 xl:gap-x-5 gap-y-4 px-1'>
                                    {
                                        movieSearchData.map((movie) => (
                                            <Moviecard key={movie.id} data={movie} width={'w-24'} height={'h-40'} display={'hidden'} handleClose={handleClose} />
                                        ))
                                    }
                                </div> : null
                        }
                        {
                            (tvSearchData.length === 0 && movieSearchData.length === 0) ? (
                                <div>
                                    <div className='mb-2 ml-2'>
                                        <Typography variant="h6" noWrap component="div">
                                            <p className='text-lg lg:text-2xl font-semibold text-gray-300'>Popular Search</p>
                                        </Typography>
                                    </div>
                                    <div className='flex lg:justify-start'>
                                        <div className='grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 xl:gap-x-5 gap-y-4 px-1'>
                                            {
                                                popularSearch.slice(0, 20)?.map((movie) => (
                                                    <Moviecard key={movie.id} data={movie} width={'w-24'} height={'h-40'} display={'hidden'} handleClose={handleClose} />
                                                ))
                                            }
                                            {
                                                popularSearch.slice(20)?.map((movie) => (
                                                    <TvShowCard key={movie.id} data={movie} width={'w-24'} height={'h-40'} display={'hidden'} handleClose={handleClose} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
//252733