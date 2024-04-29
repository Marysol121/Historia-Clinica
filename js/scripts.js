

function mostrarFoto() {
    const input = document.getElementById('fotoInput');
    const preview = document.getElementById('fotoPreview');
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // fecha y hora de nacimiento
    var fechaNacimientoInput = document.getElementById("fechaNacimiento");
    var horaNacimientoInput = document.getElementById("horaNacimiento");

    // Agregar evento input a ambos campos
    fechaNacimientoInput.addEventListener("input", calcularEdad);
    horaNacimientoInput.addEventListener("input", calcularEdad);

    function calcularEdad() {
        var fechaNacimiento = new Date(fechaNacimientoInput.value);
        var ahora = new Date();

        var diff = ahora.getTime() - fechaNacimiento.getTime();

        var edadAnios = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        var edadMeses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
        var edadDias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        var edadHoras = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var edadMinutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("edad").textContent = edadAnios + " años, " + edadMeses + " meses, " + edadDias + " días, " + edadHoras + " horas, " + edadMinutos + " minutos";
    }
});

//validar la cédula automáticamente
function validarCedulaAutomaticamente() {
    const cedulaInput = document.getElementById("cedula");
    const cedula = cedulaInput.value;
    if (!validarCedula(cedula)) {
        cedulaInput.style.borderColor = "red";
        mostrarAlerta("Error, cédula inválida");
    } else {
        cedulaInput.style.borderColor = "black";
    }
}

// Función para validar la cédula
function validarCedula(cedula) {
    if (cedula.length !== 10 || isNaN(cedula)) {
        return false;
    }

    const provincia = parseInt(cedula.substring(0, 2));
    if (provincia < 0 || provincia > 24) {
        return false;
    }

    const tercerDigito = parseInt(cedula.charAt(2));
    if (tercerDigito > 5) {
        return false;
    }

    // Calcular el dígito verificador
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < 9; i++) {
        let valor = parseInt(cedula.charAt(i)) * coeficientes[i];
        if (valor >= 10) {
            valor -= 9;
        }
        suma += valor;
    }
    const digitoVerificador = (10 - (suma % 10)) % 10;

    const ultimoDigito = parseInt(cedula.charAt(9));
    return digitoVerificador === ultimoDigito;
}


function mostrarAlerta(mensaje) {
    alert(mensaje);
}

function actualizarCiudades() {
    const paisSeleccionado = document.getElementById("pais").value;
    const ciudadSelect = document.getElementById("ciudad");

    // Limpiar las opciones actuales
    ciudadSelect.innerHTML = "";

    // Añadir opciones de ciudades según el país seleccionado
    switch (paisSeleccionado) {
        case "Ecuador":
            agregarCiudad("Quito", ciudadSelect);
            agregarCiudad("Guayaquil", ciudadSelect);
            break;
        case "Peru":
            agregarCiudad("Lima", ciudadSelect);
            agregarCiudad("Arequipa", ciudadSelect);
            break;
        case "Colombia":
            agregarCiudad("Bogotá", ciudadSelect);
            agregarCiudad("Medellín", ciudadSelect);
            break;
        default:
            agregarCiudad("Primero seleccione un país", ciudadSelect);
    }
}

function agregarCiudad(nombreCiudad, selectElement) {
    const option = document.createElement("option");
    option.text = nombreCiudad;
    selectElement.add(option);
}


// Función para mostrar u ocultar el menú en dispositivos móviles
function toggleMenu() {
    var navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
}

// Función para mostrar u ocultar el formulario según la opción seleccionada en el menú
function mostrarFormulario(formulario, link) {
    // Oculta todos los formularios
    var formularios = document.querySelectorAll('.form');
    formularios.forEach(function (form) {
        form.style.display = 'none';
    });

    // Desactiva todas las opciones del menú
    var links = document.querySelectorAll('.nav-link');
    links.forEach(function (link) {
        link.classList.remove('active');
    });

    // Muestra el formulario correspondiente
    var formMostrar = document.getElementById('form' + formulario.charAt(0).toUpperCase() + formulario.slice(1));
    formMostrar.style.display = 'block';

    // Activa el enlace del menú correspondiente
    link.classList.add('active');
}

var cedulasDisponibles = [];

function cargarCedulas() {
    var selectCedula = document.getElementById("cedula1");

    // Limpiar las opciones anteriores del select
    selectCedula.innerHTML = "";

    // Agregar una opción por cada cédula disponible
    cedulasDisponibles.forEach(function (cedula) {
        var option = document.createElement("option");
        option.value = cedula;
        option.text = cedula;
        selectCedula.appendChild(option);
    });

}

