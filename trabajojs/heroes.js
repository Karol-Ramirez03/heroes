const botonagregar = document.querySelector('.agregar')
const datosMostradosDiv = document.querySelector('.contenedor_heroe')
const marvel = []
const form = document.querySelector('.contenedor_input form');

botonagregar.addEventListener('click', (e) => {
    e.preventDefault()
    let nombreheroe = document.getElementById('nombre_heroe').value;
    let edad = document.getElementById('edad').value;
    let codeName = document.getElementById('code_name').value;
    let longitud = document.getElementById('longitud').value;
    let latitud = document.getElementById('latitud').value;
    let trajes = []
    let trajesInputs = document.querySelectorAll('input[name="suit"]');
    trajesInputs.forEach(function(trajeInput) {
        if (trajeInput.value.trim() !== '') {
            trajes.push(trajeInput.value);
        }
    })
    let imagenInput = document.getElementById('imagen');
    let imagen = imagenInput.files.length > 0 ? URL.createObjectURL(imagenInput.files[0]) : '';

    let nuevoheroe ={
        nombre : nombreheroe,
        edad : edad,
        codename : codeName,
        posicion : {
            longitud : longitud,
            latitud : latitud,  
        },
        suits : trajes,
        imagen : imagen,
    }
    
    marvel.push(nuevoheroe)
    document.getElementById('nombre_heroe').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('code_name').value = '';
    document.getElementById('longitud').value = '';
    document.getElementById('latitud').value = '';
    document.getElementById('imagen').value = ''; 
    trajesInputs.forEach((e) => {
        e.value = '';
    });
    mostrarHeroes()
})




function mostrarHeroes() {
    datosMostradosDiv.innerHTML = ''; // Limpiar el contenedor

    marvel.forEach( (heroe) => {
        let divheroe = document.createElement('div')
        divheroe.className = 'div_heroe'
        divheroe.innerHTML = `
            <button class='eliminar'>x</button> 
            <p>Nombre: ${heroe.nombre}</p>
            <p>Edad: ${heroe.edad}</p>
            <p>Code Name: ${heroe.codename}</p>
            <p>Trajes: ${heroe.suits.join(', ')}</p>
            <p>Posición: Longitud - ${heroe.posicion.longitud}, Latitud - ${heroe.posicion.latitud}</p>
        `;

        // Crear y agregar la imagen
        var imagenHeroe = document.createElement('img');
        imagenHeroe.src = heroe.imagen;
        divheroe.appendChild(imagenHeroe);

        datosMostradosDiv.appendChild(divheroe);
    });   
    document.querySelectorAll('.eliminar').forEach((button, index) => {
        button.addEventListener('click', () => {
            marvel.splice(index, 1);
            mostrarHeroes(); 
        });
    });
}


//agrega cuadro de traje 

document.querySelector('.mas').addEventListener('click', (e) => {
    let contenedorTrajes = document.querySelector('label[for="suit"]');
    let nuevoInput = document.createElement('input');
    nuevoInput.type = 'text';
    nuevoInput.name = 'suit';
    nuevoInput.placeholder = 'traje';
    nuevoInput.className = 'datos';
    contenedorTrajes.appendChild(nuevoInput);
    e.preventDefault()
});


//eliminar cuadro de traaje 

document.querySelector('.menos').addEventListener('click', (e) => {
    let contenedorTrajes = document.querySelector('label[for="suit"]');
    let inputs = contenedorTrajes.querySelectorAll('input[name="suit"]');
    if (inputs.length > 1) {
        contenedorTrajes.removeChild(inputs[inputs.length - 1]);
    }
    e.preventDefault()
})


