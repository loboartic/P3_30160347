console.log("El script fue importado");

// ====== SELECTORES =====
const categorys = document.querySelector("#categorysLink");
const highlights = document.querySelector("#highlightLink");
const btnCreateProduct = document.querySelector("#btnCreateProduct");
const exitButton = document.querySelector("#exitButton");

console.log(categorys)
console.log(highlights)

btnCreateProduct.addEventListener('click', openModal);
exitButton.addEventListener('click', closeModal);

// Función para crear el producto
function openModal(event) {
    event.preventDefault();
    console.log("Se clickeo para aperturar el modal")
    const modal = document.querySelector("#modal");
    modal.classList.remove('hidden')
}

function closeModal(event) {
    event.preventDefault();
    console.log("Se clickeo para cerrar el modal")
    const modal = document.querySelector("#modal");
    modal.classList.add('hidden')
}


// Función que crea las tarjetas de los productos en el contenedor de productos
function createProductTemplate( data ) {

}