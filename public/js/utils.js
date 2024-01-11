// OBTENER LOS CAMPOS DE UN FORMULARIO
function getFormValues(formulario) {
    return Object.fromEntries(
        // creamos un nuevo formulario
        new FormData(formulario),
    );
}