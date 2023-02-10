const { io } = require('../server');
const { Usuarios } = require('../class/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    
    client.on('entrarChat', (data, callback) => {

       if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasSalas(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } unió`));

        callback(usuarios.getPersonasSalas(data.sala));

    });

    client.on('crearMensaje', ( data ) => {

        let persona = usuarios.getPersona(client.id );
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje );
    })


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada } salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasSalas(personaBorrada.sala)); 

    });

    //mensaje privado, lo que hara el servidor cuando se quiere mandar a alguien
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona( client.id);
        //.to(data.para) envia a un usuario en especifico 
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ));
         
    });
});