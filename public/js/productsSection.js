// ============ SELECTORES ============
const sections = document.querySelectorAll('#btnSection');
const createProduct = document.querySelector('#createProduct');
const createCategory = document.querySelector('#btnCreateCategory');
const closeModal = document.querySelector('#btnCloseModal');
const btnSaveInformation = document.querySelector('#btnSaveInformation');

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

// ============ EVENTOS ============

sections.forEach((section) => {
    section.addEventListener('click', (event) => {
        event.preventDefault();
        changeSection(event.target.name);
    });
});

createProduct.addEventListener('click', (event) => {
    event.preventDefault();

    /*handlerModal(
        document.querySelector('#backgroundModal'),
        'create',
        'open',
        'product',
    );*/
    modal = document.querySelector('#backgroundModal');
    modal.setAttribute('data-modal-origin', 'product');
    loadCategories();
    handlerModalNew(
        document.querySelector('#backgroundModal'),
        'CREATE',
        'open',
        '',
        'product',
    );
});

btnSaveInformation.addEventListener('click', handleSubmit);

closeModal.addEventListener('click', (event) => {
    event.preventDefault();

    /*   handlerModal(document.querySelector('#backgroundModal'), 'read', 'close');
     */
    modal = document.querySelector('#backgroundModal');
    console.log(modal.getAttribute('data-modal-origin'));
    handlerModalNew(
        modal,
        '',
        'close',
        '',
        modal.getAttribute('data-modal-origin'),
    );
});

createCategory.addEventListener('click', (event) => {
    event.preventDefault();
    modal = document.querySelector('#backgroundModal');
    modal.setAttribute('data-modal-origin', 'category');
    handlerModalNew(
        document.querySelector('#backgroundModal'),
        'CREATE',
        'open',
        '',
        'category',
    );
});

