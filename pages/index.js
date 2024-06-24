import { useContext } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Dropzone from '../components/Dropzone';
import Link from 'next/link';
import Alerta from '../components/Alerta';

export default function Home() {
  
  const AuthContext = useContext(authContext);
  const { usuario } = AuthContext;

  const AppContext = useContext(appContext);
  const { mensaje_archivo, url, carpeta, setAcceptedFiles, limpiarState } = AppContext;

  const cargarOtroArchivo = () => {
    setAcceptedFiles([]);

    limpiarState();
  }

  return (
    <Layout
      pagina='Inicio'
    >
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        { url ? (
          <div className='min-h-72'>
            <p className='text-center text-2xl mx-auto mt-10 overflow-hidden whitespace-nowrap overflow-ellipsis w-11/12'>
              <span className='font-bold text-red-700 text-3xl uppercase'>
                Tu URL es:
              </span>{' '}
              {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${carpeta}/${url}`}
            </p>
            <div className="flex flex-col items-center">
              <button
                className="bg-red-500 hover:bg-gray-900 w-11/12 p-2
                    text-white uppercase font-bold cursor-pointer mt-10"
                onClick={ () => navigator.clipboard
                  .writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${carpeta}/${url}`)
                }
              >Copiar Enlace</button>

            <button
                className="bg-blue-500 hover:bg-gray-900 w-11/12 p-2
                    text-white uppercase font-bold cursor-pointer mt-5"
                onClick={cargarOtroArchivo}
              >Cargar otro archivo</button>
            </div>
          </div>
        ) : (
          <>
            { mensaje_archivo && <Alerta /> }

            <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
              <Dropzone />

              <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>
                  Compartir archivos de forma segura, sencilla y privada
                </h2>
                {/* leading-loose: interlineado */}
                <p className="text-xl leading-loose">
                  <span className="text-yellow-500 font-bold text-shadow text-3xl ">NextShared</span><span className="text-red-500 font-bold text-shadow text-3xl">Sync</span> te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
                </p>

                {!usuario &&
                  <Link href="/crearcuenta" legacyBehavior>
                    <a className='text-red-500 font-bold text-lg hover:text-red-700'>
                      Crear una cuenta para mayores beneficios
                    </a>
                  </Link>
                }
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
