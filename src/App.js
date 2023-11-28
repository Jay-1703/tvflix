import React from 'react';
import './App.css';
import Header from './components/Common/Header/Header';
import Sidebar from './components/Common/Sidebar/Sidebar';
import { getCategoryOfMovies } from './Api/movie-api/Api'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Weeklymovies from './components/Movies/Weeklymovies/Weeklymovies';
import Upcomingmovies from './components/Movies/Upcomingmovies/Upcomingmovies';
import Popularmovies from './components/Movies/Popularmovies/Popularmovies';
import Categorymovies from './components/Movies/Categorymovies/Categorymovies';
import Moviedetails from './components/Movies/Moviedetails/Moviedetails';
import Trendingshow from './components/Tv-show/Trending-show/Trendingshow';
import Topratedshow from './components/Tv-show/Toprated-show/Topratedshow';
import { getAllCategotyofTvShow } from './Api/tvshow-api/api';
import Showdetails from './components/Tv-show/Showdetails/Showdetails';
import Categorytvshow from './components/Tv-show/Categorytvshow/Categorytvshow';
import DemoSlider from './components/Slider/Demoslider';
function App() {
  const [categoryofmovies, setCategoryOfMovies] = React.useState([]);
  const [categoryofshow, setCategoryOfTvShow] = React.useState([]);

  // --------- fetchMovieCategory ---------
  const fetchCategory = async () => {
    const data = await getCategoryOfMovies();
    setCategoryOfMovies(data);
    const res = await getAllCategotyofTvShow();
    setCategoryOfTvShow(res);
  }
  React.useEffect(() => {
    fetchCategory();
  }, [])
  // --------- Drawer open & close ---------
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <BrowserRouter>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} categoryofmovies={categoryofmovies} categoryofTVshow={categoryofshow}/>
      <Routes>
        <Route path="/" element={<OtherComponents />} />
        <Route path="/discover/:categoryname/:id" element={<HeaderAndSidebar />} />
        <Route path="/discover/show/:categoryname/:id" element={<Tvshow />} />
        <Route path='/moviedetails/:movieid' element={<Moviedetails />}></Route>
        <Route path='/showdetails/:showid' element={<Showdetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
  function HeaderAndSidebar() {
    // This component should include the Header and Sidebar components
    return (
      <>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} categoryofmovies={categoryofmovies} categoryofTVshow={categoryofshow} />
        <Categorymovies />
        {/* <Categorytvshow/> */}
      </>
    );
  }
  function Tvshow() {
    // This component should include the Header and Sidebar components
    return (
      <>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} categoryofmovies={categoryofmovies} categoryofTVshow={categoryofshow} />
        <Categorytvshow/>
      </>
    );
  }
}
function OtherComponents() {
  // This component should include the other components you want to display
  return (
    <div className='mt-20'>
      <DemoSlider/>
      <Popularmovies />
      <Trendingshow/>
      <Upcomingmovies />
      <Topratedshow/>
      <Weeklymovies />
      <Outlet />
    </div>
  );
}

export default App;
