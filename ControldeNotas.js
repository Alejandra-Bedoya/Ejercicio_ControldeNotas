document.addEventListener("DOMContentLoaded", () => {
  const openPromptButton = document.getElementById("openPromptButton");
  if (openPromptButton) {
    openPromptButton.addEventListener("click", menu);
  }
});

function menu() {
  alert("Bienvenido al control de notas de la institución educativa.");
  let opcion;
  do {
      opcion = Number(prompt(`Elige una opción: 
          1. Registrar estudiante
          2. Ingresar notas 
          3. Ver notas de estudiantes
          4. Ver cantidad de estudiantes que ganaron
          5. Salir`));

      switch (opcion) {
          case 1:
              registrarEstudiante();
              break;
          case 2:
              ingresarNotas();
              break;
          case 3:
              mostrarNotasEstudiantes();
              break;
          case 4:
              estudiantesGanaron();
              break;
          case 5:
              alert("Gracias por utilizar el sistema.");
              break;
          default:
              alert("Opción no válida. Inténtalo de nuevo.");
              break;
      }
  } while (opcion !== 5);
}

let estudiantes = {};

function registrarEstudiante() {
  let nombre = prompt("Ingrese el nombre del estudiante:");
  if (nombre.trim() === "") {
    alert("El nombre del estudiante no puede estar vacío.");
    return;
  }

  // Verificar si el estudiante ya está registrado
  if (estudiantes.hasOwnProperty(nombre)) {
    alert("El estudiante ya está registrado.");
    return;
  }

  estudiantes[nombre] = [];
  alert("Estudiante registrado correctamente.");
}

function ingresarNotas() {
  let nombre = prompt("Ingrese el nombre del estudiante:");
  if (!estudiantes.hasOwnProperty(nombre)) {
    alert("El estudiante no está registrado. Registre al estudiante primero.");
    return;
  }

  let nota1 = Number(prompt("Ingrese la primera nota (20% de la materia):"));
  let nota2 = Number(prompt("Ingrese la segunda nota (30% de la materia):"));
  let nota3 = Number(prompt("Ingrese la tercera nota (50% de la materia):"));

  if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || nota1 < 1 || nota1 > 5 || nota2 < 1 || nota2 > 5 || nota3 < 1 || nota3 > 5) {
    alert("Las notas deben ser números entre 1 y 5.");
    return;
  }

  estudiantes[nombre] = [nota1, nota2, nota3];
  alert("Notas ingresadas correctamente.");
}

function mostrarNotasEstudiantes() {
  if (Object.keys(estudiantes).length === 0) {
    alert("No hay estudiantes registrados.");
    return;
  }

  let texto = "Notas de los estudiantes:\n";
  for (let nombre in estudiantes) {
    let notaDefinitiva = calcularNotaDefinitiva(estudiantes[nombre]);
    texto += `${nombre}: ${estudiantes[nombre].join(", ")} - Nota Definitiva: ${notaDefinitiva}\n`;
  }
  alert(texto);
}

function estudiantesGanaron() {
  if (Object.keys(estudiantes).length === 0) {
    alert("No hay estudiantes registrados.");
    return;
  }

  let estudiantesGanaron = 0;
  for (let nombre in estudiantes) {
    let notaDefinitiva = parseFloat(calcularNotaDefinitiva(estudiantes[nombre]));
    if (notaDefinitiva > 3.5) {
      estudiantesGanaron++;
    }
  }
  alert(`Cantidad de estudiantes que ganaron la materia: ${estudiantesGanaron}`);
}

function calcularNotaDefinitiva(notas) {
  const notaFinal = (notas[0] * 0.2) + (notas[1] * 0.3) + (notas[2] * 0.5);
  return notaFinal.toFixed(2);
}

