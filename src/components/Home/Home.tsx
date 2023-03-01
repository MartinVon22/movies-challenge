import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Sidebar from "../../shared/components/SideBar/Sidebar";

const HomeView = () => {

    const { state } = useContext(AppContext);

    return (
        <>
            <div className="flex bg-[#1c242c] h-screen">
                <Sidebar />
                <div className={`flex flex-col w-full ${state.menuIsOpen ? 'blur-sm' : ''} `}>
                    <div className="flex lg:flex-row max-md:flex-col max-md:flex-col-reverse max-md:mt-10 justify-between mt-20 px-20">
                        <div className="max-md:mt-20">
                            <h3 className="text-2xl text-white">Películas populares</h3>
                        </div>
                        <div>
                            <input type="text" className="rounded py-3 pl-10 pr-20 bg-[#364854] focus:outline-0 text-white" placeholder="Buscar películas..." />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default HomeView;