import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getPopularMovies } from "../../core/services/movies.service";
import { MovieModel } from "../../models/Movie.model";
import Sidebar from "../../shared/components/SideBar/Sidebar";
import LoadSpinner from "../../assets/imgs/load_spinner.svg";

const HomeView = () => {

    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loadingData, setLoadingData] = useState(true);

    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage])

    const fetchData = async (page: number) => {
        setLoadingData(true);
        try {
            const res = await getPopularMovies(page);
            if (res.status === 200) {
                setMovies(res.data.results)
                setCurrentPage(res.data.page);
                setTotalPages(res.data.total_pages)
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
        dispatch({type: "CLOSE_MENU"});
    }

    return (
        <div className="flex bg-[#1c242c] min-h-screen">
            {loadingData && (
                <div className="flex flex-col w-full justify-center items-center text-white">
                    <img className="animate-spin" width='50' src={LoadSpinner} />
                    <span>Cargando información...</span>
                </div>
            )}

            {!loadingData && (
                <>
                    <Sidebar />
                    <div className={`flex flex-col w-full ${state.menuIsOpen ? 'blur-sm' : ''} `} onClick={handleCloseSidebar}>
                        <div className="flex lg:flex-row max-md:flex-col max-md:flex-col-reverse max-md:mt-10 justify-between mt-20 px-20">
                            <div className="max-md:mt-20">
                                <h3 className="text-2xl text-white">Películas populares</h3>
                            </div>
                            <div>
                                <input type="text" className="rounded py-3 pl-10 pr-20 bg-[#364854] focus:outline-0 text-white" placeholder="Buscar películas..." />
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
                                        <div className="flex flex-col transition-all duration-500 hover:cursor-pointer hover:scale-105">
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
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
        </div>
    )

}

export default HomeView;