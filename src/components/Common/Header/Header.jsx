import React, { useState } from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Searchmodel from '../Search/Searchmodel';

const Header = ({ open, handleDrawerOpen }) => {
    const [openSearch, setOpenSearch] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = () => () => {
        setOpenSearch(true);
    };
    const handleClose = () => {
        setOpenSearch(false);
    };

    return (
        <Box className='fixed flex w-full bg-[#131419] text-white border-0 border-b-2 border-[#252733] z-50'>
            <Box className='flex-1 z-50'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <Link to='/'>
                            <img src='/images/logo.png' className='h-5 md:h-6'/>
                            {/* <p className='text-lg lg:text-2xl font-semibold text-[#F53855]'>Movieflix</p> */}
                        </Link>
                    </Typography>
                </Toolbar>
            </Box>
            {/* Search button */}
            <Box className='flex items-center mr-5'>
                <div>
                    <button
                        className={`p-3 flex items-center justify-center bg-[#272727] rounded-full ml-3 ${openSearch && "bg-slate-200"
                            }`}
                        onClick={handleClickOpen()}
                        aria-controls="search-modal"
                    >
                        <span className="sr-only">Search</span>
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                className="fill-current text-white"
                                d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                            />
                            <path
                                className="fill-current text-white"
                                d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                            />
                        </svg>
                    </button>
                </div>
            </Box>
            <Searchmodel open={openSearch} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
        </Box>
    )
}
export default Header