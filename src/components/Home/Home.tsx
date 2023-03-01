const HomeView = () => {

    return (
        <div className="flex flex-col h-screen bg-gray-800 w-64">
            <nav className="flex flex-col mt-10">
                <a href="#" className="text-gray-400 hover:text-white py-2 px-4">Dashboard</a>
                <a href="#" className="text-gray-400 hover:text-white py-2 px-4">Usuarios</a>
                <a href="#" className="text-gray-400 hover:text-white py-2 px-4">Productos</a>
                <a href="#" className="text-gray-400 hover:text-white py-2 px-4">Configuración</a>
            </nav>
        </div>
    )

}

export default HomeView;