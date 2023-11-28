import axios from "axios";

const API_KEY = '?api_key=ba07bef3506ab382f0009401b2b4a970' //-- API key of TMDB

const BASE_URL = 'https://api.themoviedb.org/3/'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

export const getCategoryOfMovies = async () => {
    const { data } = await axios.get(`${BASE_URL}genre/movie/list${API_KEY}`);
    return data;
}
export const getPopularMovies = async () => {
    const { data } = await axios.get(`${BASE_URL}movie/popular${API_KEY}`);
    return data;
}
export const getWeeklyTrendingMovies = async () => {
    const { data } = await axios.get(`${BASE_URL}trending/movie/week${API_KEY}`);
    return data;
}
export const getUpcomingMovies = async () => {
    const { data } = await axios.get(`${BASE_URL}movie/upcoming${API_KEY}&language=hi-IN`);
    return data;
}
export const getMovieByCategory = async (page, genre_id) => {
    const language = localStorage.getItem('language');
    const { data } = await axios.get(`https://api.themoviedb.org/4/discover/movie${API_KEY}&with_original_language=${language}&page=${page}&with_genres=${genre_id}`)
    return data;
}
export const getMovieDetails = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}movie/${movieId}${API_KEY}&append_to_response=casts,videos,images,releases`)
    return data;
}
export const getRecommendedMovies = async (movieId) => {
    const { data } = await axios.get(`${BASE_URL}movie/${movieId}/recommendations${API_KEY}&page=1`)
    return data;
}
//https://api.themoviedb.org/3/genre/movie/list?api_key=ba07bef3506ab382f0009401b2b4a970 --List of movies type
//https://api.themoviedb.org/3/movie/popular?api_key=ba07bef3506ab382f0009401b2b4a970 -- Popular movies
//https://api.themoviedb.org/3/movie/top_rated?api_key=ba07bef3506ab382f0009401b2b4a970 -- Top rated movies
//https://api.themoviedb.org/3/movie/upcoming?api_key=ba07bef3506ab382f0009401b2b4a970&language=hi-IN -- Upcomming movies
//https://api.themoviedb.org/3/trending/movie/week?api_key=ba07bef3506ab382f0009401b2b4a970&language=hi-IN -- Weekly Trending movies

// https://api.themoviedb.org/3/movie/968051?api_key=ba07bef3506ab382f0009401b2b4a970&append_to_response=casts,videos,images,releases -- Details about movie

// docuument.title = `${title} - Movieflix`

// id
// backdrop_path --- background image src=`${imageBaseURL}${"w1280" || "original"}${backdrop_path || poster_path}`
// poster_path --- movie image src=`${imageBaseURL}/w1280/${poster_path}`
// title
// release_date --- ${release_date.split("-")[0]}
// runtime --- ${runtime}m
// vote_average --- ${vote_average.toFixed(1)}
// release
// genres
// overview
// cast -- Starring (cast.name)
// videos -- return.filter(({type,site})=>(type=="Trailer" || type=="Teaser") && (site == "YouTube"))

//https://api.themoviedb.org/3/movie/505642/recommendations?api_key=ba07bef3506ab382f0009401b2b4a970&page=1 -- Recommendations movies -- You may Also like this

//https://api.themoviedb.org/4/discover/movie?api_key=ba07bef3506ab382f0009401b2b4a970&with_original_language=hi&page=1 -- Discover movies by languages like english,hindi ect...

//https://api.themoviedb.org/3/search/movie?api_key=ba07bef3506ab382f0009401b2b4a970&query=kabir%20singh&page=1 --- search movies

//https://api.themoviedb.org/3/configuration?api_key=ba07bef3506ab382f0009401b2b4a970