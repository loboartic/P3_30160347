const btnOpenModalProduct = document.querySelector('#btnCreateProduct');
const btnCloseModalProduct = document.querySelector('#btnCloseModalProduct');
const btnSaveProduct = document.querySelector('#btnSaveProduct');
const deleteProduct = document.querySelectorAll('#deleteProduct');
const viewProduct = document.querySelectorAll('#viewProduct');
const selectCategories = document.querySelector('#selectCategories');
const dropArea = document.querySelector('#dropArea');
const productOptions = document.querySelectorAll('#productOptions');
const btnFiles = document.querySelector('#btnFiles');

const images = document.querySelectorAll('.img-draggable');

/**
 *
 * Funciones
 *
 * */

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropArea.addEventListener('drop', async (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    const validateFIles = Array.from(files);

    // Verificar que el archivo no pase de 1 mega de tamaño
    const result = await validateFileSize(validateFIles, 1000000);

    if (!result) {
        toastr.warning('Un archivo supera el tamaño permitido', 'ADVERTENCIA');
        return;
    }

    // Toma del selector
    const inputFiles = document.querySelector('#files');
    // Asignar los archivos al input
    inputFiles.files = files;

    // Asignar producto a la caja de imagenes
    const boxPreviewImgs = document.querySelector('#boxPreviewImgs');
    // Eliminar la clase 'hidden' del contenedor
    boxPreviewImgs.classList.contains('hidden')
        ? boxPreviewImgs.classList.remove('hidden')
        : null;

    // Validar la longitud de todos los archivos
    await createFileList(files, boxPreviewImgs.querySelector('#imagesPreview'));
});

// Funcion para crear las tarjetas dentro de la imagenes
// files -> lista de archivos para usar la imagen a crear
// nodo -> donde se insertaran las imagenes
function createFileList(files, nodo) {
    // Limpiamos la caja donde se insertarán las tarjetas
    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }

    for (const file of files) {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = this.result;
            img.setAttribute('draggable', true);
            img.setAttribute('data-name', file.name);
            img.classList.add(
                'w-20',
                'h-20',
                'object-cover',
                'rounded',
                'shadow',
                'border',
                'border-neutral-400',
                'img-draggable',
            );
            img.setAttribute('loading', 'lazy');

            div.appendChild(img);

            const circleBtn = document.createElement('div');
            circleBtn.classList.add('circle-btn', 'shadow', 'bg-sky-700');
            circleBtn.textContent = 'x';
            div.appendChild(circleBtn);
            nodo.appendChild(div);
        };
        fileReader.readAsDataURL(file);
    }
}

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

        toastr.success('El producto se ha eliminado correctamente');
        return;
    } else {
        toastr.error(resultado.msg);
        return;
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

async function handlerProductOptions(event) {
    event.preventDefault();
    console.log(
        event.target.parentElement.children[1].classList.toggle('hidden'),
    );
}
// Función para cargar las categorías
async function loadCategories() {
    const sendValues = await fetch('/category/get-all-categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await sendValues.json();
    console.log(data);

    let nodo = document.querySelector('#selectCategories');
    await createOptions(data.data, nodo);
}

/**
 *
 *   Modal Handlers
 *
 * */
btnOpenModalProduct.addEventListener('click', (event) => {
    event.preventDefault();

    const backgroundModal = document.querySelector('#backgroundModal');

    backgroundModal.classList.remove('hidden');
    console.log('Ha aparecido el modal');
    // Llamada inicial para cargar las categorías
    loadCategories();
});

btnCloseModalProduct.addEventListener('click', () => {
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
btnSaveProduct.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Formulario
    const form = document.querySelector('#formProduct');

    // Obtenció de los datos del formulario de productos
    const valuesForm = getFormValues(form);

    // Verifica que exista un campo con un valor vacio
    if (Object.values(valuesForm).includes('')) {
        toastr.warning('El campo tiene un valor vácio');
        return;
    }

    const sendValues = await fetch('/product/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: valuesForm,
    });

    const data = await sendValues.json();
    console.log(data);
    if (data.error) {
        toastr.error(data.msg);
        return
    } else {
        toastr.success(data.msg);
        return
    }
    /*form.submit();*/
});

deleteProduct.forEach((boton) => {
    boton.addEventListener('click', handlerDeleteProduct);
});

productOptions.forEach((boton) => {
    boton.addEventListener('click', handlerProductOptions);
});

viewProduct.forEach((boton) => {
    boton.addEventListener('click', handlerViewProduct);
});

images.forEach((image) => {
    // Manejadores de imagenes en caida
    image.addEventListener('dragstart', handleDrag);
});

function handleDrag(event) {
    console.log('Un elemento se mueve');
    event.dataTransfer.setData(
        'text/plain',
        event.currentTarget.getAttribute('data-name'),
    );
    event.currentTarget.style.backgroundColor = 'gray';
    event.currentTarget.style.border = '3px solid red';
}

function handleDragOver(event) {
    event.preventDefault();
    console.log('Un elemento encima');
}

function handleDrop(event) {
    event.preventDefault();
    console.log('Un elemento cayo');
    console.log(event.dataTransfer.getData('text'));
    const ide = event.dataTransfer.getData('text');
    const draggableElement = document.querySelector(`img[data-name=${ide}]`);
    const dropZone = event.target;
    dropZone.appendChild(draggableElement);
}

const imagesPreview = document.querySelector('#imagesPreview');

imagesPreview.addEventListener('dragover', handleDragOver);
imagesPreview.addEventListener('drop', handleDrop);

// Evento change para el select
selectCategories.addEventListener('change', async (event) => {
    event.preventDefault();

    const selectedCategoryId = event.target.value;

    // Cada ves que la categoria cambie
    loadCategories();
});

btnFiles.addEventListener('click', () => {
    const inputFiles = document.querySelector('#files');
    inputFiles.click();
});

function createOptions(data, nodo) {
    console.log('Limpiando Nodos...');
    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
    console.log('Nodos Limpiados');
    for (value of data) {
        const option = document.createElement('OPTION');
        option.value = value.id;
        option.textContent = value.name;
        nodo.appendChild(option);
    }
}

function cardImagesPreview(files, nodo) {
    const container = document.createElement('DIV');
    const img = document.createElement('IMG');
}
