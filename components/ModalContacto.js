import { useContext, useEffect, useState } from "react";
import appContext from "../context/app/appContext";

const ModalContacto = () => {

    const  AppContext = useContext(appContext);
    const { contacto, handleChangeModalContacto } = AppContext;
    
    useEffect(() => {
        if(contacto !== "gmail") {
            setTimeout(() => {
                handleChangeModalContacto();
            }, 1000);
        }
    }, [])

    const [copied, setCopied] = useState(false)

    const handleCopyClick = () => {
        navigator.clipboard.writeText("williamf.rosero@gmail.com");
        
        setCopied(true)
        setTimeout(() => {
            handleChangeModalContacto();
        }, 2000);
    };

    return (
        <>
            { contacto === "gmail" ? (
                <>
                    { copied ? (
                        <div className="text-red-600 p-4 text-xl">¡Correo copiado al portapapeles!</div>
                    ) : (
                        <>
                            <div className="px-20 mt-10 mb-5 flex items-center justify-center text-lg">William Fernando Rosero A.</div>
                            
                            <div className="px-20 mb-5 flex items-center justify-center text-lg">Email: williamf.rosero@gmail.com</div>

                            <div className="bg-gray-100 px-8 py-3 sm:flex sm:justify-center sm:space-x-8">
                                <button
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-lg font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mb-2 sm:mb-0 cursor-pointer"
                                    onClick={() => {
                                        handleCopyClick();
                                    }}
                                >Copiar</button>

                                <button
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-lg font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                                    onClick={() => {
                                        handleChangeModalContacto();
                                    }}
                                >Cancelar</button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="text-red-600 p-4 text-xl">Deshabilitado</div>
            )}
        </>  
    )
}

export default ModalContacto