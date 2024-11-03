// script.js

window.onload = function() {
    // Generar automáticamente el número de boleta al cargar la página
    document.getElementById('boletaNum').value = 'BO-' + Math.floor(Math.random() * 1000000);
};

function agregarFila() {
// Esta función agrega una nueva fila a la tabla de repuestos.
 // Obtiene la referencia del cuerpo de la tabla (tbody) y añade una nueva fila con celdas que contienen campos de texto para 'Repuesto', 'Cantidad', 'Descripción', un select para 'Estado' y un botón para eliminar la fila.
    const table = document.getElementById("repuestosTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();// Insertar una nueva fila al final del tbody
    // Crear y asignar nuevas celdas con los campos correspondientes
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3); //Celda para Estado
    const cell5 = newRow.insertCell(4); // Celda para Acción (botón eliminar)
    // Definir el contenido de las celdas con elementos de entrada y selección
    cell1.innerHTML = '<input type="text" name="repuesto[]" required>';
    cell2.innerHTML = '<input type="number" name="cantidad[]" min="1" required>';
    cell3.innerHTML = '<input type="text" name="descripcion[]" required>'; // Nueva entrada para Descripción
    cell4.innerHTML = `
        <select name="estado[]">
            <option value="Correcto">Correcto</option>
            <option value="Defectuoso">Defectuoso</option>
        </select>`;// Menú desplegable para seleccionar el estado del repuesto
    cell5.innerHTML = '<button type="button" onclick="eliminarFila(this)">Eliminar</button>';
}

function eliminarFila(btn) { // Esta función elimina la fila de la tabla que contiene el botón en el que se hizo clic.
    const row = btn.parentNode.parentNode;// Obtener la fila actual
    row.parentNode.removeChild(row);// Eliminar la fila de la tabla 
}

document.getElementById('serviceForm').addEventListener('submit', function(event) {
    // Manejador de eventos para el envío del formulario.
    // Esta función se ejecuta cuando se envía el formulario, previniendo el envío automático hasta que se validen todos los campos.
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        const form = this; // Referencia al formulario actual
    
    // Obtener todos los campos requeridos, validaciones específicas para los campos email y horas trabajadas
    const email = form.email.value; 
    const horas = form.horas.value; 
    // Validación para el correo electrónico
    if (!validarEmail(email)) {
        mostrarMensaje("Correo electrónico no es válido.", true);
        return;
    }

    // Validación para horas trabajadas que sean mayor a 0
    if (horas <= 0) {
        mostrarMensaje("Las horas trabajadas deben ser mayores a 0.", true);
        return;
    }

    // Validación para repuestos
    const repuestos = form.querySelectorAll('input[name="repuesto[]"]');
    const cantidades = form.querySelectorAll('input[name="cantidad[]"]');
    const descripciones = form.querySelectorAll('input[name="descripcion[]"]');
    const estados = form.querySelectorAll('select[name="estado[]"]');
// Recorre los campos de repuestos y verifica que no estén vacíos o tengan valores incorrectos
    for (let i = 0; i < repuestos.length; i++) {
        if (repuestos[i].value === "" || cantidades[i].value <= 0 || descripciones[i].value === "") {
            mostrarMensaje("Todos los campos de repuestos son obligatorios y deben ser válidos.", true);
            return;
        }
    }

    // Validación para los campos restantes del formulario
    // Verifica que todos los campos obligatorios no estén vacíos
    const fieldsToCheck = [
        'cliente',
        'tecnico',
        'fecha',
        'numeroIncidencia',
        'modelo',
        'serie',
        'motivoServicio',
        'condicionEquipo',
        'accionTomada',
        'motivoLlamada',
        'ubicacionFalla',
        'tipoFalla',
        'horaInicialViaje',
        'horaFinalViaje',
        'horaInicialTrabajo',
        'horaFinalTrabajo',
    ];
// Recorre cada campo y muestra un mensaje si alguno está vacío
    for (const field of fieldsToCheck) {
        const fieldValue = form[field]?.value;
        if (!fieldValue || fieldValue.trim() === "") {
            mostrarMensaje(`El campo ${field} es obligatorio.`, true);
            return;
        }
    }

    // Aquí se envía el formulario si todo está correcto
    form.submit();
});

// Esta función valida el formato del email usando una expresión regular.
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
// Función que muestra un mensaje al usuario.
    // Dependiendo del parámetro 'isError', el mensaje se mostrará en rojo (si es un error) o verde (si es correcto).
function mostrarMensaje(mensaje, isError) {
    const messageElement = document.getElementById('message');// Obtener el elemento del mensaje
    messageElement.textContent = mensaje; // Establecer el texto del mensaje
    messageElement.style.color = isError ? 'red' : 'green'; // Definir el color basado en si es error o no
}
