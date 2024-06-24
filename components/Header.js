import Link from "next/link"
import { useEffect } from "react";
import { useContext } from "react"
import authContext from "../context/auth/authContext"
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";

const Header = () => {

  const AuthContext = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion, sinToken } = AuthContext;

  const AppContext = useContext(appContext);
  const { setAcceptedFiles, limpiarState } = AppContext;

  const router = useRouter();

  const nombreArray = usuario?.nombre.split(' ');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
        usuarioAutenticado();
    }
  }, [])

  const finalizarSesion = () => {
    cerrarSesion();

    setAcceptedFiles([]);

    limpiarState();
    
    router.push('/');
  }

  return (
    <header className="container mx-auto py-4 flex flex-col xl:flex-row items-center justify-between">
      <>
        <img
          className="w-96 h-full mb-4 xl:mb-0"
          src='/logo_app.png' alt="logo"
        />

        <Link href="/" className="text-white font-semibold text-xl hover:text-amber-300">Inicio</Link>
        <Link href="/instrucciones" className="text-white font-semibold text-xl hover:text-amber-300">Instrucciones</Link>
        { usuario &&
          <Link href="/mis_archivos" className="text-white font-semibold text-xl hover:text-amber-300">Mis Archivos</Link>
        }
      </>
      
      <div className="xl:mt-0 mt-9 xl:mb-0 mb-5">
        { usuario ? (
          <div className="flex flex-col sm:flex-row items-center text-white text-shadow">
            <p className="mb-2 mr-0 sm:mb-0 sm:mr-6 text-xl">Hola {`${nombreArray[0]} ${nombreArray.length > 1 ? nombreArray[1] : ""}`}</p>

            <button
              className="bg-red-600 hover:bg-black px-5 py-3 rounded-lg
                text-white font-bold uppercase"
              onClick={finalizarSesion}
            >Cerrar Sesión</button>
          </div>
        ) : (
          <>
            <Link href="/login" legacyBehavior>
              <a className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
              >Inicar Sesión</a>
            </Link>

            <Link href="/crearcuenta" legacyBehavior>
              <a className="bg-black hover:bg-gray-800 px-5 py-3 rounded-lg text-white font-bold uppercase"
              >Crear Cuenta</a>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header