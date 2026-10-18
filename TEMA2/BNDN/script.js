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



/////////////////////////////////////////////////////////////
// Aquí continuaré con la extensión del Ejercicio 1 - Tema 2
/////////////////////////////////////////////////////////////

///////////////////////////
// MOSTRAR RESULTADO
///////////////////////////

// Con esto, voy a recoger los tres datos que voy a necesitar
// Más adelante en el ejercicio
const resultado = document.getElementById("resultado");
const selectTrimestre = document.getElementById("select-trimestre");
const inputBuscar = document.getElementById("buscar-nombre");

// Con esta función aplicaré en el texto la cantidad de alumnos que hay
// aprobados con respecto a la cantidad de alumnos que hay en total
function mostrarResultado(texto) {
  resultado.textContent = texto;
}

// Creo una constante que será el numero de aprobados
// Con ".filter" filtraré los alumnos que tienen una
// media de 5 o más.
function contarAprobados() {
  const aprobados = alumnos.filter(alumno => calcularMedia(alumno.notas) >= 5);
  mostrarResultado(`Aprobados: ${aprobados.length} de ${alumnos.length}`);
}



///////////////////////////
// MEJOR NOTA
///////////////////////////

// Defino las variables que recogerán la mejor nota
// Y el nombre del alumno con la mejor nota
function mejorNota() {
  let mejor = -1;
  let nombreMejor = "";

  alumnos.forEach(alumno => {
    alumnos.notas.forEach(nota => {
      if (nota > mejor) {
        mejor = nota;
        nombreMejor = alumno.nombre;
      }
    })
  });

    mostrarResultado(`Mejor nota de la clase: ${mejor} (${nombreMejor})`);
}



///////////////////////////
// MEDIA DEL TRIMESTRE
///////////////////////////

function mediaTrimestre(){
  // Defino una constante para saber de qué trimestre
  // quiero hacer la media
  const posicion = parseInt(selectTrimestre.value);

  // Uso un for each para sumar todas las notas de ese trimestre
  // y luego poder hacer la media de estos
  let suma = 0;
  alumnos.forEach(alumno => {
    suma += alumno.notas[posicion];
  });

  const media = suma / alumnos.length;
  const textoTrimestre = selectTrimestre.options[selectTrimestre.selectedIndex].text;
  
  mostrarResultado(`Media del ${textoTrimestre}: ${media.toFixed(2)}`);
}



///////////////////////////
// BUSCAR ALUMNO
///////////////////////////

function buscarAlumno() {
  // Con esto, recogemos el nombre que se ha introducido
  // En el apartado de "Buscar alumno" en la última sección
  const nombreBuscado = inputBuscar.value.trim().toLowerCase();

  // Si el nombre es vacío, nos salimos directamente
  if (nombreBuscado === "") {
    return;
  }

  // Con esto encuentro la posicion del alumno en la tabla
  const posicionAlumno = alumnos.findIndex(
    alumno => alumno.nombre.toLowerCase() === nombreBuscado
  );

  // Si la posición es negativa, nos salimos directamente
  if (posicionAlumno === -1) {
    mostrarResultado("No se ha encontrado a ningún alumno con ese nombre.");
    return;
  }

  const alumno = alumnos[posicionAlumno];
  const media = calcularMedia(alumno.notas);

  mostrarResultado(
    `${alumno.nombre} está en la posición ${posicionAlumno}\n` +
    `Notas: ${alumno.notas.join(", ")}\n` +
    `Media: ${media.toFixed(2)} (${obtenerCalificacion(media)})`
  );
  
}


document.getElementById("btn-aprobados").addEventListener("click", contarAprobados);
document.getElementById("btn-mejor").addEventListener("click", mejorNota);
document.getElementById("btn-media-trim").addEventListener("click", mediaTrimestre);
document.getElementById("btn-buscar").addEventListener("click", buscarAlumno);

