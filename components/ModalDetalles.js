import { useContext, useState } from "react";
import appContext from "../context/app/appContext";
import { horaFormateada } from '../helpers';
import ReactPaginate from "react-paginate";

const ModalDetalles = () => {

    const  AppContext = useContext(appContext);
    const { handleChangeModalDetalles, historialArchivo, detalles } = AppContext;

    const { nombre, descargado, ultimaDescarga, usuarios, descargas } = historialArchivo;

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = usuarios?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            {currentUsers && (
                <div>
                    <div className="bg-gray-100 px-4 py-5 sm:px-6">
                        <h2 className="text-lg mx-auto text-center leading-6 font-medium text-gray-900 max-w-lg break-words">{nombre}</h2>
                    </div>

                    {!descargado > 0 ? (
                        <div className="my-5 mx-10 max-w-lg">
                            <h2 className="font-black text-xl text-center">No hay descargas</h2>
                            <p className="text-xl mt-5 text-center">
                            Todavía no han descargado tu archivo, {''}
                                <span className="text-sky-600 font-bold">los usuarios que lo hagan aparecerán aquí.</span>
                            </p>
                        </div>
                    ) : (
                        <div className="px-4 py-5 sm:p-6">
                            <p className="mb-4"><span className="font-bold">Descargado:</span> {descargado} {''} {descargado === 1 ? "vez" : "veces"}</p>
                            <p className="mb-4"><span className="font-bold">Última Descarga:</span> {horaFormateada(ultimaDescarga)}</p>

                            {!currentUsers.length > 0 ? (
                                <div className="my-5 mx-10 max-w-lg">
                                    {descargas > 0 ? (
                                        <p className="mt-5 text-lg text-center">
                                        No hay descargas de usuarios registrados, {''}
                                            <span className="text-sky-600 font-bold">los usuarios que lo hagan aparecerán aquí.</span>
                                        </p>
                                    ) : (
                                        <p className="mt-5 text-lg text-center">
                                        No hay descargas de usuarios registrados.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <p className="mb-4">Usuarios que han descargado tu archivo:</p>
                                    
                                    <ul>
                                    {currentUsers.map((usuario, i) => (
                                        <li key={i} className="font-semibold">
                                            {usuario.nombre} <span className="text-gray-500">{usuario.email}</span>
                                        </li>
                                    ))}
                                    </ul>
                                    
                                    {usuarios.length > itemsPerPage && (
                                    <div className="mt-4 flex justify-center">
                                        <ReactPaginate
                                            pageCount={Math.ceil(usuarios.length / itemsPerPage)}
                                            pageRangeDisplayed={2}
                                            marginPagesDisplayed={0}
                                            onPageChange={handlePageClick}
                                            containerClassName="pagination"
                                            activeClassName="active"
                                            previousLabel="<<"
                                            nextLabel=">>"
                                            breakLabel="..."
                                            renderOnZeroPageCount={null}
                                            pageClassName="page"
                                            forcePage={currentPage}
                                            previousClassName={currentPage === 0 ? "disable" : "page"}
                                            nextClassName={currentPage === Math.ceil(usuarios?.length / itemsPerPage) - 1 ? "disable" : "page"}
                                        />
                                    </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                handleChangeModalDetalles()
                                detalles()
                            }}
                        >Cerrar</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalDetalles