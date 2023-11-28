import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_BASE_URL } from '../../../Api/movie-api/Api'
import Skeleton from '@mui/material/Skeleton';

const LazyImage = ({ src, height, width }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [src]);

  return (
    <div className="relative">
      {imageLoaded ? (
        <div className={`rounded-md ${height ? `h-${height}` : 'h-64'} ${width ? `w-${width}` : 'w-44'} lg:w-48 `}>
          <img src={src} className="w-full h-full rounded-md" alt="Movie Poster" />
        </div>
      ) : (
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          variant="rectangular"
          width={170}
          height={240}
        />
      )}
    </div>
  );
};

const TvShowCard = ({ data, height, width, display , handleClose}) => {
  return (
    <div onClick={handleClose}>
      <Link to={`/showdetails/${data.id}`}>
        <div className={`${width ? `w-${width}` : 'w-44'} lg:w-48 cursor-pointer mt-1 transition-all hover:transition-all duration-700 hover:duration-700 hover:scale-110`} key={data.id}>
          <div>
            <LazyImage width={width} height={height} src={`${IMAGE_BASE_URL}/w1280/${data.poster_path}`} />
          </div>
          <div className='text-gray-300 px-1'>
            <p className='truncate ... movie-title'>{data.name}</p>
            <div className={`${display ? `${display} md:flex` : 'flex'}`}>
              <div className='flex flex-1 items-center'>
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
                <div className='ml-1'>
                  <p>{data.vote_average.toFixed(1)}</p>
                </div>
              </div>
              <div className='bg-gray-800 rounded px-1 mt-1'>
                <p>{data.first_air_date.split('-')[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TvShowCard