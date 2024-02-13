// =========== SELECTORES GLOBALES ================
const btnOpenModalProduct = document.querySelector('#btnCreateProduct');
const btnCloseModalProduct = document.querySelector('#btnCloseModalProduct');
const btnSaveProduct = document.querySelector('#btnSaveProduct');
const deleteProduct = document.querySelectorAll('#deleteProduct');
const viewProduct = document.querySelectorAll('#viewProduct');
const selectCategories = document.querySelector('#selectCategories');
const dropArea = document.querySelector('#dropArea');
const productOptions = document.querySelectorAll('#productOptions');
const btnFiles = document.querySelector('#btnFiles');
const imagesPreview = document.querySelector('#imagesPreview');
const images = document.querySelectorAll('.img-draggable');
const confi = document.querySelectorAll('.configurator');

/*tippy('[data-tippy-content]', {
    theme: 'light',
    animation: 'scale',
});*/

tippy(confi, {
    content: `
    <div class="flex flex-row">
        <button class="btn btn-secundary" id="viewProduct">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        </button>
        <button class="btn btn-secundary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
        </button>
        <button class="btn btn-secundary">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
</button>
    <div>
    `,
    interactive: true,
    allowHTML: true,
    theme: 'light',
    animation: 'scale',
});
// Configuración de SweetAlert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

// ================= EVENTOS =================
btnOpenModalProduct.addEventListener('click', (event) => {
    event.preventDefault();

    const backgroundModal = document.querySelector('#backgroundModal');

    backgroundModal.classList.remove('hidden');
    // Llamada inicial para cargar las categorías
    loadCategories();
});

btnCloseModalProduct.addEventListener('click', () => {
    event.preventDefault();

    const backgroundModal = document.querySelector('#backgroundModal');
    backgroundModal.classList.add('hidden');
});

btnSaveProduct.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        // Formulario
        const form = document.querySelector('#formProduct');

        // Obtención de los datos del formulario de productos
        const formData = new FormData(form);

        console.log(Object.fromEntries(formData));

        // Verifica que exista un campo con un valor vacío
        if (Array.from(formData.values()).includes('')) {
            return Toast.fire({
                icon: 'warning',
                title: 'Hay campos vácios',
            });
        }

        // Envio de infomación para añadir un producto
        const sendValues = await fetch('/product/add', {
            method: 'POST',
            body: formData,
        });

        // Receción de los datos para su visualización
        const data = await sendValues.json();

        if (data.error === true) {
            return toastr.error(data.msg);
        } else {
            // Creamos la tarjeta
            const card = await createProductCard(data.data);
            document.querySelector('#productosContainer').appendChild(card);
            // Cerramos el modal
            const backgroundModal = document.querySelector('#backgroundModal');
            backgroundModal.classList.add('hidden');

            // Mostrar al usuario lo que se hizo
            return Toast.fire({
                icon: 'success',
                title: `El producto ${data.data.name} ha sido creado con exito`,
            });
        }
    } catch (error) {
        return Toast.fire({
            icon: 'error',
            title: `Ocurrio un error creando el producto`,
        });
    }
});

imagesPreview.addEventListener('drop', handleDrop);
imagesPreview.addEventListener('dragover', handleDragOver);

selectCategories.addEventListener('change', async (event) => {
    event.preventDefault();

    const selectedCategoryId = event.target.value;
});

btnFiles.addEventListener('click', () => {
    const inputFiles = document.querySelector('#files');
    inputFiles.click();
});

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

function createOptions(data, nodo) {
    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }

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

function createProductCard(productData) {
    const { id, name, price, images } = productData;

    // Crear contenedor principal
    const container = document.createElement('div');
    container.classList.add(
        'bg-white',
        'rounded-md',
        'shadow',
        'w-48',
        'text-center',
        'border',
        'border-gray-300',
    );
    container.dataset.id = id;

    // Crear imagen del producto
    const image = document.createElement('img');
    image.src =
        images.length > 0
            ? `/uploads/${images[0].filename}`
            : '/img/default-image.png';
    image.alt = 'Product Image';
    image.loading = 'lazy';
    image.classList.add('mb-2', 'rounded-md', 'w-full', 'h-25', 'object-cover');
    container.appendChild(image);

    // Crear nombre del producto
    const productName = document.createElement('h2');
    productName.textContent = name;
    productName.classList.add('text-md', 'font-semibold', 'mb-2', 'mt-2');
    container.appendChild(productName);

    // Crear precio y stock
    const priceStock = document.createElement('div');
    priceStock.classList.add('mb-2', 'text-sm', 'mb-2', 'mt-2');

    const priceParagraph = document.createElement('p');
    priceParagraph.textContent = `Precio: ${price}$`;
    priceParagraph.classList.add('text-gray-600');
    priceStock.appendChild(priceParagraph);

    // Puedes agregar el elemento de stock si es necesario
    container.appendChild(priceStock);

    // Crear botón con tooltip
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('relative', 'inline-block', 'mb-2');

    const tooltipButton = document.createElement('button');
    tooltipButton.id = 'productOptions';
    tooltipButton.textContent = 'Opciones';
    tooltipButton.classList.add(
        'bg-sky-500',
        'text-white',
        'py-2',
        'px-4',
        'rounded',
    );
    buttonContainer.appendChild(tooltipButton);

    const tooltip = document.createElement('div');
    tooltip.classList.add(
        'absolute',
        'hidden',
        'bg-white',
        'p-2',
        'rounded-md',
        'shadow-md',
        'mt-2',
        'text-left',
        'border',
        'border-gray-300',
    );

    // Crear opciones de la tooltip
    const viewProductButton = createTooltipButton('viewProduct', 'Ver');
    const editProductButton = createTooltipButton('editProduct', 'Editar');
    const deleteProductButton = createTooltipButton(
        'deleteProduct',
        'Eliminar',
    );

    tooltip.appendChild(viewProductButton);
    tooltip.appendChild(editProductButton);
    tooltip.appendChild(deleteProductButton);

    buttonContainer.appendChild(tooltip);

    container.appendChild(buttonContainer);

    return container;
}

function createTooltipButton(id, text) {
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    button.classList.add('flex', 'items-center', 'space-x-2');
    button.addEventListener('click', () => {
        // Agregar la lógica del botón si es necesario
    });
    return button;
}

function handleDrag(event) {
    event.dataTransfer.setData(
        'text/plain',
        event.currentTarget.getAttribute('data-name'),
    );
    event.currentTarget.style.backgroundColor = 'gray';
    event.currentTarget.style.border = '3px solid red';
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const ide = event.dataTransfer.getData('text');
    const draggableElement = document.querySelector(`img[data-name=${ide}]`);
    const dropZone = event.target;
    dropZone.appendChild(draggableElement);
}

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
        return Toast.fire({
            icon: 'error',
            title: 'El archivo supera el tamaño permitido',
        });
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

    // Verifica que no haya error
    if (!resultado.error) {
        console.log('El producto se elimino correctamente');

        // Eliminar del DOM el elemento
        event.target.parentElement.parentElement.parentElement.remove();

        return Toast.fire({
            icon: 'success',
            title: `El producto ha sido eliminado exitosamente`,
        });
    } else {
        return Toast.fire({
            icon: 'error',
            title: `${resultado.msg}`,
        });
    }
}

async function handlerViewProduct(event) {
    event.preventDefault();

    let productToView =
        event.target.parentElement.parentElement.parentElement.getAttribute(
            'data-id',
        );

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

    let nodo = document.querySelector('#selectCategories');
    await createOptions(data.data, nodo);
}

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
