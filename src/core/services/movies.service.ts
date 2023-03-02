import axios from "axios";

export const getPopularMovies = (page: number) => {
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`);
}