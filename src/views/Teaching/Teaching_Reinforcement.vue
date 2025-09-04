<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans antialiased text-gray-800">

    <TeachingHeader :profilePhotoUrl="profile.photoUrl" @toggleSidebar="toggleSidebar" />

    <TeachingSidebar :isOpen="isSidebarOpen" @closeSidebarOnMobile="closeSidebar" />

    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity duration-300"
    ></div>

    <div class="md:ml-64 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <main class="mt-4 relative z-10 bg-white p-6 sm:p-10 lg:p-12 rounded-3xl shadow-xl shadow-indigo-100/50 w-full max-w-6xl mx-auto transform transition-all duration-500 ease-out animate-fade-in-up border border-indigo-50">
        <h2 class="text-4xl font-extrabold text-indigo-800 tracking-tight mb-8 pb-4 border-b border-gray-200">
          <i class="fas fa-life-ring mr-3 text-emerald-500"></i> Reforzamiento & Ayuda
        </h2>

        <section class="mb-10 p-6 bg-blue-50 rounded-2xl shadow-inner border border-blue-100">
          <h3 class="text-2xl font-bold text-blue-700 mb-6 flex items-center">
            <i class="fas fa-graduation-cap mr-3 text-blue-500"></i> Seleccionar Grado
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button v-for="grade in grades" :key="grade"
                    @click="selectGrade(grade)"
                    :class="[
                      'px-5 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md',
                      selectedGrade === grade ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ring-2 ring-blue-300' : 'bg-white text-gray-700 hover:bg-blue-100 border border-gray-200'
                    ]">
              {{ grade }}°
            </button>
          </div>
        </section>

        <section v-if="selectedGrade" class="mb-10 pt-8 border-t border-gray-200">
          <h3 class="text-2xl font-bold text-purple-700 mb-6 flex items-center">
            <i class="fas fa-users mr-3 text-purple-500"></i> Estudiantes Asignados ({{ selectedGrade }}°)
          </h3>
          <div v-if="filteredStudents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="student in filteredStudents" :key="student.id"
                 @click="selectStudent(student)"
                 :class="[
                   'bg-white p-5 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border-2',
                   selectedStudent && selectedStudent.id === student.id ? 'border-purple-500 ring-2 ring-purple-300 bg-purple-50' : 'border-gray-100 hover:border-purple-300'
                 ]">
              <div class="flex items-center">
                <img :src="student.photoUrl" :alt="`Foto de ${student.name}`" class="w-16 h-16 rounded-full object-cover mr-4 border-3 border-gray-200 shadow-md">
                <div>
                  <p class="font-bold text-lg text-gray-800">{{ student.name }}</p>
                  <p class="text-sm text-gray-500 mt-1">Grado: {{ student.grade }}°</p>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500 italic text-center text-lg py-8 bg-gray-50 rounded-xl border border-gray-200">
            No hay estudiantes asignados para este grado aún.
          </p>
        </section>

        <section v-if="selectedStudent" class="mb-10 pt-8 border-t border-gray-200">
          <h3 class="text-2xl font-bold text-orange-700 mb-6 flex items-center">
            <i class="fas fa-address-card mr-3 text-orange-500"></i> Ficha de {{ selectedStudent.name.split(' ')[0] }}
          </h3>
          <div class="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-inner space-y-6 border border-orange-100">
            <div>
              <p class="font-bold text-lg text-orange-800 mb-2">Datos Personales</p>
              <ul class="text-gray-700 text-base list-none space-y-1">
                <li><span class="font-semibold text-gray-800">Nombre:</span> {{ selectedStudent.name }}</li>
                <li><span class="font-semibold text-gray-800">Edad:</span> {{ selectedStudent.age }} años</li>
                <li><span class="font-semibold text-gray-800">Grado:</span> {{ selectedStudent.grade }}°</li>
              </ul>
            </div>
            <div>
              <p class="font-bold text-lg text-orange-800 mb-2">Dificultades Clave</p>
              <ul class="text-gray-700 text-base list-disc list-inside space-y-1">
                <li v-for="(difficulty, index) in selectedStudent.difficulties" :key="index">{{ difficulty }}</li>
              </ul>
            </div>
            <div>
              <p class="font-bold text-lg text-orange-800 mb-2">Métodos de Aprendizaje Preferidos</p>
              <ul class="text-gray-700 text-base list-disc list-inside space-y-1">
                <li v-for="(method, index) in selectedStudent.learningMethods" :key="index">{{ method }}</li>
              </ul>
            </div>

            <div class="pt-6 border-t border-orange-200">
              <p class="font-bold text-lg text-orange-800 mb-4">Cuadros Temáticos Sugeridos</p>
              <div class="space-y-4">
                <div v-for="topic in selectedStudent.topicCharts" :key="topic.id"
                     @click="openTopicOptions(topic)"
                     :class="[
                       'bg-white p-4 rounded-xl shadow-md border-2 cursor-pointer transition-all duration-200 flex justify-between items-center group',
                       selectedTopic && selectedTopic.id === topic.id ? 'border-blue-500 ring-2 ring-blue-300 bg-blue-50' : 'border-gray-100 hover:border-blue-300 hover:shadow-lg'
                     ]">
                  <span class="font-medium text-gray-800 text-lg group-hover:text-blue-700">{{ topic.name }}</span>
                  <i class="fas fa-chevron-right text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform duration-200"></i>
                </div>
              </div>
            </div>
          </div>
        </section>


        <div v-if="selectedTopic" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div class="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl animate-fade-in-up border border-gray-100">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
              Opciones para: "{{ selectedTopic.name }}"
            </h3>
            <div class="space-y-4">
              <button @click="alertAction('Ver Horario Elegido')" class="action-button bg-sky-50 text-sky-700 hover:bg-sky-100 border-sky-200">
                <i class="fas fa-clock mr-3 text-sky-600"></i> Ver horario elegido
              </button>
              <button @click="alertAction('Subir Link de Videoclase')" class="action-button bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
                <i class="fas fa-video mr-3 text-indigo-600"></i> Subir link de videoclase
              </button>
              <button @click="alertAction('Subir Materiales')" class="action-button bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                <i class="fas fa-upload mr-3 text-emerald-600"></i> Subir materiales (PDF, enlaces)
              </button>
              <button @click="alertAction('Subir Grabación')" class="action-button bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200">
                <i class="fas fa-microphone-alt mr-3 text-rose-600"></i> Subir grabación
              </button>
              <button @click="alertAction('Crear Examen Simulado')" class="action-button bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">
                <i class="fas fa-file-alt mr-3 text-amber-600"></i> Crear examen simulado
              </button>
              <button @click="alertAction('Subir Observaciones y Progreso')" class="action-button bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200">
                <i class="fas fa-clipboard-check mr-3 text-teal-600"></i> Subir observaciones y progreso
              </button>
              <button @click="alertAction('Crear Juegos Didácticos Virtuales')" class="action-button bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200">
                <i class="fas fa-gamepad mr-3 text-purple-600"></i> Crear juegos didácticos virtuales
              </button>
            </div>
            <div class="mt-8 flex justify-end">
              <button @click="closeTopicOptions"
                      class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium shadow-sm hover:shadow-md">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TeachingSidebar from './Teaching_sidebar.vue';
