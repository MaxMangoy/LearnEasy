<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans antialiased text-gray-800 flex">
    
    <StudentSidebar :is-open="true" /> 
    
    <div class="flex-1 md:ml-32 py-10 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto"> 
      <div class="absolute right-10 top-20 opacity-10">
        <div class="w-64 h-64 rounded-full bg-blue-300 filter blur-3xl animate-float-slow"></div>
      </div>
      
      <main class="relative z-10 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 w-full transform transition-all duration-500 ease-out animate-fade-in-up border border-white/50 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6 text-white">
          <div class="flex items-center">
            <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 border border-white/20">
              <i class="fas fa-hands-helping text-2xl"></i>
            </div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">Reforzamiento Académico</h1>
              <p class="text-blue-100 mt-1">Solicita apoyo personalizado en tus materias.</p>
            </div>
          </div>
        </div>

        <div class="px-6 py-8 sm:p-10 lg:p-12">
          <div class="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-sm border border-indigo-100 mb-8">
            <h3 class="text-lg font-semibold text-indigo-800 mb-6 flex items-center">
              <i class="fas fa-book-open mr-2 text-indigo-500"></i> Selecciona una Materia
            </h3>
            
            <div v-if="isLoadingSubjects" class="flex justify-center items-center py-10">
              <p class="text-gray-500 mr-3">Cargando materias disponibles...</p>
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            
            <div v-else-if="availableSubjects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="(subject, index) in availableSubjects" 
                :key="subject.id || index" 
                @click="selectSubject(subject)"
                :class="[
                  'bg-white p-4 rounded-xl border transition-all shadow-xs cursor-pointer',
                  selectedSubject && selectedSubject.id === subject.id ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' : 'hover:border-indigo-300'
                ]"
              >
                <div class="flex items-center mb-3">
                  <div :class="`w-10 h-10 rounded-lg ${subject.color || 'bg-gray-500'} flex items-center justify-center text-white mr-3`">
                    <i :class="subject.icon || 'fas fa-question-circle'"></i>
                  </div>
                  <h4 class="font-medium text-gray-800">{{ subject.name }}</h4>
                </div>
                <p class="text-sm text-gray-600">{{ subject.description }}</p>
              </div>
            </div>
            <div v-else class="py-10 text-center text-gray-500">
              No hay materias disponibles para seleccionar en este momento.
            </div>
          </div>

          <div 
            v-if="selectedSubject" 
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in-up"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-chalkboard-teacher mr-2 text-purple-500"></i> Docente y Horarios Disponibles
            </h3>

            <div v-if="selectedSubject.teacher" class="flex items-center mb-4">
                <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3 border border-purple-200">
                    <i class="fas fa-user-tie text-purple-500 text-xl"></i>
                </div>
                <div>
                    <p class="font-medium text-gray-900 text-lg">{{ selectedSubject.teacher.name }}</p>
                    <p class="text-sm text-purple-600">{{ selectedSubject.teacher.email }}</p>
                </div>
            </div>
            <div v-else class="text-gray-500 mb-4">No hay docente asignado para esta materia.</div>

            <h4 class="font-semibold text-gray-700 mb-3">Horarios Disponibles:</h4>
            <div v-if="selectedSubject.teacher && selectedSubject.teacher.availableSlots && selectedSubject.teacher.availableSlots.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div 
                v-for="(slot, idx) in selectedSubject.teacher.availableSlots" 
                :key="idx"
                @click="selectTimeSlot(slot)"
                :class="[
                  'p-3 rounded-lg border flex flex-col cursor-pointer transition-all',
                  selectedTimeSlot && selectedTimeSlot.date === slot.date && selectedTimeSlot.time === slot.time ? 'border-blue-500 bg-blue-50 text-blue-800 ring-2 ring-blue-200 shadow-md' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                ]"
              >
                <span class="font-medium">{{ slot.date }}</span>
                <span class="text-sm">{{ slot.time }}</span>
              </div>
            </div>
            <div v-else class="text-gray-500">No hay horarios disponibles para esta materia.</div>
          </div>

          <div 
            v-if="selectedTimeSlot" 
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-calendar-alt mr-2 text-green-500"></i> Detalles de la Sesión de Reforzamiento
            </h3>

            <form @submit.prevent="openConfirmationModal" class="space-y-6">
              <div>
                <label for="topic" class="block text-sm font-medium text-gray-700 mb-1">Tema a Reforzar:</label>
                <input 
                  type="text" 
                  id="topic" 
                  v-model="sessionDetails.topic" 
                  required 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ej: Ecuaciones de segundo grado"
                >
              </div>
              
              <div>
                <label for="difficulties" class="block text-sm font-medium text-gray-700 mb-1">Principales Dificultades:</label>
                <textarea 
                  id="difficulties" 
                  v-model="sessionDetails.difficulties" 
                  rows="3" 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Describe qué te resulta difícil o las dudas que tienes."
                ></textarea>
              </div>

              <div>
                <label for="learning-method" class="block text-sm font-medium text-gray-700 mb-1">Método de Aprendizaje Preferido:</label>
                <select 
                  id="learning-method" 
                  v-model="sessionDetails.preferredMethod" 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Selecciona un método</option>
                  <option value="explicacion_teorica">Explicación Teórica Detallada</option>
                  <option value="ejercicios_practicos">Muchos Ejercicios Prácticos</option>
                  <option value="ejemplos_aplicados">Ejemplos Aplicados a la Vida Real</option>
                  <option value="discusiones_preguntas">Discusión y Preguntas Interactivas</option>
                </select>
              </div>

              <div class="flex justify-end space-x-3">
                <button 
                  type="button" 
                  @click="resetForm" 
                  class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Confirmar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <TransitionRoot as="template" :show="isConfirmationModalOpen">
        <Dialog as="div" class="relative z-50" @close="closeConfirmationModal">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <i class="fas fa-check-circle text-green-600 text-2xl" aria-hidden="true"></i>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">¡Sesión de Reforzamiento Confirmada!</DialogTitle>
                      <div class="mt-2 text-left">
                        <p class="text-sm text-gray-500 mb-4">Tu sesión de reforzamiento ha sido programada con éxito. Aquí están los detalles:</p>
                        
                        <div class="space-y-3">
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Materia:</span> {{ finalSessionDetails.subject }}</p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Docente:</span> {{ finalSessionDetails.teacher }}</p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Fecha y Hora:</span> {{ finalSessionDetails.date }} a las {{ finalSessionDetails.time }}</p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Tema:</span> {{ finalSessionDetails.topic }}</p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Link de Videoclase:</span> <a :href="finalSessionDetails.videoLink" target="_blank" class="text-blue-600 hover:text-blue-800 break-all">{{ finalSessionDetails.videoLink }}</a></p>
                          
                          <div v-if="finalSessionDetails.materials && finalSessionDetails.materials.length" class="text-sm text-gray-700">
                            <span class="font-medium text-gray-800">Materiales Subidos:</span>
                            <ul class="list-disc list-inside ml-2 mt-1 space-y-1">
                              <li v-for="(material, mIdx) in finalSessionDetails.materials" :key="mIdx">
                                <a :href="material.link" target="_blank" class="text-blue-600 hover:text-blue-800">{{ material.name }}</a>
                              </li>
                            </ul>
                          </div>
                          <p v-else class="text-sm text-gray-700"><span class="font-medium text-gray-800">Materiales Subidos:</span> No hay materiales aún.</p>

                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Grabación:</span> <a :href="finalSessionDetails.recordingLink" target="_blank" class="text-blue-600 hover:text-blue-800 break-all">{{ finalSessionDetails.recordingLink }}</a></p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Examen Simulado:</span> <a :href="finalSessionDetails.examLink" target="_blank" class="text-blue-600 hover:text-blue-800 break-all">{{ finalSessionDetails.examLink }}</a></p>
                          <p class="text-sm text-gray-700"><span class="font-medium text-gray-800">Observaciones del Docente:</span> {{ finalSessionDetails.teacherNotes || 'N/A' }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6">
                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" @click="closeConfirmationModal">
                      Entendido
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Importar onMounted
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import StudentSidebar from './Student_sidebar.vue';
import axios from 'axios'; // Importar axios
import { API_BASE_URL } from '@/config/api'; // <--- LÍNEA AÑADIDA

// --- Estados Reactivos ---
const availableSubjects = ref([]); // Inicialmente vacío, se llenará desde la API
const isLoadingSubjects = ref(true); // Nuevo estado de carga
const selectedSubject = ref(null);
const selectedTimeSlot = ref(null);
const isConfirmationModalOpen = ref(false);

const sessionDetails = ref({
  topic: '',
  difficulties: '',
  preferredMethod: '',
});

const finalSessionDetails = ref({
  subject: '',
  teacher: '',
  date: '',
  time: '',
  topic: '',
  videoLink: 'https://meet.google.com/xyz-abcd-efg', // Ejemplo, se llenará dinámicamente
  materials: [], // Puede que esto venga vacío de la API inicialmente
  recordingLink: 'https://youtube.com/grabacion-sesion', // Ejemplo
  examLink: 'https://quizizz.com/examen-simulado', // Ejemplo
  teacherNotes: 'El docente revisará los conceptos clave y enfocará la sesión en tus dificultades específicas.'
});

// Función para obtener el token JWT del almacenamiento local
const getToken = () => {
  return localStorage.getItem('accessToken'); // Asegúrate de que esto coincida con tu Login.vue
};

// Función para mapear un nombre de materia a un ícono y color si no vienen de la API
const getSubjectVisuals = (subjectName) => {
  const defaultVisuals = {
    icon: 'fas fa-book-reader', // Ícono genérico
    color: 'bg-gray-500' // Color genérico
  };

  switch (subjectName.toLowerCase()) {
    case 'matemáticas':
    case 'matematicas':
    case 'álgebra':
    case 'algebra':
    case 'cálculo':
    case 'calculo':
      return { icon: 'fas fa-square-root-alt', color: 'bg-red-500' };
    case 'ciencias naturales':
    case 'biología':
    case 'biologia':
    case 'química':
    case 'quimica':
    case 'física':
    case 'fisica':
      return { icon: 'fas fa-flask', color: 'bg-blue-500' };
    case 'lenguaje':
    case 'literatura':
      return { icon: 'fas fa-book', color: 'bg-green-500' };
    case 'historia':
      return { icon: 'fas fa-landmark', color: 'bg-yellow-600' };
    case 'geografía':
    case 'geografia':
      return { icon: 'fas fa-globe-americas', color: 'bg-purple-500' };
    case 'ingles':
    case 'inglés':
      return { icon: 'fas fa-language', color: 'bg-indigo-500' };
    case 'programación':
    case 'programacion':
    case 'informática':
    case 'informatica':
      return { icon: 'fas fa-code', color: 'bg-teal-500' };
    // Añade más casos según las materias que esperes de tu backend
    default:
      return defaultVisuals;
  }
};

// --- Métodos de Carga de Datos desde la API ---
const fetchSubjects = async () => {
  isLoadingSubjects.value = true;
  const token = getToken();

  if (!token) {
      console.error('No JWT token found. User not authenticated.');
      alert('No estás autenticado. Por favor, inicia sesión.');
      isLoadingSubjects.value = false;
      // Opcional: redirigir al login
      // router.push('/login'); 
      return;
  }

  try {
      // *** LÍNEA MODIFICADA: Se usa API_BASE_URL en lugar de la URL hardcodeada ***
      const response = await axios.get(`${API_BASE_URL}/subjects/available-for-reinforcement`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      
      // Mapear los datos de la API para añadir iconos y colores si no vienen en la respuesta
      availableSubjects.value = response.data.map(subject => {
          const visuals = getSubjectVisuals(subject.name);
          return {
              id: subject.id,
              name: subject.name,
              description: subject.description, // Asegúrate de que tu API devuelva una descripción
              icon: visuals.icon,
              color: visuals.color,
              // Aquí deberías tener la lógica para obtener el docente y sus horarios
              // Esto es un placeholder, tu backend debe retornar esta estructura o similar
              teacher: subject.teacher || { 
                  name: 'Docente no asignado', 
                  email: 'N/A', 
                  availableSlots: [] 
              } 
          };
      });
      console.log('Materias cargadas:', availableSubjects.value);

  } catch (error) {
      console.error('Error fetching subjects:', error);
      if (error.response) {
          alert('Error al cargar las materias: ' + (error.response.data.detail || error.message));
      } else if (error.request) {
          alert('No se pudo conectar al servidor para obtener las materias.');
      } else {
          alert('Ocurrió un error inesperado al obtener las materias.');
      }
      availableSubjects.value = []; // Vaciar en caso de error
  } finally {
      isLoadingSubjects.value = false;
  }
};

onMounted(() => {
  fetchSubjects();
});

// --- Métodos de Interacción con el Usuario ---
const selectSubject = (subject) => {
  selectedSubject.value = subject;
  selectedTimeSlot.value = null; // Resetear el horario si se cambia de materia
  sessionDetails.value = { topic: '', difficulties: '', preferredMethod: '' }; // Resetear formulario
};

const selectTimeSlot = (slot) => {
  selectedTimeSlot.value = slot;
};

const openConfirmationModal = () => {
  if (!sessionDetails.value.topic) {
      alert('Por favor, ingresa el tema a reforzar.');
      return;
  }
  if (!selectedSubject.value || !selectedTimeSlot.value) {
      alert('Por favor, selecciona una materia y un horario.');
      return;
  }
  
  // Llenar los detalles finales de la sesión para mostrar en el modal
  finalSessionDetails.value = {
      subject: selectedSubject.value.name,
      teacher: selectedSubject.value.teacher ? selectedSubject.value.teacher.name : 'N/A',
      date: selectedTimeSlot.value.date,
      time: selectedTimeSlot.value.time,
      topic: sessionDetails.value.topic,
      difficulties: sessionDetails.value.difficulties,
      preferredMethod: sessionDetails.value.preferredMethod,
      // Estos links y notas deben venir del backend o ser generados al confirmar
      videoLink: 'https://meet.google.com/xyz-abcd-efg', 
      materials: [], // Esto debería venir de la confirmación de la sesión en el backend
      recordingLink: 'https://youtube.com/grabacion-sesion',
      examLink: 'https://quizizz.com/examen-simulado',
      teacherNotes: 'El docente revisará los conceptos clave y enfocará la sesión en tus dificultades específicas.',
  };

  isConfirmationModalOpen.value = true;
};

const closeConfirmationModal = () => {
  isConfirmationModalOpen.value = false;
  resetForm(); // Opcional: resetear todo el flujo después de confirmar
};

const resetForm = () => {
  selectedSubject.value = null;
  selectedTimeSlot.value = null;
  sessionDetails.value = { topic: '', difficulties: '', preferredMethod: '' };
};
</script>

<style scoped>
/* Animaciones y estilos personalizados (iguales que en Student_profile.vue) */
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

/* Estilos adicionales para inputs/textareas para que coincidan con el diseño */
input[type="text"], textarea, select {
  @apply focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 focus:border-blue-400;
}
</style>