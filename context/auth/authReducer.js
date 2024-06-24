import {
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
    RECUPERAR_CONTRASEÑA_EXITOSO,
    RECUPERAR_CONTRASEÑA_ERROR,
    CAMBIAR_CONTRASEÑA_EXITOSO,
    CAMBIAR_CONTRASEÑA_ERROR
} from "../../types";

export default (state, action) => {
    switch(action.type) {

        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
        case RECUPERAR_CONTRASEÑA_EXITOSO:
        case RECUPERAR_CONTRASEÑA_ERROR:
        case CAMBIAR_CONTRASEÑA_EXITOSO:
        case CAMBIAR_CONTRASEÑA_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true,
                cargando: false
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                token: '',
                autenticado: null,
                usuario: null
            }

        default:
            return state;
    }
}