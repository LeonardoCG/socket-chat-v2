var socket = io();

var params = new URLSearchParams( window.location.search );

if( !params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre & sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);        
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
 

// Escuchar información
socket.on('crearMensaje', (mensaje) => {

    console.log('Servidor:', mensaje);

});

//cuando entra una persona
socket.on('listaPersonas', (lista) => {
    console.log(lista);
})

//mensaje privado accion de escuchar del cliente

socket.on('mensajePrivado', ( mensaje ) => {

    console.log('Mensaje Privados', mensaje);
});