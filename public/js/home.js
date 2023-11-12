console.log("El script fue importado");

// ====== SELECTORES =====
const categorys = document.querySelector("#categorys");
const highlights = document.querySelector("#highlightLink");
const btnCreateProduct = document.querySelector("#btnCreateProduct");
const btnCategoris = document.querySelector("#btnCategoris");
const exitButton = document.querySelector(".exitButton");
const labelFile = document.querySelector('#inputLabel');
const dropArea = document.querySelector('#dropArea');
const save = document.querySelector('#save');
/*const saveBtn = document.querySelector('#'); */
const inputPrice = document.querySelector('input[name="price"]');
console.log(inputPrice)


// ==== SECCIONES ====
const seccionProductos = document.querySelector('#Productos');
const seccionCategorys = document.querySelector('#Categorias')

// ===== EVENTOS =====
btnCreateProduct.addEventListener('click', openModal);
btnCategoris.addEventListener('click', openModal)
exitButton.addEventListener('click', closeModal);
labelFile.addEventListener('click', fileHandler);
categorys.addEventListener('click', handlerSecction);
save.addEventListener('click', saveBtn);
inputPrice.addEventListener('input', handlerIntField);

// ===== DRAG AND DROP =====
dropArea.addEventListener('dragover', (event)=>{
    event.preventDefault();

    const present = document.querySelector("#present");
    const upload = document.querySelector("#upload");

    present.classList.add('hidden');
    upload.classList.remove('hidden')

})

dropArea.addEventListener('dragleave', (event)=> {
    const present = document.querySelector("#present");
    const upload = document.querySelector("#upload");

    present.classList.remove('hidden');
    upload.classList.add('hidden');

})

dropArea.addEventListener('drop', (event)=>{
    event.preventDefault();
    
    const present = document.querySelector("#present");
    const upload = document.querySelector("#upload");

    present.classList.remove('hidden');
    upload.classList.add('hidden');


    createPreviwCard(event.dataTransfer.files);
})


// ===== FUNCIONES =====

// Función para crear el producto
function openModal( event ) {
    event.preventDefault();
    console.log("Se clickeo para aperturar el modal")

    const modal = document.querySelector("#modal");

    const modalContent = modal.children[0].children[1];


    for (seccion of modalContent.children) {
        seccion.getAttribute('data-modal') == event.target.parentElement.parentElement.getAttribute('data-origin') ? seccion.classList.remove('hidden'):seccion.classList.add('hidden');
    }

    modalContent.classList.remove('hidden')
    // modalHeader.classList.remove('hidden')
    modal.classList.remove('hidden')
}

function closeModal( event ) {
    event.preventDefault();
    event.stopPropagation();

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

function handlerIntField( event ) {
    event.preventDefault();

    const regex = /^[0-9]+$/;
    const fieldValid = regex.test(event.target.value.trim());

    !fieldValid ? event.target.parentElement.querySelector(".errorMessage").classList.remove('hidden'): event.target.parentElement.querySelector(".errorMessage").classList.add('hidden')
}

async function createPreviwCard( files ) {
    const boxImgs = document.querySelector('#boxImgs');
    boxImgs.classList.remove('hidden');

    for (file of files) {
        const box = document.createElement('div');
        box.classList.add('border', 'rounded-lg', 'bg-blue-500')
        const img = document.createElement('img');
        img.classList.add('w-[100px]', 'h-[100px]', 'object-fit-cover')

        await readFiles(file, img);

        box.appendChild(img)
        boxImgs.appendChild(box);
    };
}

async function readFiles( file, img ){
    reader = new FileReader();
    reader.onload = await function(){
        img.src = reader.result;
    }
    reader.readAsDataURL(file)
}

function handlerSecction( event ) {
    if ( event.target.id === 'categorys') {
        seccionProductos.classList.add('hidden');
        seccionCategorys.classList.remove('hidden');
    } else {
        seccionCategorys.classList.add('hidden');
        seccionProductos.classList.remove('hidden');
    }
}

async function saveBtn( event ) {
    event.preventDefault();

    // Evaluar cual sección es la que hay que guardar
    let secciones = event.target.parentElement.parentElement.children[1].children
    let url;
    let location
    let valores;

    for (seccion of secciones) {
        if ( !seccion.classList.contains('hidden') ) {
            location = seccion.id; 
            valores = getFormValues(seccion.children[0].children[0])
        }
    }

    location == 'ModalProductos' ? url = '/add/product' : url = '/add/category'

    // Envio de los valores
    let datos = await fetch(url, {
            method: "POST",
            body: JSON.stringify(valores),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

    let response = await datos.json();
    if (response.success) {
        $.growl.notice({'title': 'INFORMACIÓN', 'message': response.message})
    }
}

function getFormValues(formulario){
    return Object.fromEntries(
        // creamos un nuevo formulario
        new FormData(formulario)
    )
}