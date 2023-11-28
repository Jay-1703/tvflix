import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Slider from './components/Slider/Slider';
import { getCategoryOfMovies } from './Api/Api'
import { BrowserRouter, Route, Routes , Outlet  } from 'react-router-dom';

import Weeklymovies from './components/Weeklymovies/Weeklymovies';
import Upcomingmovies from './components/Upcomingmovies/Upcomingmovies';
import Popularmovies from './components/Popularmovies/Popularmovies';
import Categorymovies from './components/Categorymovies/Categorymovies';
import Moviedetails from './components/Moviedetails/Moviedetails';
function App() {
  const [categoryofmovies, setCategoryOfMovies] = React.useState([]);

  // --------- fetchMovieCategory ---------
  const fetchCategory = async () => {
    const data = await getCategoryOfMovies();
    setCategoryOfMovies(data);
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
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} categoryofmovies={categoryofmovies} />
      <Routes>
        <Route path="/discover/:id" element={<HeaderAndSidebar />} />
        <Route path="/" element={<OtherComponents />} />
        <Route path='/moviedetails/:movieid' element={<Moviedetails/>}></Route>
      </Routes>
    </BrowserRouter>
  );
  function HeaderAndSidebar() {
    // This component should include the Header and Sidebar components
    return (
      <>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} categoryofmovies={categoryofmovies} />
        <Categorymovies/>
      </>
    );
  }
}
function OtherComponents() {
  // This component should include the other components you want to display
  return (
    <>
      <Popularmovies />
      <Upcomingmovies />
      <Weeklymovies />
      <Outlet />
    </>
  );
}

export default App;
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Slider from './components/Slider/Slider';
import { getCategoryOfMovies } from './Api/Api'
import { Outlet } from 'react-router-dom';
import Weeklymovies from './components/Weeklymovies/Weeklymovies';
import Upcomingmovies from './components/Upcomingmovies/Upcomingmovies';
import Popularmovies from './components/Popularmovies/Popularmovies';
import DemoSlider from './components/Slider/Demoslider';
function App() {
  const [categoryofmovies, setCategoryOfMovies] = React.useState([]);

  // --------- fetchMovieCategory ---------
  const fetchCategory = async () => {
    const data = await getCategoryOfMovies();
    setCategoryOfMovies(data);
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
    <div>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} categoryofmovies={categoryofmovies}/>
      {/* <Slider /> */}
      {/* <DemoSlider/> */}
      <div className='mt-20'>
        <Popularmovies/>
        <Upcomingmovies/>
        <Weeklymovies/>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
