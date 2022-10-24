import axios from 'axios';

const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=35069641';
const newurl = 'http://www.omdbapi.com/?&apikey=35069641'
export function searchmovie(text){
    return {
        type:'SEARCH_MOVIE',
        payload:text
    }
}

export function fetchMovies(text){
    const url =`${apiUrl}&s=${text}`;
    const request = axios.get(url);
    return{
        type:'FETCH_MOVIES',
        payload: request
    }
}


export function fetchMovie(id){
    const url =`${newurl}&i=${id}`;
    const request = axios.get(url);
    return{
        type:'FETCH_MOVIE',
        payload: request
    }
}

export function setLoading(text){
    return {
        type:'LOADING'
    }
}