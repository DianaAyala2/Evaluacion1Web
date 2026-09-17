// Función para validar que el dato sea un string y no esté vacío
const validarCadena = (valor) => {

    // Verificamos que el dato recibido sea de tipo string
    // y que después de quitar los espacios con trim()
    // todavía tenga contenido
    if (typeof valor === 'string' && valor.trim().length > 0) {

        // Si cumple ambas condiciones, la cadena es válida
        return true;
    }

    // Si no es un string o está vacío, devolvemos false
    return false;
};


// Exportamos la función para poder utilizarla
// desde otros archivos del proyecto
module.exports = {
    validarCadena
};