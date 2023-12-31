// ====== SELECTORES =====
const categorys = document.querySelector('#categorys');
const highlights = document.querySelector('#highlightLink');
const btnCreateProduct = document.querySelector('#btnCreateProduct');
const btnCategoris = document.querySelector('#btnCategoris');
const exitButton = document.querySelector('.exitButton');
const labelFile = document.querySelector('#inputLabel');
const dropArea = document.querySelector('#dropArea');
const save = document.querySelector('#save');
/*const saveBtn = document.querySelector('#'); */
const inputPrice = document.querySelector('input[name="price"]');
const uploadImgs = document.querySelector('#uploadImgs');

// ==== SECCIONES ====
const seccionProductos = document.querySelector('#Productos');
const seccionCategorys = document.querySelector('#Categorias');

// ===== EVENTOS =====
btnCreateProduct.addEventListener('click', openModal);
btnCategoris.addEventListener('click', openModal);
exitButton.addEventListener('click', closeModal);
labelFile.addEventListener('click', fileHandler);
categorys.addEventListener('click', handlerSecction);
save.addEventListener('click', saveBtn);
inputPrice.addEventListener('input', handlerIntField);
uploadImgs.addEventListener('click', async ()=> {
    event.preventDefault();

    let inputFile = document.querySelector("#inputFile");

    // Crea un objeto FormData y agrega el archivo al formulario
    const formData = new FormData();
    formData.append('imagen', inputFile.files);


    console.log(formData.get('imagen'))

    let datos = await fetch('/upload-image', {
        method: 'POST',
        body: formData,
    });

    // Recepción de la respuesta
    let response = await datos.json();

})

// ===== DRAG AND DROP =====
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();

    const present = document.querySelector('#present');
    const upload = document.querySelector('#upload');

    present.classList.add('hidden');
    upload.classList.remove('hidden');
});

dropArea.addEventListener('dragleave', (event) => {
    const present = document.querySelector('#present');
    const upload = document.querySelector('#upload');

    present.classList.remove('hidden');
    upload.classList.add('hidden');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();

    const present = document.querySelector('#present');
    const upload = document.querySelector('#upload');

    present.classList.remove('hidden');
    upload.classList.add('hidden');

    createPreviwCard(event.dataTransfer.files);
});

// ===== FUNCIONES =====

// APERTURA DEL MODAL
function openModal(event) {
    event.preventDefault();
    console.log('Se clickeo para aperturar el modal');

    const modal = document.querySelector('#modal');
    console.log(modal.children)
    modal.classList.remove('hidden')
    modal.children.classList.remove('hidden')
    modal.children.children.classList.remove('hidden')

/*const modalContent = modal.children[0].children[1];

for (seccion of modalContent.children) {
    seccion.getAttribute("data-modal") ==
    event.target.parentElement.parentElement.getAttribute("data-origin")
        ? seccion.classList.remove("hidden")
        : seccion.classList.add("hidden");
}

modalContent.classList.remove("hidden");
// modalHeader.classList.remove('hidden')
modal.classList.remove("hidden");*/
}

// CIERRE DE MODAL
function closeModal(event) {
    event.preventDefault();
    event.stopPropagation();

    const modal = document.querySelector('#modal');

    event.target.parentElement.parentElement.parentElement.parentElement.classList.add(
        'hidden',
    );
    modal.classList.add('hidden');
}

// MANEJADOR DEL CAMPO DE INGRESAR ARCHIVOS
function fileHandler(event) {
    const input = document.querySelector('#inputFile');
    input.click();
}

// Función que crea las tarjetas de los productos en el contenedor de productos
function createProductTemplate(data) {}

// FUNCIÓN PARA MANEJAR LA VALIDACIÓN DINAMICA DE CAMPOS CON NÚMEROS
function handlerIntField(event) {
    event.preventDefault();

    const regex = /^[0-9]+$/;
    const fieldValid = regex.test(event.target.value.trim());

    !fieldValid
        ? event.target.parentElement
              .querySelector('.errorMessage')
              .classList.remove('hidden')
        : event.target.parentElement
              .querySelector('.errorMessage')
              .classList.add('hidden');
}

// CREACIÓN DE LAS TARJETAS PARA DROP FILES
async function createPreviwCard(files) {
    const boxImgs = document.querySelector('#boxImgs');
    boxImgs.classList.remove('hidden');

    for (file of files) {
        const box = document.createElement('div');
        box.classList.add('border', 'rounded-lg', 'bg-blue-500');
        const img = document.createElement('img');
        img.classList.add('w-[100px]', 'h-[100px]', 'object-fit-cover');

        await readFiles(file, img);

        box.appendChild(img);
        boxImgs.appendChild(box);
    }
}

// LECTURA DE LOS ARCHIVOS
async function readFiles(file, img) {
    reader = new FileReader();
    reader.onload = await function () {
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

// CAMBIO DE SECCIONES
function handlerSecction(event) {
    if (event.target.id === 'categorys') {
        seccionProductos.classList.add('hidden');
        seccionCategorys.classList.remove('hidden');
    } else {
        seccionCategorys.classList.add('hidden');
        seccionProductos.classList.remove('hidden');
    }
}

// GUARDADO Y ENVIO DE LA INFORMACIÓN
async function saveBtn(event) {
    event.preventDefault();

    // Evaluar cual sección es la que hay que guardar
    let secciones =
        event.target.parentElement.parentElement.children[1].children;
    let url;
    let location;
    let valores;

    // Obtener la información de la sección correspondiente
    for (seccion of secciones) {
        if (!seccion.classList.contains('hidden')) {
            location = seccion.id;
            valores = getFormValues(seccion.children[0].children[0]);
        }
    }

    // Validar de que sección viene la data para armar el endpoint
    // a donde se enviará la información
    location == 'ModalProductos'
        ? (url = '/add/product')
        : (url = '/add/category');

    // Envio de los valores
    let datos = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(valores),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    // Recepción de la respuesta
    let response = await datos.json();

    // Verificar la respuesta del backend
    if (response.success) {
        $.growl.notice({ title: 'INFORMACIÓN', message: response.message });
        const formulario = document.querySelector(".ProductosForm");
        formulario.reset()
    } else {
        $.growl.error({ title: 'ERROR', message: response.message });
    }
}

// OBTENER LOS CAMPOS DE UN FORMULARIO
function getFormValues(formulario) {
    return Object.fromEntries(
        // creamos un nuevo formulario
        new FormData(formulario),
    );
}
