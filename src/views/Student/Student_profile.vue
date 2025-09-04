<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans antialiased text-gray-800 flex">
    <StudentSidebar />
    
    <div class="flex-1 md:ml-32 py-10 px-4 sm:px-6 lg:px-8 max-w-screen-xl"> 
      <div class="absolute right-10 top-20 opacity-10">
        <div class="w-64 h-64 rounded-full bg-blue-300 filter blur-3xl animate-float-slow"></div>
      </div>
      
      <main class="relative z-10 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 w-full transform transition-all duration-500 ease-out animate-fade-in-up border border-white/50 overflow-hidden">
        <div v-if="studentProfile" class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6 text-white">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between">
            <div class="flex items-center mb-4 sm:mb-0">
              <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mr-4 border border-white/20">
                <i class="fas fa-user-graduate text-2xl"></i>
              </div>
              <div>
                <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">{{ studentProfile.student_name }}</h1>
                <p class="text-blue-100 flex items-center mt-1">
                  <span class="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium mr-2">
                    <i class="fas fa-school mr-1"></i> {{ studentProfile.student_grade }} Grado
                  </span>
                  </p>
              </div>
            </div>
            <button class="inline-flex items-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50">
              <i class="fas fa-edit mr-2"></i> Editar Perfil
            </button>
          </div>
        </div>
        <div v-else class="flex justify-center items-center py-20">
          <p class="text-gray-500">Cargando perfil del estudiante...</p>
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <div v-if="studentProfile" class="px-6 py-8 sm:p-10 lg:p-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-sm border border-blue-100 relative overflow-hidden">
              <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-200 opacity-20"></div>
              <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center relative z-10">
                <i class="fas fa-user-circle mr-2 text-blue-500"></i> Información Personal
              </h3>
              <ul class="space-y-3 text-sm relative z-10">
                <li class="flex items-start">
                  <i class="fas fa-envelope text-blue-400 mt-1 mr-2 text-sm"></i>
                  <span>{{ parentEmail }}</span> 
                </li>
                <li class="flex items-start">
                  <i class="fas fa-phone-alt text-blue-400 mt-1 mr-2 text-sm"></i>
                  <span>{{ parentPhoneNumber }}</span>
                </li>
                </ul>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-sm border border-green-100 relative overflow-hidden">
              <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-green-200 opacity-20"></div>
              <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center relative z-10">
                <i class="fas fa-chart-line mr-2 text-green-500"></i> Progreso Académico
              </h3>
              <div class="mb-4">
                <div class="flex justify-between text-sm mb-1">
                  <span>Promedio General</span>
                  <span class="font-medium">85%</span> </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style="width: 85%"></div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p class="text-2xl font-bold text-green-600">3</p> <p class="text-xs text-gray-500">Cursos activos</p>
                </div>
                <div>
                  <p class="text-2xl font-bold text-green-600">12</p> <p class="text-xs text-gray-500">Sesiones/mes</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-sm border border-purple-100 relative overflow-hidden">
              <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-purple-200 opacity-20"></div>
              <h3 class="text-lg font-semibold text-purple-800 mb-4 flex items-center relative z-10">
                <i class="fas fa-chalkboard-teacher mr-2 text-purple-500"></i> Docente Asignado
              </h3>
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 border border-purple-200">
                  <i class="fas fa-user-tie text-purple-500"></i>
                </div>
                <div>
                  <p class="font-medium">Dra. Sofía Vargas</p> <p class="text-xs text-purple-600">Matemáticas y Ciencias</p> </div>
              </div>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start">
                  <i class="fas fa-envelope text-purple-400 mt-1 mr-2 text-sm"></i>
                  <span>sofia.vargas@example.com</span> </li>
                <li class="flex items-start">
                  <i class="fas fa-clock text-purple-400 mt-1 mr-2 text-sm"></i>
                  <span>Disponibilidad: Lun-Vie 8am-4pm</span> </li>
              </ul>
            </div>
          </div>

          <div class="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-sm border border-indigo-100 mb-8">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-indigo-800 flex items-center">
                <i class="fas fa-book-open mr-2 text-indigo-500"></i> Materias a Reforzar
              </h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="(subject, index) in studentProfile.subjects_to_reinforce" :key="index" 
                   class="bg-white p-4 rounded-xl border hover:border-indigo-300 transition-colors shadow-xs cursor-pointer"
                   @click="openReinforcementPanel(subject)">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white mr-3">
                    <i class="fas fa-book-reader"></i> </div>
                  <h4 class="font-medium">{{ subject }}</h4>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-500">Progreso</span>
                  <span class="font-medium text-indigo-600">N/A</span> 
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div class="h-1.5 rounded-full bg-indigo-500" style="width: 0%"></div>
                </div>
              </div>
              <p v-if="studentProfile.subjects_to_reinforce.length === 0" class="text-gray-500 col-span-full">No hay materias a reforzar registradas.</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <i class="fas fa-history mr-2 text-gray-500"></i> Historial de Sesiones Recientes
              </h3>
              <button class="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors">
                <i class="fas fa-filter mr-1"></i> Filtrar
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tema</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="session in sessions" :key="session.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ session.date }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex items-center">
                        <div :class="`w-3 h-3 rounded-full ${session.subjectColor} mr-2`"></div>
                        {{ session.subject }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {{ session.topic }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ session.duration }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${session.statusColor}`">
                        {{ session.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button class="text-blue-600 hover:text-blue-900 mr-3">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="text-green-600 hover:text-green-900">
                        <i class="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="mt-6 flex justify-between items-center">
              <div class="text-sm text-gray-500">
                Mostrando 1 al 4 de 15 sesiones
              </div>
              <nav class="flex space-x-2">
                <button class="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Anterior
                </button>
                <button class="px-3 py-1 rounded-md border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button class="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <button class="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Siguiente
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <div v-if="showReinforcementPanel" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative transform transition-all duration-300 ease-out scale-95 opacity-0"
             :class="{ 'scale-100 opacity-100': showReinforcementPanel }">
          <button @click="closeReinforcementPanel" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <i class="fas fa-times-circle text-2xl"></i>
          </button>
          
          <h2 class="text-3xl font-bold text-indigo-700 mb-6 flex items-center">
            <i class="fas fa-book-open mr-3 text-indigo-500"></i> Agendar Refuerzo de {{ selectedSubject }}
          </h2>

          <div class="mb-6 border-b pb-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <i class="fas fa-chalkboard-teacher mr-2 text-purple-500"></i> Docente Disponible: {{ teacher.name }}
            </h3>
            <p class="text-gray-600 mb-2">
              <i class="fas fa-envelope mr-2 text-gray-400"></i> {{ teacher.email }}
            </p>
            <p class="text-gray-600">
              <i class="fas fa-phone-alt mr-2 text-gray-400"></i> {{ teacher.phone }}
            </p>
          </div>

          <div class="mb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-calendar-alt mr-2 text-blue-500"></i> Horarios Disponibles
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="(schedule, index) in teacher.availableHours" :key="index"
                   :class="['p-4 rounded-lg border cursor-pointer transition-all duration-200', 
                            selectedSchedule === schedule ? 'bg-blue-100 border-blue-500 shadow-md' : 'bg-gray-50 border-gray-200 hover:bg-gray-100']"
                   @click="selectSchedule(schedule)">
                <p class="font-semibold text-lg text-blue-800">{{ schedule.day }}</p>
                <p class="text-gray-700 text-sm">{{ schedule.time }}</p>
              </div>
            </div>
            <p v-if="!selectedSchedule" class="text-red-500 text-sm mt-3">Por favor, selecciona un horario.</p>
          </div>

          <div v-if="selectedSchedule">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-file-alt mr-2 text-green-500"></i> Detalles de la Sesión
            </h3>
            <form @submit.prevent="confirmSession">
              <div class="mb-4">
                <label for="topic" class="block text-sm font-medium text-gray-700 mb-1">Tema a Reforzar:</label>
                <input type="text" id="topic" v-model="sessionForm.topic" required
                       class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="difficulties" class="block text-sm font-medium text-gray-700 mb-1">Principales Dificultades:</label>
                <textarea id="difficulties" v-model="sessionForm.difficulties" rows="3" required
                          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
              <div class="mb-6">
                <label for="learningMethod" class="block text-sm font-medium text-gray-700 mb-1">Método de Aprendizaje Preferido:</label>
                <select id="learningMethod" v-model="sessionForm.preferredLearningMethod" required
                        class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Selecciona un método</option>
                  <option value="visual">Visual (diagramas, videos)</option>
                  <option value="auditory">Auditivo (explicaciones, debates)</option>
                  <option value="kinesthetic">Kinestésico (práctica, ejercicios)</option>
                  <option value="mixed">Mixto</option>
                </select>
              </div>

              <div class="flex justify-end space-x-3">
                <button type="button" @click="closeReinforcementPanel" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" class="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                  Confirmar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div v-if="showSessionDetails" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative transform transition-all duration-300 ease-out scale-95 opacity-0"
             :class="{ 'scale-100 opacity-100': showSessionDetails }">
          <button @click="closeSessionDetails" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <i class="fas fa-times-circle text-2xl"></i>
          </button>
          
          <h2 class="text-3xl font-bold text-green-700 mb-6 flex items-center">
            <i class="fas fa-check-circle mr-3 text-green-500"></i> ¡Sesión Confirmada!
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-green-50 p-5 rounded-xl border border-green-200">
              <h3 class="text-xl font-semibold text-green-800 mb-3 flex items-center">
                <i class="fas fa-calendar-check mr-2 text-green-600"></i> Detalles del Horario
              </h3>
              <p class="text-gray-700 mb-1">
                <span class="font-medium">Materia:</span> {{ sessionDetails.subject }}
              </p>
              <p class="text-gray-700 mb-1">
                <span class="font-medium">Docente:</span> {{ sessionDetails.teacherName }}
              </p>
              <p class="text-gray-700 mb-1">
                <span class="font-medium">Día:</span> {{ sessionDetails.day }}
              </p>
              <p class="text-gray-700">
                <span class="font-medium">Hora:</span> {{ sessionDetails.time }}
              </p>
            </div>

            <div class="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h3 class="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                <i class="fas fa-info-circle mr-2 text-blue-600"></i> Información de la Sesión
              </h3>
              <p class="text-gray-700 mb-1">
                <span class="font-medium">Tema:</span> {{ sessionDetails.topic }}
              </p>
              <p class="text-gray-700 mb-1">
                <span class="font-medium">Dificultades:</span> {{ sessionDetails.difficulties }}
              </p>
              <p class="text-gray-700">
                <span class="font-medium">Método Preferido:</span> {{ sessionDetails.preferredLearningMethod }}
              </p>
            </div>
          </div>

          <div class="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-link mr-2 text-gray-600"></i> Recursos y Observaciones
            </h3>
            <ul class="space-y-3 text-gray-700">
              <li>
                <a :href="sessionDetails.videoCallLink" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  <i class="fas fa-video mr-2"></i> Link de Videoclase
                </a>
              </li>
              <li>
                <a :href="sessionDetails.materialsLink" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  <i class="fas fa-file-upload mr-2"></i> Materiales Subidos
                </a>
              </li>
              <li>
                <a :href="sessionDetails.recordingLink" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  <i class="fas fa-play-circle mr-2"></i> Grabación de la Sesión (Disponible después)
                </a>
              </li>
              <li>
                <a :href="sessionDetails.examLink" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  <i class="fas fa-clipboard-check mr-2"></i> Link a Examen Simulado
                </a>
              </li>
              <li class="mt-4">
                <p class="font-medium text-gray-800 flex items-start">
                  <i class="fas fa-comment-dots mr-2 mt-1 text-gray-600"></i> Observaciones del Docente:
                </p>
                <p class="pl-6 italic text-sm">{{ sessionDetails.teacherObservations }}</p>
              </li>
            </ul>
          </div>

          <div class="flex justify-center">
            <button @click="closeSessionDetails" class="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors text-lg">
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StudentSidebar from './Student_sidebar.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

// Estado para el perfil del estudiante
const studentProfile = ref(null);

// Datos del padre, que vienen del token JWT (simulado o del almacenamiento local)
const parentEmail = ref('');
const parentPhoneNumber = ref('987 654 321');

// --- Nuevos estados para la funcionalidad de refuerzo ---
const showReinforcementPanel = ref(false);
const selectedSubject = ref('');
const selectedSchedule = ref(null); // Para almacenar el horario seleccionado

const sessionForm = ref({
  topic: '',
  difficulties: '',
  preferredLearningMethod: ''
});

const showSessionDetails = ref(false);
const sessionDetails = ref(null); // Para almacenar los detalles de la sesión confirmada

// Datos simulados del docente y horarios (reemplazar con datos reales de API)
const teacher = ref({
  name: 'Dra. Sofía Vargas',
  email: 'sofia.vargas@example.com',
  phone: '+51 912 345 678',
  availableHours: [
    { id: 1, day: 'Lunes', time: '10:00 AM - 11:00 AM' },
    { id: 2, day: 'Martes', time: '03:00 PM - 04:00 PM' },
    { id: 3, day: 'Jueves', time: '09:00 AM - 10:00 AM' },
    { id: 4, day: 'Viernes', time: '02:00 PM - 03:00 PM' },
  ]
});

// Función para obtener el token JWT del almacenamiento local
const getToken = () => {
  return localStorage.getItem('accessToken');
};

// Función para obtener los datos del usuario logueado (padre) del token
const decodeJwtToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT token:", e);
    return null;
  }
};

const fetchStudentProfile = async () => {
  const token = getToken();
  if (!token) {
    console.error('No JWT token found. User not authenticated.');
    return;
  }

  const payload = decodeJwtToken(token);
  if (payload) {
    parentEmail.value = payload.sub;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/parent/me/student-profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    studentProfile.value = response.data;
    console.log('Perfil del estudiante cargado:', studentProfile.value);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    if (error.response) {
      console.error('Datos del error:', error.response.data);
      if (error.response.status === 404) {
        alert('No se encontró un perfil de estudiante asociado a tu cuenta.');
      } else if (error.response.status === 403 || error.response.status === 401) {
        alert('No tienes permiso o tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
      } else {
        alert('Ocurrió un error al cargar el perfil del estudiante: ' + (error.response.data.detail || 'Error desconocido'));
      }
    } else if (error.request) {
        alert('No se pudo conectar con el servidor para cargar el perfil del estudiante. Por favor, verifica tu conexión.');
    } else {
        alert('Ocurrió un error inesperado al cargar el perfil del estudiante.');
    }
    studentProfile.value = null;
  }
};

onMounted(() => {
  fetchStudentProfile();
});

// Datos de ejemplo para las sesiones (se mantienen, ya que no se ha solicitado modificarlos)
const sessions = [
  { id: 1, date: '05/07/2025', subject: 'Matemáticas', subjectColor: 'bg-red-500', topic: 'Repaso de Álgebra', duration: '55 min', status: 'Completada', statusColor: 'bg-green-100 text-green-800' },
  { id: 2, date: '03/07/2025', subject: 'Ciencias', subjectColor: 'bg-blue-500', topic: 'Química Orgánica', duration: '70 min', status: 'Completada', statusColor: 'bg-green-100 text-green-800' },
  { id: 3, date: '30/06/2025', subject: 'Historia', subjectColor: 'bg-yellow-500', topic: 'Revolución Francesa', duration: '60 min', status: 'Completada', statusColor: 'bg-green-100 text-green-800' },
  { id: 4, date: '27/06/2025', subject: 'Programación', subjectColor: 'bg-indigo-500', topic: 'Python Básico', duration: '80 min', status: 'Pendiente', statusColor: 'bg-yellow-100 text-yellow-800' }
];

// --- Funciones para la nueva funcionalidad ---

const openReinforcementPanel = (subject) => {
  selectedSubject.value = subject;
  selectedSchedule.value = null; // Resetear horario seleccionado al abrir
  sessionForm.value = { // Resetear formulario
    topic: '',
    difficulties: '',
    preferredLearningMethod: ''
  };
  showReinforcementPanel.value = true;
};

const closeReinforcementPanel = () => {
  showReinforcementPanel.value = false;
};

const selectSchedule = (schedule) => {
  selectedSchedule.value = schedule;
};

const confirmSession = () => {
  if (!selectedSchedule.value) {
    alert('Por favor, selecciona un horario antes de confirmar.');
    return;
  }
  if (!sessionForm.value.topic || !sessionForm.value.difficulties || !sessionForm.value.preferredLearningMethod) {
    alert('Por favor, completa todos los campos del formulario.');
    return;
  }

  // Aquí iría la lógica para enviar los datos de la sesión al backend.
  // Por ahora, simulamos la confirmación y preparamos los datos para la "nueva ventana".
  
  sessionDetails.value = {
    subject: selectedSubject.value,
    teacherName: teacher.value.name,
    day: selectedSchedule.value.day,
    time: selectedSchedule.value.time,
    topic: sessionForm.value.topic,
    difficulties: sessionForm.value.difficulties,
    preferredLearningMethod: sessionForm.value.preferredLearningMethod,
    videoCallLink: 'https://meet.google.com/xyz-abcd-efg', // Ejemplo
    materialsLink: 'https://ejemplo.com/materiales-matematicas.pdf', // Ejemplo
    recordingLink: 'https://ejemplo.com/grabacion-sesion.mp4', // Ejemplo
    examLink: 'https://ejemplo.com/examen-simulado-matematicas', // Ejemplo
    teacherObservations: 'El estudiante mostró interés en el tema y se esforzó en resolver los problemas. Se recomienda repasar conceptos básicos de funciones.' // Ejemplo
  };

  closeReinforcementPanel(); // Cierra el panel de agendamiento
  showSessionDetails.value = true; // Abre el panel de detalles de la sesión
};

const closeSessionDetails = () => {
  showSessionDetails.value = false;
};
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

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

/* Estilos para la tabla */
.shadow-xs {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

/* Transiciones suaves */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Transiciones para paneles modales */
.scale-95 {
  transform: scale(0.95);
}
.scale-100 {
  transform: scale(1);
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
</style>