import TeachingHeader from './Teaching_header.vue'; // ¡Importa el nuevo componente de header!


// Estado para la sidebar, asumiendo que se gestiona a un nivel superior o en App.vue
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  // Solo cierra la sidebar si el ancho de la ventana es menor a 768px (móvil)
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
};


// Datos simulados (¡Idealmente estos vendrían de una API!)
const grades = ref([1, 2, 3, 4, 5, 6]);

const allStudents = ref([
  {
    id: 'STU001',
    name: 'Carlos Sánchez',
    age: 8,
    grade: 3,
    photoUrl: 'https://images.unsplash.com/photo-1542846420-53907bb3b9f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulties: ['Comprensión lectora', 'Multiplicación'],
    learningMethods: ['Visual', 'Kinestésico (Aprendiendo haciendo)'],
    topicCharts: [
      { id: 'T001', name: 'Lectura Comprensiva Nivel 1' },
      { id: 'T002', name: 'Tablas de Multiplicar (2 y 3)' },
      { id: 'T011', name: 'Resolución de Problemas con Suma' },
    ]
  },
  {
    id: 'STU002',
    name: 'Sofía Díaz',
    age: 9,
    grade: 4,
    photoUrl: 'https://images.unsplash.com/photo-1600320669146-52c67cf77d9c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulties: ['Resolución de problemas de lógica', 'Ortografía'],
    learningMethods: ['Auditivo (escuchando)', 'Actividades prácticas'],
    topicCharts: [
      { id: 'T003', name: 'Estrategias para Problemas Matemáticos' },
      { id: 'T004', name: 'Reglas Básicas de Ortografía' },
      { id: 'T005', name: 'Historia del Perú: Incas' },
    ]
  },
  {
    id: 'STU003',
    name: 'Mateo López',
    age: 7,
    grade: 2,
    photoUrl: 'https://images.unsplash.com/photo-1546967175-472147d3d0f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulties: ['Suma y resta con llevada'],
    learningMethods: ['Juegos didácticos', 'Repetición guiada'],
    topicCharts: [
      { id: 'T006', name: 'Operaciones Básicas: Suma y Resta' },
      { id: 'T012', name: 'Reconocimiento de Números hasta 100' },
    ]
  },
  {
    id: 'STU004',
    name: 'Valeria Quispe',
    age: 11,
    grade: 6,
    photoUrl: 'https://images.unsplash.com/photo-1596788320005-72863920970a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulties: ['Geometría', 'Escritura creativa'],
    learningMethods: ['Proyectos colaborativos', 'Trabajo en grupo'],
    topicCharts: [
      { id: 'T007', name: 'Introducción a la Geometría' },
      { id: 'T008', name: 'Técnicas de Escritura Narrativa' },
      { id: 'T013', name: 'Álgebra Básica' },
    ]
  },
  {
    id: 'STU005',
    name: 'Diego Flores',
    age: 10,
    grade: 5,
    photoUrl: 'https://images.unsplash.com/photo-1620601815598-a2b16bf15ed4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulties: ['Fracciones', 'Historia universal'],
    learningMethods: ['Lectura guiada', 'Diagramas y mapas mentales'],
    topicCharts: [
      { id: 'T009', name: 'Conceptos y Operaciones con Fracciones' },
      { id: 'T010', name: 'Civilizaciones Antiguas: Roma y Egipto' },
    ]
  },
  {
    id: 'STU006',
    name: 'Ana García',
    age: 8,
    grade: 3,
    photoUrl: 'https://images.unsplash.com/photo-1619895867011-85b1ed7b4d32?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulties: ['Problemas de resta', 'Comprensión de cuentos'],
    learningMethods: ['Visual', 'Narrativa'],
    topicCharts: [
      { id: 'T014', name: 'Ejercicios de Resta Simple' },
      { id: 'T015', name: 'Análisis de Personajes en Cuentos' },
    ]
  },
  {
    id: 'STU007',
    name: 'Luis Mendoza',
    age: 9,
    grade: 4,
    photoUrl: 'https://images.unsplash.com/photo-1542846420-53907bb3b9f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    difficulties: ['Gramática', 'Tablas de dividir'],
    learningMethods: ['Ejercicios repetitivos', 'Tarjetas de estudio'],
    topicCharts: [
      { id: 'T016', name: 'Sujeto y Predicado' },
      { id: 'T017', name: 'Introducción a la División' },
    ]
  },
]);


