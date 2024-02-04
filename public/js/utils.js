// Configuración de Toastr
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

// OBTENER LOS CAMPOS DE UN FORMULARIO
function getFormValues(formulario) {
    return Object.fromEntries(
        // creamos un nuevo formulario
        new FormData(formulario),
    );
}

function validateFileSize(files, size) {
    const filesNotValidated = files.filter((file) => file.size >= size);

    if (filesNotValidated.length > 0) {
        return false;
    } else {
        return true;
    }
}
