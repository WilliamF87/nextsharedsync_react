import clienteAxios from '../../../config/axios';
import { useContext, useState } from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import appContext from '../../../context/app/appContext';
import Alerta from '../../../components/Alerta';

export async function getServerSideProps({ params }) {

    const { carpeta, enlace } = params

    const { data } = await clienteAxios.get(`/api/carpetas/${carpeta}`);
    
    let resultado;

    if(data.enlaces && data.enlaces.some(obj => obj.url === enlace)) {
        resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

        if(resultado.data.descargas <= 0) {
            return {
                notFound: true,
            };
        }
    }
    
    if(!data.enlaces || !data.enlaces.some(obj => obj.url === enlace)) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            enlace: resultado.data,
            carpeta: carpeta,
            url: enlace
        }
    }
}

const Enlace = ({ enlace, carpeta, url }) => {

    const router = useRouter();

    // Context de la pp
    const  AppContext = useContext(appContext);
    const { mensaje_archivo, mostrarAlerta, registrarDescarga } = AppContext;

    const [tienePassword, setTienePassword] = useState(enlace.password);
    const [password, setPassword] = useState("");
    const [archivoDescarga, setArchivoDescarga] = useState(enlace.archivo);

    const verificarPassword = async e => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const resultado = await clienteAxios.post(
                `/api/enlaces/${enlace.enlace}`, data
            );
            setTienePassword(resultado.data.password);
            // Siempre que se pueda obtener el enlace, password pasa a ser false
            // setArchivoDescarga()
            setArchivoDescarga(resultado.data.archivo)
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }

    }

    const descargarArchivo = async () => {
        try {
            await router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/archivos/${carpeta}/${archivoDescarga}/${enlace.nombre}`);

            await registrarDescarga(url, carpeta, archivoDescarga);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            { tienePassword ? (
                <div className="2xl:pb-52 pb-10">
                    <h2 className="text-2xl text-center text-gray-700">
                        Este enlace está protegido por un password, colocalo a continuación
                    </h2>

                    { mensaje_archivo && <Alerta /> }
                    
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={ e => verificarPassword(e) }
                            >
                                <div className="mb-4">
                                    <label htmlFor="password"
                                        className="block text-black text-sm font-bold mb-2"
                                    >Password</label>

                                    <input
                                        type="password"
                                        id="password"
                                        className="shadow appearance-none border rounded w-full
                                            py-2 px-3 text-gray-700 leading-tight
                                            focus:outline-none focus:shadow-blue-900"
                                        placeholder="Password del enlace"
                                        value={password}
                                        onChange={ e => setPassword(e.target.value) }
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="bg-red-500 hover:bg-gray-900 w-full p-2
                                        text-white uppercase font-bold cursor-pointer"
                                    value="Validar Password"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="2xl:pb-80 pb-36">
                    <h1 className="text-3xl text-center text-gray-700">
                        Descarga tu archivo aquí:
                    </h1>
                    <div className="flex items-center justify-center mt-10">
                        <button
                            className="bg-red-500 hover:bg-black text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            onClick={ () => descargarArchivo() }
                        >Descargar</button>
                    </div>
                    <div
                        className="mx-auto text-center w-11/12 font-bold text-2xl py-1 text-gray-500 hover:text-gray-700 hover:underline mt-2 break-words"
                    >{enlace.nombre}</div>
                </div>
            )}
        </Layout>
    )
}

export default Enlace;