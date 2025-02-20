import { useContext } from "react";
import appContext from "../context/app/appContext";
import { useState } from "react";

const Formulario = () => {

    const AppState = useContext(appContext);
    const { agregarPassword, agregarDescargas } = AppState;

    const [tienePassword, setTienePassword] = useState(false);
        
    return (
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select
                    className="appearance-none w-full mt-2 bg-white border border-gray-400
                        text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none
                        focus:border-gray-500"
                    onChange={ e => agregarDescargas(parseInt(e.target.value)) }
                    defaultValue="1"
                >
                    <option value="1" disabled>-- Seleccione --</option>
                    <option value="1">1 descarga</option>
                    <option value="5">5 descargas</option>
                    <option value="10">10 descargas</option>
                    <option value="20">20 descargas</option>
                    <option value="30">30 descargas</option>
                    <option value="40">40 descargas</option>
                    <option value="50">50 descargas</option>
                </select>
            </div>

            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">
                        Proteger con Contraseña
                    </label>

                    <input
                        type="checkbox"
                        onChange={() => setTienePassword(!tienePassword)}
                    /> 
                </div>

                {tienePassword &&
                    <input 
                        type="password" 
                        className="appearance-none w-full mt-2 bg-white border border-gray-400
                            text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none
                            focus:border-gray-500" 
                        onChange={ e => agregarPassword(e.target.value) }
                    />
                }
            </div>
        </div>
    )
}

export default Formulario