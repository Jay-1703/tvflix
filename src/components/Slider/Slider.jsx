import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getPopularMovies, IMAGE_BASE_URL } from '../../Api/movie-api/Api';

const Slider = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  const fetchPopularMovies = async () => {
      const data = await getPopularMovies();
      setPopularMovies(data.results);
  }
  useEffect(() => {
    fetchPopularMovies();
  }, [])
  console.log(popularMovies,IMAGE_BASE_URL);
  return (
    <div>
      <Carousel autoPlay={true} showArrows={false} showStatus={false} showThumbs={false} infiniteLoop={true} selectedItem={false} emulateTouch={true}>
        {
          popularMovies?.map((items)=>(
            <div style={{ background: `url(${IMAGE_BASE_URL}/w1280/${items.poster_path})`, backgroundSize: 'contain',backgroundRepeat:'no-repeat', backgroundPosition: 'center', height: '500px' }}>
              
              <p className="legend">Legend 1</p>
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

export default Slider
