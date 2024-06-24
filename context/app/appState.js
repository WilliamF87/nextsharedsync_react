import appContext from "./appContext";
import { useReducer } from "react";
import appReducer from "./appReducer";
import {
    AGREGAR_DESCARGAS,
    AGREGAR_PASSWORD,
    CREAR_ENLACE_EXITO,
    LIMPIAR_ALERTA,
    LIMPIAR_STATE,
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    ARCHIVOS,
    HISTORIAL_USUARIO,
    HISTORIAL_USUARIO_EXITO,
    MODAL_CHANGE_EDITAR,
    MODAL_CHANGE_DETALLES,
    MODAL_CHANGE_ELIMINAR,
    MODAL_CHANGE_CONTACTO,
    MODAL_CHANGE_COPIAR,
    HISTORIAL_ARCHIVO,
    ENLACE,
    EDITAR_ENLACE,
    EDITAR_ENLACE_EXITO,
    EDITAR_ENLACE_ERROR,
    CURRENT_PAGE,
    EDITAR_FILTRO,
    ACTUALIZAR_HISTORIAL
} from "../../types";
import clienteAxios from "../../config/axios";

const AppState = ({ children }) => {

    const initialState = {
        acceptedFiles: [],
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: '',
        carpeta: '',
        carpetaUsuario: '',
        historial: [],
        modalEditar: false,
        modalDetalles: false,
        modalEliminar: false,
        modalContacto: false,
        modalCopiar: false,
        historialArchivo: {},
        enlace: {},
        currentPage: 0,
        filtro: "todos",
        historialCompleto: [],
        contacto: ""
    }

    // Crear dispatch y state
    const [ state, dispatch ] = useReducer(appReducer, initialState);

    // Mostrar una alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
                payload: null
            });
        }, 3000);
    }

    // Subir los archivos al servidor
    const subirArchivo = async (formData, nombreArchivo) => {
        // Cargando
        dispatch({
            type: SUBIR_ARCHIVO
        });

        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);
            
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            });
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response?.data.msg
            });

            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA,
                    payload: null
                });
            }, 3000);
        }
    }

    // Crear un enlace una vez que se subió el archivo
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data
            });
            
            setFiltro("todos");
        } catch (error) {
            console.log(error);
        }
    }

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        });
    }

    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        });
    }

    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        });
    }

    const registrarDescarga = async (url, carpeta, archivoDescarga) => {
        const data = {
            url: url,
            carpeta: carpeta,
            archivoDescarga: archivoDescarga
        }

        try {
            await clienteAxios.post('/api/archivos/registrarDescarga', data);
        } catch (error) {
            console.log(error);
        }
    }

    const setAcceptedFiles = (files) => {
        dispatch({
            type: ARCHIVOS,
            payload: files
        });
    };

    const historialUsuario = async () => {
        dispatch({
            type: HISTORIAL_USUARIO
        });
        
        const { data } = await clienteAxios.get('/api/historial');

        dispatch({
            type: HISTORIAL_USUARIO_EXITO,
            payload: data
        });
    }

    const handleChangeModalEditar = () => {
        dispatch({
            type: MODAL_CHANGE_EDITAR,
            payload: !state.modalEditar
        });
    }

    const handleChangeModalDetalles = () => {
        dispatch({
            type: MODAL_CHANGE_DETALLES,
            payload: !state.modalDetalles
        });
    }

    const handleChangeModalEliminar = () => {
        dispatch({
            type: MODAL_CHANGE_ELIMINAR,
            payload: !state.modalEliminar
        });
    }

    const handleChangeModalContacto = (contacto) => {
        const datos = {
            contacto: contacto,
            modalContacto: !state.modalContacto
        }

        dispatch({
            type: MODAL_CHANGE_CONTACTO,
            payload: datos
        });
    }

    const handleChangeCopiar = url => {

        let datos = {
            url: url,
            modalCopiar: !state.modalCopiar
        };
        
        if(!url) {
            datos.url = null;
        }
        
        dispatch({
            type: MODAL_CHANGE_COPIAR,
            payload: datos
        });
    }

    const detalles = async (id, nombre, descargas) => {
        let historialArchivo = {};

        if(id && id !== undefined) {
            const { data } = await clienteAxios.get(`/api/historial/${id}`);

            historialArchivo = { ...data.historialArchivo, nombre: nombre, descargas: descargas };
        }
        dispatch({
            type: HISTORIAL_ARCHIVO,
            payload: historialArchivo
        });
    }

    const editar = (id, nombre, descargas) => {
        
        let enlace = {};
        
        if(id) {
            enlace = {
                id: id,
                nombre: nombre,
                descargas: descargas
            }
        }

        dispatch({
            type: ENLACE,
            payload: enlace
        });
    }

    const editarEnlace = async (id, descargas) => {

        const data = {
            id: id,
            descargas: descargas
        }

        const resultado = await clienteAxios.post('/api/enlaces/editar/descargas', data);
        
        const historialActualizado = state.historial.map(enlace =>
            enlace._id === resultado.data._id ? resultado.data : enlace
        );

        const historialCompletoActualizado = state.historialCompleto.map(enlace =>
            enlace._id === resultado.data._id ? resultado.data : enlace
        );

        dispatch({
            type: EDITAR_ENLACE,
            payload: { historial: historialActualizado, historialCompleto: historialCompletoActualizado }
        });
    }

    const eliminar = (id, nombre) => {
        
        let enlace = {};
        
        if(id) {
            enlace = {
                id: id,
                nombre: nombre
            }
        }

        dispatch({
            type: ENLACE,
            payload: enlace
        });
    }
    
    const eliminarEnlace = async (id) => {
        const data = {
            id: id
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces/eliminar/enlace', data);
            
            const historialActualizado = state.historial.filter(enlace =>
                enlace._id !== resultado.data.enlaceEliminado
            );

            const historialCompletoActualizado = state.historialCompleto.filter(enlace =>
                enlace._id !== resultado.data.enlaceEliminado
            );

            if(historialActualizado.length % 5 === 0 && state.historial[state.historial.length - 1]._id === resultado.data.enlaceEliminado) {
                setCurrentPage(state.currentPage - 1)
            }
    
            dispatch({
                type: EDITAR_ENLACE,
                payload: { historial: historialActualizado, historialCompleto: historialCompletoActualizado }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const setCurrentPage = page => {
        dispatch({
            type: CURRENT_PAGE,
            payload: page
        });
    }

    const setFiltro = filtro => {
        dispatch({
            type: EDITAR_FILTRO,
            payload: filtro
        });

        dispatch({
            type: EDITAR_ENLACE,
            payload: { historial: historialFiltro(state.historialCompleto, filtro), historialCompleto: state.historialCompleto }
        });

        setCurrentPage(0)
    }

    const historialFiltro = (historial, filtro) => {
        let historialFiltro = historial;

        if(filtro === "activos") {
            historialFiltro = historial.filter(enlace =>
                enlace.descargas > 0
            );
        }

        if(filtro === "completados") {
            historialFiltro = historial.filter(enlace =>
                enlace.descargas === 0
            );
        }

        return historialFiltro;
    }

    return (
        <appContext.Provider
            value={{
                acceptedFiles: state.acceptedFiles,
                setAcceptedFiles,
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                carpeta: state.carpeta,
                carpetaUsuario: state.carpetaUsuario,
                enlace: state.enlace,
                pagina: state.pagina,
                currentPage: state.currentPage,
                historialCompleto: state.historialCompleto,
                setCurrentPage,
                filtro: state.filtro,
                setFiltro,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas,
                registrarDescarga,
                historial: state.historial,
                historialUsuario,
                modalEditar: state.modalEditar,
                modalDetalles: state.modalDetalles,
                modalEliminar: state.modalEliminar,
                modalCopiar: state.modalCopiar,
                contacto: state.contacto,
                modalContacto: state.modalContacto,
                handleChangeModalEditar,
                handleChangeModalDetalles,
                handleChangeModalEliminar,
                handleChangeModalContacto,
                handleChangeCopiar,
                detalles,
                historialArchivo: state.historialArchivo,
                editar,
                editarEnlace,
                eliminar,
                eliminarEnlace
            }}
        >
            { children }
        </appContext.Provider>
    );
}

export default AppState;