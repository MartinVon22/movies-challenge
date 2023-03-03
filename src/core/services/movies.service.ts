import axios from "axios";

export const getPopularMovies = (page: number) => {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`);
}

export const getMovieSearch = (movie: string, page: number) => {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&query=${movie}`);
}


export const createGuestSession = () => {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`);
}

export const rateMovie = (rateValue: number, guest_session_id: string, movieId: number) => {
    return axios.post(`${process.env.REACT_APP_API_ENDPOINT}/movie/${movieId}/rating?api_key=${process.env.REACT_APP_API_KEY}?guest_session_id=${guest_session_id}`, {value: rateValue});
}
