import { useState, useEffect, useContext } from 'react';
import { faBars, faClose, faHome, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

const Sidebar = () => {

    const [routeActive, setRouteActive] = useState('');
    const { state, dispatch } = useContext(AppContext);

    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setRouteActive('Home');
                break;        
            case 'favourites':
                setRouteActive('Favourites');
                break;
            default:
                break;
        }
    }, [location])


    const handleShowMenu = () => {
        dispatch({ type: !state.menuIsOpen ? "OPEN_MENU" : "CLOSE_MENU" });

    }

    return (
        <>
            <span className={`absolute z-40 top-5 transition-all ${!state.menuIsOpen ? 'left-10' : 'left-56'} hover:cursor-pointer`} onClick={handleShowMenu}><FontAwesomeIcon  icon={state.menuIsOpen ? faClose: faBars} color='white' size={'lg'} /></span>
            <div className={`flex flex-col fixed h-[100%] bg-[#1c242c] w-64 z-10 transition-all ${!state.menuIsOpen ? '-ml-[100%]' : 'ml-[0%]'}`}>
                <nav className="flex flex-col my-[50%]">
                    <span className={`transition hover:bg-[#364854] hover:text-white hover:cursor-pointer py-2 px-10 rounded ${routeActive === 'Home' ? 'bg-[#364854] text-white' : 'text-gray-500'}`}><FontAwesomeIcon icon={faHome} /> Inicio</span>
                    <span className={`transition hover:bg-[#364854] hover:text-white hover:cursor-pointer py-2 px-10 rounded ${routeActive === 'Favourites' ? 'bg-[#364854] text-white' : 'text-gray-500'}`}><FontAwesomeIcon icon={faStar} /> Mis favoritos</span>
                </nav>
            </div>
        </>
    )
}

export default Sidebar;