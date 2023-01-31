

const crearMensaje = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime() // regresa la fecha y hora
    }
}


module.exports = {
    crearMensaje
}
























