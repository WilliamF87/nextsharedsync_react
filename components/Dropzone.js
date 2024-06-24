import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import { useCallback, useContext } from "react"
import { useDropzone } from "react-dropzone";
import Formulario from "./Formulario";

const Dropzone = () => {

    const AppContext = useContext(appContext);
    const { cargando, mostrarAlerta, subirArchivo, crearEnlace, acceptedFiles, setAcceptedFiles } = AppContext;

    const AuthContext = useContext(authContext);
    const { autenticado } = AuthContext;

    // Valor inicial de Dropzone
    const onDropAccepted = useCallback( async acceptedFiles => {
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);

        subirArchivo(formData, acceptedFiles[0].path);
    });

    // Archivos rechazados
    const onDropRejected = () => {
        mostrarAlerta("No se pudo subir el archivo, el límite es un 1 MB. Obtén una cuenta gratis para subir archivos más grandes");
    }

    const handleDrop = (files) => {
        setAcceptedFiles(files);
    };

    const maxSize = () => {
        if(autenticado) {
            return 10 * 1000000
        }

        return 1000000;
    }
    maxSize();

    // Extraer contenido de Dropzone
    const {
        getRootProps, getInputProps, isDragActive
    } = useDropzone({onDrop: handleDrop, onDropAccepted, onDropRejected, maxSize: maxSize()});

    const archivos = acceptedFiles.map( archivo => (
        <li key={archivo.lastModified}
            className="bg-white flex-1 text-center p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl w-56 whitespace-nowrap text-ellipsis overflow-hidden m-auto">{archivo.path}</p>
            <p className="text-sm text-gray-500">
                {(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
            </p>
        </li>
    ));

    const reset = () => {
        if(acceptedFiles.length > 0) {
            acceptedFiles.forEach( file => URL.revokeObjectURL(file.preview));
            // acceptedFiles.splice(0, acceptedFiles.length);
            setAcceptedFiles([]);
        }
    }

    return (
        <div
            className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4'
        >
            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>{archivos}</ul>

                    { autenticado ? <Formulario /> : (
                        <p className="text-xl text-center text-gray-600">
                            Tu archivo será eliminado después de 10 descargas. Si quieres un número mayor de descargas, puedes iniciar sesión o crear una cuenta gratis
                        </p>
                    )}

                    { cargando ?
                        // Támbien se puede usar un spinner spinkit react
                        <p className="my-10 text-center text-gray-600">Subiendo archivo...</p> :
                        <>
                            <button className="bg-blue-700 w-full py-3 rounded-lg
                                text-white mt-10 mb-5 hover:bg-blue-800"
                                onClick={ () => crearEnlace() }
                            >
                                Crear Enlace
                            </button>

                            <button className="bg-red-700 w-full py-3 rounded-lg
                                text-white mt-5 mb-10 hover:bg-red-800"
                                onClick={reset}
                            >
                                Cancelar
                            </button>
                        </>
                    }
                </div>
            ) : (
                <div { ...getRootProps({ className: 'dropzone w-full py-32' }) }>
                    <input className="h-full" { ...getInputProps() } />

                    { isDragActive ?
                        <p className="text-2xl text-center text-gray-600">
                            Suelta el archivo
                        </p> : (
                        <div className="text-center">

                            <button className="bg-blue-700 w-3/4 text-xl py-3 rounded-lg text-white my-10 hover:bg-blue-800">
                                Selecciona tu archivo
                            </button>
                            <p className="text-2xl text-center text-gray-600">
                                o arrastralo aquí
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Dropzone