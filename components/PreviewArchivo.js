import React, { useEffect, useState } from 'react'
import { formatearFecha } from '../helpers';
import { useContext } from 'react';
import appContext from '../context/app/appContext';

const PreviewArchivo = ({ enlace }) => {

  const { creado, descargas, nombre_original, _id, url } = enlace;

  const [stop, setStop] = useState(false);
  const [icono, setIcono] = useState("");
  const archivoExtension = nombre_original.split('.')[nombre_original.split('.').length - 1];

  const  AppContext = useContext(appContext);
  const { carpetaUsuario, handleChangeModalEditar, handleChangeModalDetalles, handleChangeModalEliminar, detalles, editar, eliminar, modalEditar, modalDetalles, modalEliminar, modalContacto, modalCopiar, handleChangeCopiar } = AppContext;

  useEffect(() => {
    setIcono("folder");
    if(stop) {
      const imagen = ["png", "jpg", "jpeg", "gif", "bmp", "tiff", "svg", "webp"];
      const documento = ["docx", "doc", "txt", "rtf", "odt", "pptx", "ppt", "xls", "xlsx"];
      const comprimido = ["rar", "zip", "7z", "tar", "gz", "bz2"];
      const video = ["avi", "mp4", "mkv", "mov", "wmv", "flv", "mpeg", "3gp", "webm", "ogg", "vob", "ts"];
      
      if(archivoExtension === "pdf") {
        setIcono("pdf")
      } else if(imagen.includes(archivoExtension)) {
        setIcono("img");
      } else if(comprimido.includes(archivoExtension)) {
        setIcono("rar")
      } else if(documento.includes(archivoExtension)) {
        setIcono("doc")
      } else if(video.includes(archivoExtension)) {
        setIcono("video")
      }
    }
    setStop(true)
  }, [!stop, nombre_original])

  const [opcionCopiar, setOpcionCopiar] = useState(false);

  const handleMouseOver = () => {
    setOpcionCopiar(true);
  };

  const handleMouseLeave = () => {
    setOpcionCopiar(false);
  };

  const handleTouchStart = () => {
    setOpcionCopiar(!opcionCopiar);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${carpetaUsuario}/${url}`);
    handleChangeCopiar(url);
    setOpcionCopiar(false);
  };

  return (
    <>
      {nombre_original && (
        <div className="relative bg-white border border-gray-700 rounded-lg m-4 p-4 flex items-center">
          
          {!descargas > 0 && (
            <div className="bg-gray-200 opacity-50 absolute inset-0"></div>
          )}

          { icono &&
            <img
              className="w-16 h-16 mr-4"
              src={`/iconos/${icono}.svg`} alt="logo"
            />
          }
          <div className="flex-1 w-3/4 overflowed-text">
            <div
              onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}
              className="flex flex-wrap space-x-3"
            >
              <div
                className="font-bold py-1 break-words w-full"
                onTouchStart={handleTouchStart}
              >{nombre_original}</div>

              {opcionCopiar && descargas > 0 && (
                <button className="bg-green-700 hover:bg-green-500 text-white py-1 px-2 rounded cursor-pointer mb-2"
                  onClick={handleCopyClick}
                >
                  Copiar URL
                </button>
              )}
            </div>
            <div>{formatearFecha(creado)}</div>

            <div className="md:flex md:justify-between mt-6">
              {descargas > 0 ? (
                <div className="mr-3">
                  <span className="font-medium">Descargas:</span> {''}
                  {descargas}
                </div>
              ) : (
                <div className={`${!modalEditar && !modalDetalles && !modalEliminar && !modalContacto && !modalCopiar && "relative z-10"} font-bold`}>Completado</div>
              )}

              <div className="flex space-x-4 mt-2 md:mt-0 buttons-450">
                {descargas > 0 && (
                  <button className="bg-orange-500 hover:bg-orange-400 text-white py-1 px-2 rounded cursor-pointer"
                    onClick={() => {
                      handleChangeModalEditar()
                      editar(_id, nombre_original, descargas)
                    }}
                  >
                    Editar
                  </button>
                )}

                <div className="button-group-450 buttons-group-390 space-x-4">
                  <button className={`${!modalEditar && !modalDetalles && !modalEliminar && !modalContacto && !modalCopiar && "relative z-10"} bg-blue-700 hover:bg-blue-500 text-white py-1 px-2 rounded cursor-pointer`}
                    onClick={() => {
                      handleChangeModalDetalles()
                      detalles(_id, nombre_original, descargas)
                    }}
                  >
                    Detalles
                  </button>

                  <button className={`${!modalEditar && !modalDetalles && !modalEliminar && !modalContacto && !modalCopiar && "relative z-10"} bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded cursor-pointer`}
                    onClick={() => {
                      handleChangeModalEliminar()
                      eliminar(_id, nombre_original)
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PreviewArchivo