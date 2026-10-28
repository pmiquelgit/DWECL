
        // Mostrar por consola la fecha de hoy con formato "lunes, 19 de octubre de 2026"
        // Pista: dos arrays con los nombres de días y meses: dias(hoy.getDay())
        const diasSemana = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const mesesAnyo = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const hoy = new Date();
        console.log("Hoy es: " + diasSemana[hoy.getDay()] + " " + hoy.getDate() + " de " + mesesAnyo[hoy.getMonth()] + " de " + hoy.getFullYear());

        // Escribe una función "diasHasta(fecha)" que devuelva los días que faltan hasta mi cumpleaños
        // Pista: (fecha - new Date()) / 86400000 y redondea con Math.ceil

        const fechaCumpleanyos = new Date(2027, 5, 15); 

        function diasHasta(fecha) {

            const diasHastaFecha = (fecha - new Date()) / 86400000;

            return Math.ceil(diasHastaFecha)

        }

        console.log(diasHasta(fechaCumpleanyos))


        // En una página HTML, muestra la hora actual actualizándose cada segundo
        // con un botón "Parar" y otro "Reanudar"
        // Pista: toLocaleTimeString("es-ES"); guarda el id de setInterval en una variable

        // Pillo los botones del HTML
        const botonParar = document.getElementById("parar");
        const botonReanudar = document.getElementById("reanudar");

        // Esta funcion se ejecutará cada segundo para mostrar la hora
        function mostrarHora() {
            const horaActual = new Date().toLocaleTimeString("es-ES");
            const textoHora = document.getElementById("horaActual");
            textoHora.textContent = ("La hora actual es: " + horaActual);
        }

        // Esta funcion parará el intervalo y congelará la hora
        function pararHora() {

            clearInterval(intervaloEjecucion);
            console.log("Hola parate")
        }

        // Esta funcion reanudará de nuevo el intervalo que mostrará la hora en tiempo real
        function reanudarHora() {
            
            intervaloEjecucion = setInterval(mostrarHora, 1000);
            console.log("Hola reanudate")
        }

        // El intervalo que mostrará la hora cada segundo
        let intervaloEjecucion = setInterval(mostrarHora, 1000);

        // Listener para que los botones ejecuten la funcion al hacer click
        botonParar.addEventListener("click", pararHora);
        botonReanudar.addEventListener("click", reanudarHora);