var cedulasDisponibles1 = [];

function cargarCedulas1() {
    var selectCedulaPaciente = document.getElementById("cedulaPaciente");

    // Limpiar las opciones anteriores del select
    selectCedulaPaciente.innerHTML="";

    // Agregar una opción por cada cédula disponible
    cedulasDisponibles1.forEach(function (cedula) {
        var option = document.createElement("option");
        option.value = cedula;
        option.text = cedula;
        selectCedulaPaciente.appendChild(option);
    });

}

function agregarPaciente() {
    const cedula = document.getElementById("cedula").value;
    const nombres = document.getElementById("nombres").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const horaNacimiento = document.getElementById("horaNacimiento").value;
    const edad = document.getElementById("edad").textContent;
    const paisNacimiento = document.getElementById("pais").value;
    const ciudadNacimiento = document.getElementById("ciudad").value;

    const tablaPacientes = document.getElementById("tablaPacientes").getElementsByTagName('tbody')[0];
    const nuevaFila = tablaPacientes.insertRow();

    const celdaCedula = nuevaFila.insertCell(0);
    celdaCedula.textContent = cedula;

    const celdaNombres = nuevaFila.insertCell(1);
    celdaNombres.textContent = nombres;

    const celdaDireccion = nuevaFila.insertCell(2);
    celdaDireccion.textContent = direccion;

    const celdaTelefono = nuevaFila.insertCell(3);
    celdaTelefono.textContent = telefono;

    const celdaFechaNacimiento = nuevaFila.insertCell(4);
    celdaFechaNacimiento.textContent = fechaNacimiento;

    const celdaHoraNacimiento = nuevaFila.insertCell(5);
    celdaHoraNacimiento.textContent = horaNacimiento;

    const celdaEdad = nuevaFila.insertCell(6);
    celdaEdad.textContent = edad;

    const celdaPaisNacimiento = nuevaFila.insertCell(7);
    celdaPaisNacimiento.textContent = paisNacimiento;

    const celdaCiudadNacimiento = nuevaFila.insertCell(8);
    celdaCiudadNacimiento.textContent = ciudadNacimiento;

    // Obtener la cédula del paciente agregado
    var nuevaCedula = document.getElementById("cedula").value;

    // Agregar la nueva cédula al array si no está ya incluida
    if (!cedulasDisponibles.includes(cedula)) {
        cedulasDisponibles.push(cedula);
    }
    if (!cedulasDisponibles1.includes(cedula)) {
        cedulasDisponibles1.push(cedula);
    }

    // Actualizar las opciones del select de cédulas disponibles
    cargarCedulas();
    cargarCedulas1();

}


function agregarConsulta() {
    const cedula = document.getElementById("cedula1").value;
    const fechaConsulta = document.getElementById("fechaConsulta").value;
    const horaConsulta = document.getElementById("horaConsulta").value;

    const tablaConsultas = document.getElementById("tablaConsultas").getElementsByTagName('tbody')[0];
    const nuevaFila = tablaConsultas.insertRow();

    const celdaCedula = nuevaFila.insertCell(0);
    celdaCedula.textContent = cedula;

    const celdaFechaConsulta = nuevaFila.insertCell(1);
    celdaFechaConsulta.textContent = fechaConsulta;

    const celdaHoraConsulta = nuevaFila.insertCell(2);
    celdaHoraConsulta.textContent = horaConsulta;
}

function agregarHijo() {
    const cedulaPaciente = document.getElementById("cedulaPaciente").value;
    const cedulaHijo = document.getElementById("cedulaHijo").value;
    const nombres = document.getElementById("nombres1").value;
    const direccion = document.getElementById("direccion1").value;
    const telefono = document.getElementById("telefono1").value;

    const tablaPacientes = document.getElementById("tablaHijos").getElementsByTagName('tbody')[0];
    const nuevaFila = tablaPacientes.insertRow();

    const celdaCedulaPaciente = nuevaFila.insertCell(0);
    celdaCedulaPaciente.textContent = cedulaPaciente;

    const celdaCedulaHijo = nuevaFila.insertCell(1);
    celdaCedulaHijo.textContent = cedulaHijo;

    const celdaNombres = nuevaFila.insertCell(2);
    celdaNombres.textContent = nombres;

    const celdaDireccion = nuevaFila.insertCell(3);
    celdaDireccion.textContent = direccion;

    const celdaTelefono = nuevaFila.insertCell(4);
    celdaTelefono.textContent = telefono;
}

window.onload = function () {
    // Llamar a una función para cargar las cédulas disponibles
    cargarCedulas();
};
