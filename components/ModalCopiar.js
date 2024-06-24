import { useContext } from "react";
import appContext from "../context/app/appContext";

const ModalCopiar = () => {

    const  AppContext = useContext(appContext);
    const { handleChangeCopiar, carpetaUsuario, url } = AppContext;

    const urlEnlace = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${carpetaUsuario}/${url}`;

    return (
        <div>
            <div className="bg-gray-100 px-8 py-5">
                <h2 className="text-lg text-center leading-6 font-medium text-gray-900">¡URL copiada al portapapeles!</h2>
            </div>
            
            <div className="px-8 py-5 sm:p-6 text-center break-words">{urlEnlace}</div>

            <div className="bg-gray-100 px-8 py-3 mx-auto flex justify-center sm:justify-end">
                <button
                    className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm cursor-pointer"
                    onClick={() => {
                        handleChangeCopiar()
                    }}
                >Aceptar</button>
            </div>
        </div>  
    )
}

export default ModalCopiar