// ============ FUNCIONES ============
function createProductCard(productData) {
    const { id, name, price, images } = productData;

    // Crear contenedor principal
    const container = document.createElement('div');

    container.classList.add(
        'bg-white',
        'rounded-md',
        'shadow',
        'w-45',
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
    image.classList.add(
        'mb-2',
        'rounded-t-md',
        'w-full',
        'h-25',
        'object-cover',
    );

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

    return container;
}

function createCategoryRow(category) {
    const tr = document.createElement('TR');
    const tdName = document.createElement('TD');
    const tdVoid = document.createElement('TD');
    const tdButtons = document.createElement('TD');

    // Botones
    const btnDelete = document.createElement('BUTTON');
    const btnSave = document.createElement('BUTTON');

    btnDelete.classList.add('btn', 'btn-warning', 'disabled:opacity-75');
    btnDelete.textContent = 'Eliminar';
    btnDelete.disabled = true;
    btnSave.classList.add('btn', 'btn-save', 'disabled:opacity-75');
    btnSave.textContent = 'Editar';
    btnSave.disabled = true;

    tdName.textContent = category.name;
    tdVoid.textContent = '';
    tdButtons.appendChild(btnDelete);
    tdButtons.appendChild(btnSave);
    tr.appendChild(tdName);
    tr.appendChild(tdVoid);
    tr.appendChild(tdButtons);
    tr.classList.add('border-t', 'text-center', 'text-semibold');

    return tr;
}

const MODES = {
    CREATE: {
        showInputs: true,
        showTextarea: true,
    },
    EDIT: {
        showInputs: true,
        showTextarea: true,
    },
    CLOSE: {
        showInputs: false,
        showTextarea: false,
    },
};

function handlerModalNew(nodo, mode, method, activated, origin) {
    const config = MODES.mode;
    const inputs = nodo.querySelectorAll(`[data-origin="${origin}"]`);
    const form = nodo.querySelector('form');

    if (method === 'open') {
        showModal(nodo, inputs);
    } else if (method === 'close') {
        hideModal(nodo, inputs);
    }
}

function showModal(nodo, inputs) {
    nodo.classList.remove('hidden');
    inputs.forEach((input) => input.classList.remove('hidden'));
}

function hideModal(nodo, inputs) {
    nodo.classList.add('hidden');
    inputs.forEach((input) => input.classList.add('hidden'));
}

function changeSection(sectionName) {
    const sections = document.querySelectorAll('main[name]');
    const spinner = document.querySelector('#spinner');

    // Mostrar spinner
    spinner.classList.remove('hidden');

    // Ocultar todas las secciones
    sections.forEach((section) => section.classList.add('hidden'));

    // Mostrar la sección seleccionada
    const selectedSection = document.querySelector(
        `main[name="${sectionName}"]`,
    );
    selectedSection.classList.remove('hidden');

    // Ocultar spinner después de un tiempo
    setTimeout(() => spinner.classList.add('hidden'), 3000);

    console.log(sectionName);
    // Si la sección seleccionada es "products", cargar los productos
    if (sectionName === 'products') {
        loadProducts();
        return;
    } else if (sectionName === 'categories') {
        loadCategoriesSection();
        return;
    }
}

async function loadCategoriesSection() {
    console.log('En categorias');
    const containerProducts = document.querySelector('#category-list');

    // Limpiar el contenedor de productos
    while (containerProducts.firstChild) {
        containerProducts.removeChild(containerProducts.firstChild);
    }

    // Realizar petición al backend
    const sendValues = await fetch('/category/get-all-categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const categoriesList = await sendValues.json();

    console.log(categoriesList);

    // Agregar spiner de carga
    showLoadSpinner(true);

    if (categoriesList.data.length >= 1) {
        // Iteramos todos los poductos
        for (const category of categoriesList.data) {
            const row = createCategoryRow(category);
            containerProducts.appendChild(row);
        }
    }
}

async function loadProducts() {
    const containerProducts = document.querySelector('#containerProducts');

    // Limpiar el contenedor de productos
    while (containerProducts.firstChild) {
        containerProducts.removeChild(containerProducts.firstChild);
    }

    // Realizar petición al backend
    const products = await fetch('/product/all-products', {
        method: 'GET',
    });

    // Agregar spiner de carga
    showLoadSpinner(true);

    listProducts = await products.json();

    if (listProducts.length >= 1) {
        // Iteramos todos los poductos
        for (const product of listProducts) {
            const card = createProductCard(product);
            containerProducts.appendChild(card);
        }
    } else {
        const div = document.createElement('DIV');
        const p = document.createElement('P');
        div.classList.add(
            'border',
            'bg-neutral-100',
            'border-gray-300',
            'py-2',
            'px-4',
            'w-full',
        );
        p.textContent = 'No hay productos que mostrar';

        div.appendChild(p);
        containerProducts.appendChild(div);
    }

    // Remover Spinner de carga
    setTimeout(() => {
        /*document.querySelector('#spinner').classList.add('hidden');*/
        showLoadSpinner(false);
    }, 3000);
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

function handlerFilesDrop() {}

async function handleSubmitProduct(event) {
    event.preventDefault();

    try {
        // Formulario
        const form = document.querySelector('#formProduct');
        const formData = new FormData();

        // Seleccionar campos con el data-origin especificado
        const fieldsNodes = form.querySelectorAll('[data-origin="product"]');

        const fields = Array.from(fieldsNodes);
        // Filtrar campos vacíos
        // const filteredFields = fields.filter(field => field.value !== '');

        // Agregar campos al FormData
        for (const field of fields) {
            if (field.name !== undefined) {
                console.log(field.name);
                formData.append(field.name, field.value);
            }
        }

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
            document.querySelector('#containerProducts').appendChild(card);
            // Cerramos el modal
            const backgroundModal = document.querySelector('#backgroundModal');
            backgroundModal.classList.add('hidden');

            hideModal(backgroundModal, fieldsNodes);

            // Mostrar al usuario lo que se hizo
            return Toast.fire({
                icon: 'success',
                title: `El producto ${data.data.name} ha sido creado con exito`,
            });
        }
    } catch (error) {
        console.log(error);
        return Toast.fire({
            icon: 'error',
            title: `Ocurrio un error creando el producto`,
        });
    }
}

async function handleSubmitCategory(event) {
    try {
        // Formulario
        const form = document.querySelector('#formProduct');
        const formData = new FormData();

        // Seleccionar campos con el data-origin especificado
        const fieldsNodes = form.querySelectorAll('[data-origin="category"]');

        const fields = Array.from(fieldsNodes);

        // Agregar campos al FormData
        for (const field of fields) {
            if (field.name !== undefined) {
                console.log(field.name);
                formData.append(field.name, field.value);
            }
        }

        // Verifica que exista un campo con un valor vacío
        if (Array.from(formData.values()).includes('')) {
            return Toast.fire({
                icon: 'warning',
                title: 'Hay campos vácios',
            });
        }

        console.log(formData)
        const sendValues = await fetch('/category/add', {
            method: 'POST',
            body: formData,
        });

        const data = await sendValues.json();
        console.log(data)

        if (data.error === true) {
            return Toast.fire({
                icon: 'error',
                title: `Ocurrio un error creando la categoria`,
            });
        } else {
            //createCategoryRow(data);
            return Toast.fire({
                icon: 'success',
                title: `La categoria ha sido creada con exito`,
            });
        }
    } catch (error) {
        return Toast.fire({
            icon: 'error',
            title: `Ocurrio un error creando la categoria`,
        });
    }
}
function handleSubmit(event) {
    event.preventDefault();

    const modal = document
        .querySelector('#backgroundModal')
        .getAttribute('data-modal-origin');

    console.log(modal);
    if (modal === 'product') {
        handleSubmitProduct(event);
    }
    if (modal === 'category') {
        handleSubmitCategory(event);
    }
}

function showLoadSpinner(mostrar) {
    if (mostrar) document.querySelector('#spinner').classList.remove('hidden');
    else {
        document.querySelector('#spinner').classList.add('hidden');
    }
}
