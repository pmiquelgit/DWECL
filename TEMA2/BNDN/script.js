// Datos iniciales (copia de seguridad para el botón de reset)
const datosIniciales = [
  { nombre: "Ana", notas: [7, 8, 9] },
  { nombre: "Luis", notas: [4, 5, 6] },
  { nombre: "Marta", notas: [3, 4, 2] },
  { nombre: "Pablo", notas: [9, 10, 9] },
  { nombre: "Sara", notas: [5, 4, 6] },
  { nombre: "Lamin", notas: [3, 4, 3] }
];

// Array con el que trabajamos (copia de los datos iniciales)
let alumnos = structuredClone(datosIniciales);

const tbody = document.querySelector("#tabla-notas tbody");
const inputNombre = document.getElementById("nombre");
const inputs = [
  document.getElementById("t1"),
  document.getElementById("t2"),
  document.getElementById("t3")
];
const mensaje = document.getElementById("mensaje");

// Media de un array de notas
function calcularMedia(notas) {
  const suma = notas.reduce((acc, n) => acc + n, 0);
  return suma / notas.length;
}

// Calificación según la media
function obtenerCalificacion(media) {
  if (media < 5) return "Insuficiente";
  if (media < 6) return "Suficiente";
  if (media < 7) return "Bien";
  if (media < 9) return "Notable";
  return "Sobresaliente";
}

// Crea una celda <td> con texto y, opcionalmente, una clase
function crearCelda(texto, clase) {
  const td = document.createElement("td");
  td.textContent = texto;
  if (clase) td.classList.add(clase);
  return td;
}

// Dibuja la tabla entera a partir del array
function pintarTabla() {
  tbody.innerHTML = "";

  alumnos.forEach(alumno => {
    const media = calcularMedia(alumno.notas);
    const fila = document.createElement("tr");

    fila.appendChild(crearCelda(alumno.nombre));

    // Notas de cada trimestre: verde si aprueba, rosa si suspende
    alumno.notas.forEach(nota => {
      fila.appendChild(crearCelda(nota, nota >= 5 ? "aprobado" : "suspenso"));
    });

    fila.appendChild(crearCelda(media.toFixed(2), "media"));
    fila.appendChild(crearCelda(obtenerCalificacion(media)));

    tbody.appendChild(fila);
  });
}

function mostrarMensaje(texto, esError = false) {
  mensaje.textContent = texto;
  mensaje.classList.toggle("error", esError);
}

function anadirAlumno() {
  const nombre = inputNombre.value.trim();
  const notas = inputs.map(input => parseFloat(input.value));

  if (nombre === "") {
    mostrarMensaje("Escribe el nombre del alumno.", true);
    return;
  }

  if (notas.some(n => isNaN(n) || n < 0 || n > 10)) {
    mostrarMensaje("Las notas tienen que ser números entre 0 y 10.", true);
    return;
  }

  alumnos.push({ nombre, notas });
  pintarTabla();
  mostrarMensaje(`Añadido ${nombre}. Ahora hay ${alumnos.length} alumnos.`);

  // Limpiar el formulario
  inputNombre.value = "";
  inputs.forEach(input => (input.value = ""));
  inputNombre.focus();
}

function volverADatosIniciales() {
  alumnos = structuredClone(datosIniciales);
  pintarTabla();
  mostrarMensaje(`Datos iniciales restaurados. Hay ${alumnos.length} alumnos.`);
}

document.getElementById("btn-anadir").addEventListener("click", anadirAlumno);
document.getElementById("btn-reset").addEventListener("click", volverADatosIniciales);

// Primera carga
pintarTabla();
