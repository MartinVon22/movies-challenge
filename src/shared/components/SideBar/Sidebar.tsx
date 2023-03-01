import { useState, useEffect } from 'react';
import { faHome, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';

const Sidebar = () => {

    const [routeActive, setRouteActive] = useState('');

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
    }, [])

    return (
        <div className="flex flex-col h-screen bg-[#1c242c] w-64">
            <nav className="flex flex-col my-[50%]">
                <a href="#" className={`transition hover:bg-[#364854] hover:text-white py-2 px-10 rounded ${routeActive === 'Home' ? 'bg-[#364854] text-white' : 'text-gray-500'}`}><FontAwesomeIcon icon={faHome} /> Inicio</a>
                <a href="#" className={`transition hover:bg-[#364854] hover:text-white py-2 px-10 rounded ${routeActive === 'Favourites' ? 'bg-[#364854] text-white' : 'text-gray-500'}`}><FontAwesomeIcon icon={faStar} /> Mis favoritos</a>
            </nav>
        </div>
    )
}

export default Sidebar;