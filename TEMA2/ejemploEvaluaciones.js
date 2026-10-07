// Por aquí pongo la fecha de las evaluaciones
const evaluaciones = new Date(2026, 11, 2);

// Fecha de hoy, con la hora puesta a las 00:00 para contar días completos
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

// Diferencia en milisegundos
const diferencia = evaluaciones - hoy;

// Pasamos de milisegundos a días
const milisegundosPorDia = 1000 * 60 * 60 * 24;
const diasRestantes = Math.round(diferencia / milisegundosPorDia);

if (diasRestantes > 0) {
  console.log("Faltan " + diasRestantes + " días para las evaluaciones.");
} else if (diasRestantes === 0) {
  console.log("¡Las evaluaciones son hoy!");
} else {
  console.log("Las evaluaciones ya pasaron.");
}