const selectedGrade = ref(null);
const selectedStudent = ref(null);
const selectedTopic = ref(null);

const filteredStudents = computed(() => {
  if (!selectedGrade.value) return [];
  return allStudents.value.filter(student => student.grade === selectedGrade.value);
});


const selectGrade = (grade) => {
  selectedGrade.value = grade;
  selectedStudent.value = null;
  selectedTopic.value = null;
};


const selectStudent = (student) => {
  selectedStudent.value = student;
  selectedTopic.value = null;
};


const openTopicOptions = (topic) => {
  selectedTopic.value = topic;
};


const closeTopicOptions = () => {
  selectedTopic.value = null;
};


// Función para simular acciones (puedes reemplazar con lógica real)
const alertAction = (actionName) => {
  if (selectedTopic.value && selectedStudent.value) {
    // Usar una librería de notificación si está disponible (ej. Vue Toastification)
    // toast.info(`Has seleccionado: "${actionName}" para el tema "${selectedTopic.value.name}" de ${selectedStudent.value.name}.`);
    alert(`Has seleccionado: "${actionName}" para el tema "${selectedTopic.value.name}" de ${selectedStudent.value.name}.`);
  } else {
    alert('Por favor, selecciona un tema y un estudiante.');
  }
  closeTopicOptions();
};


// Placeholder para la URL de la foto de perfil del docente
const profile = ref({
  photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cfdce567?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
});

</script>


<style scoped>
/* Animaciones */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

/* Estilos para los botones de acción del modal */
.action-button {
  @apply w-full text-left px-5 py-4 rounded-xl text-lg font-medium transition-colors duration-200 flex items-center shadow-sm border;
}

/* Ajustes de estilo para el header para asegurar consistencia */
header {
  height: 4.5rem; /* Ajustar a la altura que tenías */
}

/* Ocultar el scrollbar si no es necesario o personalizarlo */
/* html {
  overflow-y: overlay;
} */

/* Asegúrate de que Font Awesome esté bien importado en tu proyecto */
</style>