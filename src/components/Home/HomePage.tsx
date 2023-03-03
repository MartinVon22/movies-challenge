import { faArrowCircleLeft, faArrowCircleRight, faClose, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { createGuestSession, getMovieSearch, getPopularMovies, rateMovie } from "../../core/services/movies.service";
import { MovieModel } from "../../models/Movie.model";
import Sidebar from "../../shared/components/SideBar/Sidebar";
import LoadSpinner from "../../assets/imgs/load_spinner.svg";
import { useNavigate } from "react-router-dom";

const HomeView = () => {

    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingData, setLoadingData] = useState(true);
    const [searchingMovie, setSearchingMovie] = useState(false);
    const [movieSearchText, setMovieSearchText] = useState('');
    const [movieSearched, setMovieSearched] = useState(false);
    const [movieDetail, setMovieDetail] = useState<MovieModel | null>(null);    
    const [movieVote, setMovieVote] = useState(Array.from({length: 10}));

    const { state, dispatch } = useContext(AppContext);
    const refInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!movieSearched) {
            fetchData(currentPage);
        } else {
            fetchSearchMovies(movieSearchText);
        }
    }, [currentPage])

    const fetchData = async (page: number) => {
        setLoadingData(true);
        try {
            const res = await getPopularMovies(page);
            if (res.status === 200) {
                setMovies(res.data.results);
                setCurrentPage(res.data.page);
                setTotalPages(res.data.total_pages);
                dispatch({type: "ADD_MOVIES", movies: res.data});
                console.log(res.data)
            }            
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingData(false);
        }
    }

    const changePage = async (action: string) => {
        if (action === 'previous' && currentPage == 1) return;
        if (action === 'next' && currentPage == totalPages) return;

        setCurrentPage(action === 'previous' ? currentPage-1 : currentPage+1);         
    }

    const handleCloseSidebar = () => {
        if (state.menuIsOpen) {
            dispatch({type: "CLOSE_MENU"});
        }
    }

    const fetchSearchMovies = async (movieText: string) => {
        setLoadingData(true);
        try {
            const res = await getMovieSearch(movieText, currentPage);

            if (res.status == 200) {
                setTotalPages(res.data.total_pages);
                setMovies(res.data.results);
            }
            
        } catch (error) {
            console.log(error);            
        } finally {
            setSearchingMovie(false);
            setLoadingData(false);
        }
    }

    const handleSearchMovie = async () => {
        if (refInput.current && refInput.current.value.length != 0) {
            if (movieSearchText.length != 0) {
                setCurrentPage(1);
            }

            const movieText = refInput.current.value;

            setMovieSearchText(movieText);
            setSearchingMovie(true);
            setMovieSearched(true);
            
            if (refInput.current) {
                refInput.current.value = '';
            }
            fetchSearchMovies(movieText);
        }
    }

    const resetSearchMovie = () => {
        setMovieSearched(false);
        setCurrentPage(1);

        fetchData(1);
    }

    const showDetailMovie = (movieId: number) => {
        const movieToShow = movies.find(m => m.id === movieId);
        if (movieToShow) {
            setMovieDetail(movieToShow);
        }
    }

    const rate = async(value: number) => {
        if (movieDetail) {
            const guestSession = await createGuestSession();
            if (guestSession.data.success) {
                const rate = await rateMovie(value, guestSession.data.guest_session_id, movieDetail.id);
                console.log(rate)
            }
        }
    }

    return (
        <div className="flex bg-[#1c242c] min-h-screen">
            <Sidebar />
            {loadingData && (
                <div className="flex flex-col w-full justify-center items-center text-white">
                    <img className="animate-spin" width='50' src={LoadSpinner} />
                    <span>Cargando información...</span>
                </div>
            )}

            {!loadingData && movieDetail == null && (
                <>
                    <div className={`flex flex-col w-full ${state.menuIsOpen ? 'blur-sm' : ''} `} onClick={handleCloseSidebar}>
                        <div className="flex lg:flex-row max-md:flex-col max-md:flex-col-reverse max-md:mt-10 justify-between mt-20 px-20">
                            <div className="max-md:mt-20">
                                <h3 className="text-2xl text-white">Películas populares</h3>
                            </div>
                            <div className="flex flex-row">
                                {movieSearched && (
                                    <>
                                        <span><FontAwesomeIcon icon={faClose} className="absolute ml-10 mt-2 text-white hover:cursor-pointer" onClick={resetSearchMovie} size="xs"/></span>
                                        <span className="text-white mt-3 underline mr-10">{movieSearchText}</span>
                                    </>
                                )}
                                <input type="text" className="rounded py-3 pl-10 pr-20 bg-[#364854] focus:outline-0 text-white" ref={refInput} placeholder="Buscar películas..." />
                                <div className="rounded py-3 px-5 ml-5 bg-[#364854] focus:outline-0 text-white">
                                    <button type="button" disabled={searchingMovie} onClick={handleSearchMovie} >{searchingMovie ? <img className="animate-spin " width='30' src={LoadSpinner} /> : 'Buscar'}</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full mt-20 -ml-20 justify-end">
                            <span className={`text-[#364854] transition-all duration-500 hover:cursor-pointer hover:scale-110 ${currentPage == 1 ? 'opacity-25' : 'opacity-100'}`} onClick={() => changePage('previous')}><FontAwesomeIcon icon={faArrowCircleLeft} size='lg' /></span>
                            <span className="text-white px-5">{currentPage}/{totalPages}</span>
                            <span className={`text-[#364854] transition-all duration-500 hover:cursor-pointer hover:scale-110 ${currentPage == totalPages ? 'opacity-25' : 'opacity-100'}`} onClick={() => changePage('next')}><FontAwesomeIcon  icon={faArrowCircleRight} size='lg' /></span>
                        </div>
                        <div className="flex w-full justify-center text-white p-20">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20">
                                {movies.length > 0 && movies.map((movie, idx) => (
                                    <>
                                        <div className="flex flex-col transition-all duration-500 hover:cursor-pointer hover:scale-105" onClick={() => showDetailMovie(movie.id)}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="rounded" alt="" />
                                            <p className="mt-2 text-center">{movie.title}</p>
                                            <p className="text-slate-500 text-center">Estreno: {moment(movie.release_date).format('DD/MM/YYYY')}</p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {movieDetail != null && (
                <div className={`flex max-md:flex-col w-full ${state.menuIsOpen ? 'blur-sm' : ''} `} onClick={handleCloseSidebar}>
                    <div className="flex absolute w-full right-10 top-5 justify-end" onClick={() => setMovieDetail(null)}>
                        <span className="transition-all duration-500 hover:cursor-pointer hover:scale-110">
                            <FontAwesomeIcon className="bg-[#364854] p-3 w-5 h-5 rounded-full" icon={faClose} color='white'/>
                        </span>
                    </div>
                    <div className="flex max-md:mt-10 mt-20 px-20 max-sm:w-[100%] w-[50%]">
                        <div className="max-md:mt-20">
                                <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} className="rounded" alt="" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-20">
                        <div className={`w-[50%] ml-[20%]`}>
                            <p className="absolute right-[20%] p-2 rounded-full text-white bg-orange-400">{movieDetail.vote_average}</p>
                            <h4 className="text-white text-4xl underline text-center">{movieDetail.title}</h4>
                            <p className="text-center text-slate-400 mt-5">{movieDetail.original_title} &middot; {moment(movieDetail.release_date).format('YYYY')} &middot; {movieDetail.original_language} {movieDetail.adult ? '&middot; 18+' : ''}</p>
                            <p className="text-center text-slate-400 mt-1"><FontAwesomeIcon icon={faStar} /> {movieDetail.vote_count}</p>
                            <p className="text-white mt-20 text-center">{movieDetail.overview}</p>
                            <div className="flex justify-center mt-20">
                                <p className="text-slate-400">Déjale tu voto a esta película</p>
                            </div>
                            <div className="flex justify-center max-md:ml-[15%]">
                                {movieVote.map((vot, idx) => (
                                    <>
                                        <div className="p-3 text-white transition-all hover:text-orange-400 hover:cursor-pointer" onClick={() => rate(idx+1)}>
                                            <FontAwesomeIcon icon={faStar} />
                                            <div className="text-white text-center">{idx+1}</div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default HomeView;