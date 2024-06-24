// export const generarId = () => {
//     const random = Math.random().toString(36).substring(2)
//     const fecha = Date.now().toString(36)
//     return random + fecha;
// }

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones);
}

export const horaFormateada = hora => {
    const horaNueva = new Date(hora);

    const opciones = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }
    return horaNueva.toLocaleDateString('es-ES', opciones);
}