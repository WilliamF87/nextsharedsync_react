import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import { useRouter } from "next/router";
import PreviewArchivo from "../components/PreviewArchivo";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import ModalEditar from "../components/ModalEditar";
import ModalDetalles from "../components/ModalDetalles";
import ModalEliminar from "../components/ModalEliminar";
import ModalCopiar from "../components/ModalCopiar";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
  },
};

Modal.setAppElement('#__next');

const Misarchivos = () => {

  const AuthContext = useContext(authContext);
  const { usuario, cargando } = AuthContext;

  const  AppContext = useContext(appContext);
  const { historial, historialUsuario, cargando: cargandoApp, carpetaUsuario, modalEditar, modalDetalles, modalEliminar, historialArchivo, modalCopiar, currentPage, setCurrentPage, filtro, setFiltro } = AppContext;

  const router = useRouter();
  
  useEffect(() => {
    historialUsuario();
  }, [])

  useEffect(() => {
    if (cargandoApp === false) {
      if(!usuario) {
        router.push('/');
      }
    }
  }, [cargandoApp])

  const itemsPerPage = 5;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistorial = historial?.slice(indexOfFirstItem, indexOfLastItem);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  return (
    <>
      <Layout
        pagina='Mis Archivos'
      >
        {!cargando ? (
          <>
            {!cargandoApp ? (
              <div className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
                <div className="md:w-3/4 lg:w-3/5 xl:w-3/6 mx-auto">
                  {usuario && carpetaUsuario && historial.length > 0 || filtro !== "todos" ? (
                    <h1 className="text-4xl font-black text-center">Mis archivos</h1>
                  ) : ""}

                  {usuario && carpetaUsuario && historial.length > 0 || filtro !== "todos" ? (
                    <div className="flex justify-end mt-5">
                      <select
                        className="p-2 border border-gray-300 rounded"
                        value={filtro}
                        onChange={handleFiltroChange}
                      >
                        <option value="todos">Todos los enlaces</option>
                        <option value="activos">Enlaces activos</option>
                        <option value="completados">Enlaces completados</option>
                      </select>
                    </div>
                  ) : ""}

                  <div className={!carpetaUsuario ? "min-h-screen" : "bg-sky-200 border border-gray-700 p-1 shadow mt-5 rounded-lg"}>
                    {usuario && carpetaUsuario && !historial.length > 0 ? (
                      <div className="my-5 mx-10">
                        <h2 className="font-black text-3xl text-center">No hay archivos</h2>
                        <p className="text-xl mt-5 text-center">
                          Todavía no tienes archivos para compartir, {''}
                          <span className="text-sky-600 font-bold">aparecerán aquí cuando los hayas cargado</span>
                        </p>
                      </div>
                    ) : (
                      <>
                        {currentHistorial.map( (enlace, i) => (
                          <PreviewArchivo
                            key={i}
                            enlace={enlace}
                          />
                        ))}

                      </>
                    )}
                  </div>

                  {historial.length > itemsPerPage && (
                    <div className="mt-10 flex justify-center">
                      <ReactPaginate
                        pageCount={Math.ceil(historial.length / itemsPerPage)}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        activeClassName="active"
                        previousLabel="<<"
                        previousClassName={currentPage === 0 ? "disable" : "page"}
                        nextClassName={currentPage === Math.ceil(historial?.length / itemsPerPage) - 1 ? "disable" : "page"}
                        nextLabel=">>"
                        breakLabel="..."
                        renderOnZeroPageCount={null}
                        pageClassName="page"
                        forcePage={currentPage}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="min-h-screen"></div>
            )}
          </>
        ) : (
          <div className="min-h-screen"></div>
        )}
      </Layout>

      <Modal
        isOpen={modalEditar}
        style={customStyles}
      >
        <ModalEditar />
      </Modal>

      <Modal
        isOpen={modalDetalles && historialArchivo.nombre ? true : false}
        style={customStyles}
      >
        <ModalDetalles />
      </Modal>

      <Modal
        isOpen={modalEliminar}
        style={customStyles}
      >
        <ModalEliminar />
      </Modal>

      <Modal
        isOpen={modalCopiar}
        style={customStyles}
      >
        <ModalCopiar />
      </Modal>
    </>
  )
}

export default Misarchivos