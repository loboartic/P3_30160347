console.log("El script fue importado");

// ====== SELECTORES =====
const categorys = document.querySelector("#categorys");
const highlights = document.querySelector("#highlightLink");
const btnCreateProduct = document.querySelector("#btnCreateProduct");
const btnCategoris = document.querySelector("#btnCategoris");
const exitButton = document.querySelector(".exitButton");
const labelFile = document.querySelector('#inputLabel');
const dropArea = document.querySelector('#dropArea');


// ==== SECCIONES ====
const seccionProductos = document.querySelector('#Productos');
const seccionCategorys = document.querySelector('#Categorias')

// ===== EVENTOS =====
btnCreateProduct.addEventListener('click', openModal);
btnCategoris.addEventListener('click', openModal)
exitButton.addEventListener('click', closeModal);
labelFile.addEventListener('click', fileHandler);
dropArea.addEventListener('dragover', (event)=>{
    event.preventDefault();
    console.log("Hay un elemento encima");
})
dropArea.addEventListener('drop', (event)=>{
    event.preventDefault();
    console.log("Un elemento ha caido");
    console.log(event.dataTransfer.files);

    createPreviwCard(event.dataTransfer.files)
})

categorys.addEventListener('click', handlerSecction)

// ===== FUNCIONES =====

// Función para crear el producto
function openModal( event ) {
    event.preventDefault();
    console.log("Se clickeo para aperturar el modal")

    const modal = document.querySelector("#modal");
    // const modalHeader = document.querySelector("#modal").children[0];
    const modalContent = modal.children[0].children[1];


    for (seccion of modalContent.children) {
        seccion.getAttribute('data-modal') == event.target.parentElement.getAttribute('data-origin') ? seccion.classList.remove('hidden'):seccion.classList.add('hidden');
    }

    modalContent.classList.remove('hidden')
    // modalHeader.classList.remove('hidden')
    modal.classList.remove('hidden')
}

function closeModal( event ) {
    event.preventDefault();

    const modal = document.querySelector("#modal");

    event.target.parentElement.parentElement.parentElement.parentElement.classList.add('hidden');
    modal.classList.add('hidden')
}

function fileHandler( event ) {
    const input = document.querySelector('#inputFile');
    input.click();
}

// Función que crea las tarjetas de los productos en el contenedor de productos
function createProductTemplate( data ) {

}

function createPreviwCard( files ) {
    const boxImgs = document.querySelector('#boxImgs');
    boxImgs.classList.remove('hidden');

    for (file of files) {
        const box = document.createElement('div');
        box.classList.add('border', 'rounded-lg', 'bg-blue-500')
        box.textContent = file.name;

        boxImgs.appendChild(box);
    };
}

function handlerSecction( event ) {
    if ( event.target.id === 'categorys') {
        seccionProductos.classList.add('hidden');

        seccionCategorys.classList.remove('hidden');
        // seccionCategorys.classList.add('')
    }
}