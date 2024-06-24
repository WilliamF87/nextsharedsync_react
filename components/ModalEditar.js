import { useContext } from "react";
import appContext from "../context/app/appContext";
import { useFormik } from "formik";
import * as Yup from 'yup';

const ModalEditar = () => {

    const  AppContext = useContext(appContext);
    const { handleChangeModalEditar, enlace, editarEnlace } = AppContext;

    const { id, nombre, descargas } = enlace;

    const formik = useFormik({
        initialValues: {
            descargas: descargas
        },
        validationSchema: Yup.object({
            descargas: Yup.number()
                .min(1, "Debes tener mínimo una descarga")
                .max(20, "No puedes tener mas de 15 descargas")
        }),
        onSubmit: valores => {
            editarEnlace(id, valores.descargas)
            handleChangeModalEditar()
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="bg-gray-100 px-8 py-5">
                <h2 className="text-lg mx-auto text-center leading-6 font-medium text-gray-900 break-words">{nombre}</h2>
            </div>
            
                <div className="px-8 py-5 sm:p-6 flex items-center justify-center space-x-4">
                    <label htmlFor="descargas">Descargas:</label>
                    <input
                        type="number"
                        id="descargas"
                        className="shadow appearance-none border rounded w-20
                        py-2 px-3 text-gray-700 leading-tight
                        focus:outline-none focus:shadow-blue-900"
                        value={formik.values.descargas}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={1}
                        max={50}
                    />
                </div>

            <div className="bg-gray-100 px-8 py-3 sm:flex sm:justify-center sm:space-x-8">
                <input
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mb-2 sm:mb-0 cursor-pointer"
                    value="Aceptar"
                />

                <input
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                    onClick={() => {
                        handleChangeModalEditar()
                    }}
                    value="Cancelar"
                />
            </div>
        </form>  
    )
}

export default ModalEditar