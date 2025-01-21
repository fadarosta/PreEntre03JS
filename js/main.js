console.dir(document);
console.dir(document.body);

// HELPER PRIMER DIA DEL MES
function obtenerPrimerDiaDelMes(anio, mes) {
    const fecha = new Date(anio, mes - 1, 1);
    const diaSemana = fecha.getDay();
    return diaSemana;
}

// Array de clases disponibles
const claseXdia = [
    { dia: 1, habilitado: false },
    { dia: 2, habilitado: false },
    { dia: 3, habilitado: false },
    { dia: 4, habilitado: false },
    { dia: 5, habilitado: false },
    { dia: 6, habilitado: false },
    { dia: 7, habilitado: false },
    { dia: 8, habilitado: false },
    { dia: 9, habilitado: false },
    { dia: 10, habilitado: false },
    { dia: 11, habilitado: false },
    { dia: 12, habilitado: false },
    { dia: 13, habilitado: false },
    { dia: 14, habilitado: false },
    { dia: 15, habilitado: false },
    { dia: 16, habilitado: false },
    { dia: 17, habilitado: false },
    { dia: 18, habilitado: false },
    { dia: 19, habilitado: false },
    { dia: 20, habilitado: true, claseNombre: "Yoga Integral", hora: "18:00 - 19:30", cupoDisponible: 0 },
    { dia: 21, habilitado: true, claseNombre: "Kundalini Yoga", hora: "19:00 - 20:30", cupoDisponible: 3 },
    { dia: 22, habilitado: true, claseNombre: "Hatha Yoga", hora: "17:00 - 18:00", cupoDisponible: 3 },
    { dia: 23, habilitado: true, claseNombre: "Yoga Biointegrativo", hora: "18:00 - 19:00", cupoDisponible: 4 },
    { dia: 24, habilitado: true, claseNombre: "Kundalini Yoga", hora: "19:00 - 20:30", cupoDisponible: 1 },
    { dia: 25, habilitado: true, claseNombre: "Yoga Integral", hora: "18:00 - 19:30", cupoDisponible: 6 },
    { dia: 26, habilitado: true, claseNombre: "Baño Sonoro", hora: "10:00 - 11:30", cupoDisponible: 2 },
    { dia: 27, habilitado: true, claseNombre: "Yoga Integral", hora: "18:00 - 19:30", cupoDisponible: 10 },
    { dia: 28, habilitado: true, claseNombre: "Kundalini Yoga", hora: "19:00 - 20:30", cupoDisponible: 10 },
    { dia: 29, habilitado: true, claseNombre: "Hatha Yoga", hora: "17:00 - 18:00", cupoDisponible: 10 },
    { dia: 30, habilitado: true, claseNombre: "Kundalini Yoga", hora: "19:00 - 20:30", cupoDisponible: 10 },
    { dia: 31, habilitado: true, claseNombre: "Yoga Integral", hora: "18:00 - 19:30", cupoDisponible: 10 },
];

// Helper para generar el calendario
function crearDiaHTML(diaInfo) {
    if (!diaInfo.habilitado) {
        // Días deshabilitados
        return `
        <div class="dia__deshabilitado">
            <span class="dia__nro">${diaInfo.dia}</span>
            <p>No hay clases disponibles</p>
        </div>
        `;
    }

    // CSS para días habilitados
    return `
        <div class="dia">
        <span class="dia__nro">${diaInfo.dia}</span>
        <p>${diaInfo.claseNombre}</p>
        <p>Horario: ${diaInfo.hora}</p>
        <p>Cupos disponibles: <span class="lugares-disponibles">${diaInfo.cupoDisponible || 0}</span></p>
        <form class="registracion-form" onsubmit="unaInscripcion(event, ${diaInfo.dia})">
            <input type="text" class="form-control-inscripciones" placeholder="Tu nombre" required />
            <button type="submit" class="btn btn-primary btn-sm">Inscribirse</button>
        </form>
        </div>
    `;
}

// CSS para días deshabilitados
const css = `
    .dia__deshabilitado {
        text-align: center;
    }
    .dia__deshabilitado p {
        color:#eaeaea;
        opacity: 50%;
    }
    `;
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

// HANDLER de inscripción
function unaInscripcion(event) {
    event.preventDefault();

    const form = event.target;
    const nameInput = form.querySelector("input");
    const name = nameInput.value;

    if (!name.trim()) {
        alert("Por favor, ingresa tu nombre.");
        return;
    }
    
    // Obtener el contenedor de la clase
    const claseContenedor = form.parentElement;
    // Obtener el nombre de la clase
    const nombreClase = claseContenedor.querySelector("p").textContent;
    // Confirma inscripcion
    alert(`🤩 ${name}, te inscribiste en la clase de ${nombreClase}.`);

    // Actualizar el cupo
    const cupoDisponibleElement = claseContenedor.querySelector(".lugares-disponibles");
    let cupo = parseInt(cupoDisponibleElement.textContent, 10);
    if (cupo > 0) {
        cupo -= 1;
        cupoDisponibleElement.textContent = cupo;
    } else {
        alert("🤠 Se llenó la sala.");
    }

    form.reset();
}

// Listener al FORM
function EventListener() {
    const formularios = document.querySelectorAll('.form.registracion');
    formularios.forEach(formulario => {
        formulario.addEventListener('submit', unaInscripcion);  // SUBMIT
    });

    // Listener al INPUT de texto
    const inputsNombre = document.querySelectorAll('.form-control-inscripciones');
    inputsNombre.forEach(input => {
        input.addEventListener('input', (event) => {
            const value = event.target.value;
            console.log(`Nombre ingresado: ${value}`);
        });
    });
}

// CALENDAR EN EL DOM
function renderClasses(data) {
    const calendar = document.querySelector(".dias");

    // OBTENER EL PRIMER DIA
    const primerDia = obtenerPrimerDiaDelMes(2025, 1);

    // FORMATEAR EL CALENDAR
    for (let i = 0; i < primerDia; i++) {
        const emptyElement = document.createElement("li");
        emptyElement.classList.add("empty-day");
        calendar.appendChild(emptyElement);
    }

    // RENDER POR DÍAS
    data.forEach((classInfo) => {
        const diaHTML = crearDiaHTML(classInfo);
        const diaElement = document.createElement("li");
        diaElement.innerHTML = diaHTML;
        calendar.appendChild(diaElement);
    });

    // Llamado al LISTENER
    EventListener();
}

// Guardar en localStorage
function guardarClasesEnStorage(clases) {
    localStorage.setItem('clasesDisponibles', JSON.stringify(clases));
}
//Recuperar de localStorage
function obtenerClasesDeStorage() {
    const clasesStorage = localStorage.getItem('clasesDisponibles');
    return clasesStorage ? JSON.parse(clasesStorage) : [];
}
//Guardar en STORAGE
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('clasesDisponibles')) {
        guardarClasesEnStorage(claseXdia);
    }
    // Cargar las clases desde el storage
    const clases = obtenerClasesDeStorage();
    renderClasses(clases);
});
//Descargar JSON
function descargarJSON(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'clasesDisponibles.json';
    link.click();
}
// Llamado a la DESCARGA
descargarJSON(claseXdia);