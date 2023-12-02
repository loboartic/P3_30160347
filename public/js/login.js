let inputMail = document.querySelector('input[name="mail"]');
let inputPassword = document.querySelector('input[name="password"]');
let btnLogin = document.querySelector('#btnLogin');
let formulario = document.querySelector('form');
let passwordView = document.querySelector('#lock');
console.log(passwordView)

campos = {
	mail: '',
	password: '',
};

// ===== FUNCIONES =====

function validarCampos(event) {
	event.preventDefault();

	if (event.target.value.trim() == '') {
		campos[event.target.name] = '';
		return;
	}

	campos[event.target.name] = 'completado';
}

function comprobarEmail() {
	console.log('Comprobando');
}

function mostrarAlerta(mensaje, nodo) {
	let div = document.createElement('DIV');
	let p = document.createElement('P');

	while (nodo.firstChild) {
		nodo.removeChild(nodo.firstChild);
	}

	div.classList.add(
		'w-full',
		'bg-orange-500',
		'rounded-md',
		'border',
		'p-5',
		'text-white',
	);
	p.textContent = mensaje;

	div.appendChild(p);
	nodo.appendChild(div);

	setTimeout(() => {
		div.remove();
	}, 4000);
}

function getFormValues(formulario) {
	return Object.fromEntries(
		// creamos un nuevo formulario
		new FormData(formulario),
	);
}

// ===== EVENTOS =====

formulario.addEventListener('submit', async (event) => {
	event.preventDefault();
	console.log(Object.values(campos).includes(''));

	// Validar campos del formulario
	if (Object.values(campos).includes('')) {
		let box = document.querySelector('#boxMsg');
		mostrarAlerta('Todos los campos deben ser llenados', box);
		return;
	}

	// Tomar datos del formulario
	let data = await getFormValues(formulario);

	console.log(data);

	// Enviar datos al endpoint
	data = await fetch('/login', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	});

	newData = await data;
	console.log(newData);
	window.location.href = newData.url;

	/*if (newData.success) {
		// Enviar formulario
		formulario.submit();
	}*/
});

inputMail.addEventListener('input', validarCampos);
inputPassword.addEventListener('input', validarCampos);
passwordView.addEventListener('click', (event) => {
	event.preventDefault()
	// tomamos el input para hacer el cambio de vicisibilidad
	let input = document.querySelector('input[name="password"]');
	console.log(input)
	input.setAttribute('type', 'text');
})