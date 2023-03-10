


class Usuarios  {
    //inicializar en el constructor el arreglo de personas
    constructor() {
         this.personas = [];
    }
    //metodos
    agregarPersona(id, nombre, sala) {

        let persona = {
            id, 
            nombre,
            sala 
        }
        //agregar persona
        this.personas.push(persona);

        return this.personas;
    }

    getPersona( id ) {
        let persona = this.personas.filter( persona => persona.id === id)[0]; // nos devuelve un unico registro [0]
        
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasSalas( sala ) {
        //
        let personaSalas = this.personas.filter( persona => persona.sala === sala);
            return personaSalas;
        ;
    }

    borrarPersona( id ) {

        let personaBorrada = this.getPersona(id);
        //Devuelve solo las personas que quedan activas
        this.personas = this.personas.filter( persona => persona.id != id);

        return personaBorrada;
    }
}







module.exports = {
    Usuarios
}