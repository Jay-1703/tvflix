import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Sidebar({ open, handleDrawerClose, handleDrawerOpen, categoryofmovies, categoryofTVshow }) {
    const theme = useTheme();
    const [menuOpen, setMenuOpen] = React.useState(true);
    const [menuOpenTv, setMenuOpenTv] = React.useState(true);

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    };
    const handleClickTv = () => {
        setMenuOpenTv(!menuOpenTv);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer open={open}
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <DrawerHeader className='bg-[#131419]'>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon className='text-gray-300' /> : <ChevronRightIcon className='text-gray-300' />}
                    </IconButton>
                </DrawerHeader>
                <Divider className='bg-[#252733]'></Divider>
                <div className='p-5 overflow-y-auto overflow-x-hidden bg-[#131419] text-white h-screen'>
                    {/* Category list of movies */}
                    <List sx={{ width: '100%', maxWidth: 360 }} component="nav" aria-labelledby="nested-list-subheader" className='bg-[#131419] '>
                        <button onClick={handleClick} className='w-full'>
                            <div className='flex'>
                                <div className='flex w-full items-center'>
                                    <p className='text-lg lg:text-2xl font-semibold mb-4 text-[#F53855] title'>Movies</p>
                                </div>
                                <div className='flex-1'>
                                    {menuOpen ? <ExpandLess className='text-gray-300' /> : <ExpandMore className='text-gray-300' />}
                                </div>
                            </div>
                        </button>
                        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    categoryofmovies.genres?.map((item) => (
                                        <div className='font-medium mb-3 cursor-pointer text-gray-300 ml-8' key={item?.id}>
                                            <Link to={`/discover/${item?.name}/${item?.id}`} onClick={handleDrawerClose}>
                                                <p className='movie-title text-md lg:text-lg hover:text-xl opacity-80 hover:opacity-100 transition-all'>{item?.name}</p>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </List>
                        </Collapse>
                    </List>
                    {/* Category list of tv-show */}
                    <List sx={{ width: '100%', maxWidth: 360 }} component="nav" aria-labelledby="nested-list-subheader" className='bg-[#131419] '>
                        <button onClick={handleClickTv} className='w-full'>
                            <div className='flex'>
                                <div className='flex w-full items-center'>
                                    <p className='text-lg lg:text-2xl font-semibold mb-4 text-[#F53855] title'>TV-Shows</p>
                                </div>
                                <div className='flex-1'>
                                    {menuOpenTv ? <ExpandLess className='text-gray-300' /> : <ExpandMore className='text-gray-300' />}
                                </div>
                            </div>
                        </button>
                        <Collapse in={menuOpenTv} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    categoryofTVshow?.genres?.map((item) => (
                                        <div className='font-medium mb-3 cursor-pointer text-gray-300 ml-8' key={item?.id}>
                                            <Link to={`/discover/show/${item?.name}/${item?.id}`} onClick={handleDrawerClose}>
                                                <p className='movie-title text-md lg:text-lg hover:text-xl opacity-80 hover:opacity-100 transition-all'>{item?.name}</p>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </List>
                        </Collapse>
                    </List>
                    <p className='text-lg lg:text-2xl font-semibold mb-4 text-[#F53855]'>Language</p>
                    <div className='font-medium mb-3 cursor-pointer text-gray-300 title'>
                        <div onClick={handleDrawerClose}>
                            <button onClick={() => { localStorage.setItem('language', 'en') }} className={`${localStorage.getItem('language') === 'en-US' ? 'opacity-100 text-xl' : 'opacity-80 text-md lg:text-lg'} hover:text-xl  hover:opacity-100 transition-all`}>English</button>
                        </div>
                    </div>
                    <div className='font-medium mb-3 cursor-pointer text-gray-300 title'>
                        <div onClick={handleDrawerClose}>
                            <button onClick={() => { localStorage.setItem('language', 'hi') }} className={`${localStorage.getItem('language') === 'hi-IN' ? 'opacity-100 text-xl' : 'opacity-80 text-md lg:text-lg'} hover:text-xl  hover:opacity-100 transition-all`}>Hindi</button>
                        </div>
                    </div>
                </div>
                <Divider />
            </Drawer>
        </Box>
    );
}
{/* <p className='text-lg lg:text-2xl font-semibold mb-4 text-[#F53855] title'>Genres</p>
                    {
                        categoryofmovies.genres?.map((item) => (
                            <div className='font-medium mb-3 cursor-pointer text-gray-300' key={item?.id}>
                                <Link to={`/discover/${item?.name}/${item?.id}`} onClick={handleDrawerClose}>
                                    <p className='movie-title text-md lg:text-lg hover:text-xl opacity-80 hover:opacity-100 transition-all'>{item?.name}</p>
                                </Link>
                            </div>
                        ))
                    } */}