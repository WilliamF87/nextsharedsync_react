import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
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
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {

    // Definir un state inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
        // cargando: null
    }

    // Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }

        // Limpiar alerta
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    // Autenticar usuario
    const iniciarSesion = async datos => {

        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response?.data.msg
            });
        }

        // Limpiar alerta
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    // Retornar el usuario autenticado con base en el Jwt
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');

            if(respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response?.data.msg
            });
        }
    }

    const cerrarSesion = () => {
        tokenAuth();
        dispatch({
            type: CERRAR_SESION
        });
    }

    // Recuperar constraseña
    const recuperarCotraseña = async email => {
        try {
            const { data } = await clienteAxios.post('/api/usuarios/olvide-password', { email });

            dispatch({
                type: RECUPERAR_CONTRASEÑA_EXITOSO,
                payload: data.msg
            });
        } catch (error) {
            dispatch({
                type: RECUPERAR_CONTRASEÑA_ERROR,
                payload: error.response?.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    // Cambiar constraseña
    const cambiarCotraseña = async (password, token) => {
        try {
            const { data } = await clienteAxios.post(`/api/usuarios/olvide-password/${token}`, { password });
            
            dispatch({
                type: CAMBIAR_CONTRASEÑA_EXITOSO,
                payload: data.msg
            });
        } catch (error) {
            dispatch({
                type: CAMBIAR_CONTRASEÑA_ERROR,
                payload: error.response?.data.msg
            });
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    return (
        <authContext.Provider
            value={{
                mensaje: state.mensaje,
                autenticado: state.autenticado,
                usuario: state.usuario,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion,
                recuperarCotraseña,
                cambiarCotraseña
            }}
        >
            { children }
        </authContext.Provider>
    );
}

export default AuthState;