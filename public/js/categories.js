const btnOpenModalCategories = document.querySelector('#btnCreateCategories');
const btnCloseModalCategories = document.querySelector(
    '#btnCloseModalCategories',
);
const btnSaveCategory = document.querySelector('#btnSaveCategory');
const deleteProduct = document.querySelectorAll('#deleteProduct');
const viewProduct = document.querySelectorAll('#viewProduct');

/**
 *
 * Funciones
 *
 * */
async function handlerDeleteProduct(event) {
    // Funcíon que eliminar un producto
    event.preventDefault();

    // Selecionar el identificador del producto
    let productToDelete =
        event.target.parentElement.parentElement.parentElement.getAttribute(
            'data-id',
        );

    console.log(`El producto a eliminar tiene el ID: ${productToDelete}`);

    let value = {
        id: productToDelete,
    };

    // Envio del producto a eliminar
    let process = await fetch('/product/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    });

    // Procesamos la respuesta
    let resultado = await process.json();

    console.log(resultado);

    // Verifica que no haya error
    if (!resultado.error) {
        console.log('El producto se elimino correctamente');

        // Eliminar del DOM el elemento
        event.target.parentElement.parentElement.parentElement.remove();

        $.growl.notice({
            title: 'Notificación',
            message: resultado.msg,
        });
    } else {
        $.growl.error({
            title: 'Error',
            message: resultado.msg,
        });
    }
}

async function handlerViewProduct(event) {
    event.preventDefault();

    let productToView =
        event.target.parentElement.parentElement.parentElement.getAttribute(
            'data-id',
        );

    console.log(productToView);

    window.location.href = `/product/${productToView}`;
}

/**
 *
 *   Modal Handlers
 *
 * */
btnOpenModalCategories.addEventListener('click', (event) => {
    event.preventDefault();

    const backgroundModal = document.querySelector('#backgroundModal');

    backgroundModal.classList.remove('hidden');
    console.log('Ha aparecido el modal');
});

btnCloseModalCategories.addEventListener('click', () => {
    event.preventDefault();

    const backgroundModal = document.querySelector('#backgroundModal');
    backgroundModal.classList.add('hidden');
    console.log('Se ha cerrado el modal');
});

/**
 *
 *  Form Products
 *
 * */
btnSaveCategory.addEventListener('click', async (event) => {
    event.preventDefault();

// Formulario
    const form = document.querySelector("#formCategories");

    // Octención de los datos del formulario de productos
    const valuesForm = getFormValues(form);

    // Verifica que exista un campo con un valor vacio
    if (Object.values(valuesForm).includes("")) {
        console.log("Un campo tiene un valor vacio");
    }

    const sendValues = await fetch('/category/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( valuesForm ),
    });

    const data = await sendValues.json();

    if (data.error === true) {
        return toastr.error(data.msg);
    } else {
        return toastr.success(data.msg);
    }
});

deleteProduct.forEach((boton) => {
    boton.addEventListener('click', handlerDeleteProduct);
});

viewProduct.forEach((boton) => {
    boton.addEventListener('click', handlerViewProduct);
});
