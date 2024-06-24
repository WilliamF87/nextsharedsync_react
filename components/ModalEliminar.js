import { useContext } from "react";
import appContext from "../context/app/appContext";

const ModalEliminar = () => {

    const  AppContext = useContext(appContext);
    const { handleChangeModalEliminar, enlace, eliminarEnlace } = AppContext;

    const { id, nombre } = enlace;

    return (
        <div>
            <div className="bg-gray-100 px-8 py-5">
                <h2 className="text-lg text-center leading-6 font-medium text-gray-900 break-words">{nombre}</h2>
            </div>
            
            <div className="px-8 py-5 sm:p-6 flex items-center justify-center">¿Estás seguro de eliminar este enlace?</div>

            <div className="bg-gray-100 px-8 py-3 sm:flex sm:justify-center sm:space-x-8">
                <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mb-2 sm:mb-0 cursor-pointer"
                    onClick={() => {
                        handleChangeModalEliminar()
                        eliminarEnlace(id)
                    }}
                >Aceptar</button>

                <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                    onClick={() => {
                        handleChangeModalEliminar()
                    }}
                >Cancelar</button>
            </div>
        </div>  
    )
}

export default ModalEliminar