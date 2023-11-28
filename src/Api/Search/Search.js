import axios from "axios";

const API_KEY = '?api_key=ba07bef3506ab382f0009401b2b4a970' //-- API key of TMDB

const BASE_URL = 'https://api.themoviedb.org/3/'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

export const searchAll = async (search) =>{
    const {data} = await axios.get(`${BASE_URL}search/multi${API_KEY}&query=${search}&language=hi-IN&page=1`);
    return data;
}
export const searchMovies = async (search) =>{
    const {data} = await axios.get(`${BASE_URL}search/movie${API_KEY}&query=${search}&language=hi-IN&page=1`);
    return data;
}
export const searchTV = async (search) =>{
    const {data} = await axios.get(`${BASE_URL}search/tv${API_KEY}&query=${search}&language=hi-IN&page=1`);
    return data;
}

// https://api.themoviedb.org/3/search/tv?api_key=ba07bef3506ab382f0009401b2b4a970&query=scam%201992&language=hi-IN -- tv search api

//https://api.themoviedb.org/3/search/multi?api_key=ba07bef3506ab382f0009401b2b4a970&query=avenger&language=hi-IN&page=1 -- all search api