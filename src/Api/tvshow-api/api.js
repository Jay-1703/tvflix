import axios from "axios";

const API_KEY = '?api_key=ba07bef3506ab382f0009401b2b4a970' //-- API key of TMDB

const BASE_URL = 'https://api.themoviedb.org/3/'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

export const getAllCategotyofTvShow = async () =>{
    const {data} = await axios.get(`${BASE_URL}genre/tv/list${API_KEY}`);
    return data;
}
export const getAllTrendingTvShow = async () =>{
    const {data} = await axios.get(`${BASE_URL}trending/tv/week${API_KEY}&language=en-US&page=1`);
    return data;
}
export const getAllTopRatedTvShow = async () =>{
    const {data} = await axios.get(`${BASE_URL}tv/top_rated${API_KEY}&language=en-US&page=1`);
    return data;
}
export const getDetailsOfTvShow = async (showId) =>{
    const {data} = await axios.get(`${BASE_URL}tv/${showId}${API_KEY}`);
    return data;
}
export const getDetailsOfSeason = async (showId,seasonNumber) =>{
    const {data} = await axios.get(`${BASE_URL}tv/${showId}/season/${seasonNumber}${API_KEY}`);
    return data;
}
export const getVideosOfSeason = async (showId) =>{
    const {data} = await axios.get(`${BASE_URL}tv/${showId}/videos${API_KEY}`);
    return data;
}
export const getRecommendTvShows = async (showId) =>{
    const {data} = await axios.get(`${BASE_URL}tv/${showId}/recommendations${API_KEY}&page=1&language=hi-IN`);
    return data;
}
export const getCategoryTvShows = async (page,id) =>{
    let language = localStorage.getItem('language');
    const {data} = await axios.get(`${BASE_URL}discover/tv${API_KEY}&with_original_language=${language}&with_genres=${id}&page=${page}`);
    return data;
}
//https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=ba07bef3506ab382f0009401b2b4a970 -- List of tv-show type

//https://api.themoviedb.org/3/trending/tv/week?api_key=ba07bef3506ab382f0009401b2b4a970&language=hi-IN&page=1 -- trending on weekly

//https://api.themoviedb.org/3/tv/top_rated?api_key=ba07bef3506ab382f0009401b2b4a970&language=en-US&page=1 -- top-rated

//https://api.themoviedb.org/3/discover/tv?api_key=ba07bef3506ab382f0009401b2b4a970&with_original_language=hi&page=1 -- Discover tv-shows by languages like english,hindi ect...

//https://api.themoviedb.org/3/tv/84105?api_key=ba07bef3506ab382f0009401b2b4a970&with_original_language=hi -- Details about tv-show

//https://api.themoviedb.org/3/tv/84105/season/1?api_key=ba07bef3506ab382f0009401b2b4a970&language=hi -- all episode of season

//https://api.themoviedb.org/3/tv/84105/season/1/episode/1?api_key=ba07bef3506ab382f0009401b2b4a970&language=hi -- details about episode

//https://api.themoviedb.org/3/discover/tv?api_key=ba07bef3506ab382f0009401b2b4a970&with_original_language=hi&with_genres=27&page=3 -- all tv-show by category like horror,crime....

//https://api.themoviedb.org/3/tv/84105/videos?language=hi-IN&api_key=ba07bef3506ab382f0009401b2b4a970 -- videos of tv-show

//https://api.themoviedb.org/3/tv/84105/recommendations?api_key=ba07bef3506ab382f0009401b2b4a970&page=2&language=hi-IN -- Recommendations tv-show -- You may Also like this

//https://api.themoviedb.org/3/search/tv?api_key=ba07bef3506ab382f0009401b2b4a970&query=scam%201992&language=hi-IN -- search tv-show


// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTA3YmVmMzUwNmFiMzgyZjAwMDk0MDFiMmI0YTk3MCIsInN1YiI6IjY1NDExY2EzNDU1N2EwMDBjNmI0YTlkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rPVFxYREhVQrCA04cOV_RZS3AuCl3GexhBgBH6rLulI
// The Movie Database (TMDB)

//https://api.themoviedb.org/3/configuration?api_key=ba07bef3506ab382f0009401b2b4a970

// imageBaseURL = https://image.tmdb.org/t/p/
//https://image.tmdb.org/t/p/w1280/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg