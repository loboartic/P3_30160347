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


// ================= EVENTOS =================
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
            return toastr.warning('El campo tiene un valor vacío');
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
            const card = await createProductCard(data.data);
            document.querySelector('#productosContainer').appendChild(card);
            return toastr.success(data.msg);
        }
    } catch (error) {
        return toastr.error('Ocurrio un error al enviar los datos');
    }
});

imagesPreview.addEventListener('drop', handleDrop);
imagesPreview.addEventListener('dragover', handleDragOver);

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
