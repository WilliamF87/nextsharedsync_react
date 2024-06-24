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
    CURRENT_PAGE,
    EDITAR_FILTRO
} from "../../types"

export default (state, action) => {
    switch(action.type) {
        case MOSTRAR_ALERTA:
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case SUBIR_ARCHIVO:
        case HISTORIAL_USUARIO:
            return {
                ...state,
                cargando: true
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: false
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: false
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload.url,
                carpeta: action.payload.carpeta
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                mensaje_archivo: null,
                nombre: '',
                nombre_original: '',
                cargando: false,
                descargas: 1,
                password: '',
                autor: null,
                url: ''
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            }
        case ARCHIVOS:
            return {
                ...state,
                acceptedFiles: action.payload
            }
        
        case HISTORIAL_USUARIO_EXITO:
            return {
                ...state,
                historial: action.payload.enlaces,
                historialCompleto: action.payload.enlaces,
                carpetaUsuario: action.payload.carpetaUsuario,
                cargando: false
            }

        case MODAL_CHANGE_EDITAR:
            return {
                ...state,
                modalEditar: action.payload
            }

        case MODAL_CHANGE_DETALLES:
            return {
                ...state,
                modalDetalles: action.payload
            }

        case MODAL_CHANGE_ELIMINAR:
            return {
                ...state,
                modalEliminar: action.payload
            }
        
        case MODAL_CHANGE_CONTACTO:
            return {
                ...state,
                contacto: action.payload.contacto,
                modalContacto: action.payload.modalContacto
            }

        case MODAL_CHANGE_COPIAR:
            return {
                ...state,
                modalCopiar: action.payload.modalCopiar,
                url: action.payload.url,
            }
        
        case HISTORIAL_ARCHIVO:
            return {
                ...state,
                historialArchivo: action.payload
            }

        case ENLACE:
            return {
                ...state,
                enlace: action.payload
            }

        case EDITAR_ENLACE:
            return {
                ...state,
                historial: action.payload.historial,
                historialCompleto: action.payload.historialCompleto
            }

        case CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }

        case EDITAR_FILTRO:
            return {
                ...state,
                filtro: action.payload
            }

        default:
            return state
    }
}