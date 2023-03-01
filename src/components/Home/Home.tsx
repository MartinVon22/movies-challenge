import { faHome, faStar, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../../shared/components/SideBar/Sidebar";

const HomeView = () => {

    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex w-[100%] h-screen bg-[#1c242c] justify-between">
                    <div className="text-2xl mt-10 mx-40">
                        <p className="text-white">Películas populares</p>
                    </div>
                    <div className="relative mt-10 mr-20">
                        <span className="absolute left-3 top-2">
                            <FontAwesomeIcon icon={faMagnifyingGlass} color='#ccc'/>
                        </span>
                        <input type="text" className="bg-[#1c242c] border border-slate-700 rounded px-10 py-2 text-gray-300 focus:outline-0" placeholder="Buscar película.." />
                    </div>
                </div>
            </div>
        </>
    )

}

export default HomeView;