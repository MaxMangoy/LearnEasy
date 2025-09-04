<template>
    <div class="min-h-screen bg-white flex flex-col items-center justify-start p-6 sm:p-10 font-sans antialiased relative overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20">
        <div class="absolute w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-0 left-0"></div>
        <div class="absolute w-64 h-64 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div class="absolute w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-0 left-0"></div>
      </div>
  
      <header class="fixed top-0 left-0 w-screen bg-white/90 backdrop-blur-sm shadow-md py-3 sm:py-4 md:py-5 z-50 flex items-center justify-center px-4 sm:px-6 border-b border-gray-100 animate-fade-in-down">
        <button 
          @click="goBack" 
          class="absolute left-4 sm:left-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Regresar"
        >
          <i class="fas fa-arrow-left text-emerald-500 text-lg"></i>
        </button>
        <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
          LEARN EASY
        </h1>
      </header>
  
      <div class="relative z-10 bg-white p-8 sm:p-10 rounded-2xl shadow-3xl w-full max-w-xl md:max-w-2xl lg:max-w-4xl text-center transform transition-all duration-500 ease-out animate-fade-in-up mt-20 sm:mt-24 lg:mt-28 border border-gray-100">
        <div class="pb-4 mb-6 border-b border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-700">Registro de Estudiante (Padre de Familia)</h2>
          <p class="text-gray-500 text-sm mt-1">Completa el siguiente formulario para registrarte y a tu hijo/a.</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-4 text-left">
          <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
            <span class="block sm:inline">{{ errorMessage }}</span>
          </div>
  
          <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm" role="alert">
            <span class="block sm:inline">{{ successMessage }}</span>
          </div>
  
          <div v-if="!showStudentForm" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div class="relative md:col-span-2">
              <input
                id="parent-full-name"
                type="text"
                v-model="parentFullName"
                placeholder=" "
                required
                class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
              />
              <label 
                for="parent-full-name" 
                class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                       peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Nombre Completo (Padre/Madre)
              </label>
            </div>
  
            <div class="relative">
              <input
                id="parent-email"
                type="email"
                v-model="parentEmail"
                placeholder=" "
                required
                class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
              />
              <label 
                for="parent-email" 
                class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                       peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Correo Electrónico
              </label>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-emerald-500"></i>
              </div>
            </div>
            
            <div class="relative">
              <input
                id="parent-phone"
                type="tel"
                v-model="parentPhone"
                placeholder=" "
                required
                class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
              />
              <label 
                for="parent-phone" 
                class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                       peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Teléfono
              </label>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i class="fas fa-phone text-emerald-500"></i>
              </div>
            </div>
  
            <div class="relative">
              <input
                id="parent-username"
                type="text"
                v-model="parentUsername"
                placeholder=" "
                required
                class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
              />
              <label 
                for="parent-username" 
                class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                       peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Crear Usuario
              </label>
            </div>
  
            <div class="relative">
              <input
                id="parent-password"
                type="password"
                v-model="parentPassword"
                placeholder=" "
                required
                class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
              />
              <label 
                for="parent-password" 
                class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                       peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Crear Contraseña
              </label>
            </div>
  
            <div class="relative md:col-span-2">
              <input
                id="parent-confirm-password"
                type="password"
                v-model="parentConfirmPassword"
                placeholder=" "
                required
                class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
              />
              <label 
                for="parent-confirm-password" 
                class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                       peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Confirmar Contraseña
              </label>
            </div>
          </div>
  
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div class="relative md:col-span-2">
              <input
                id="student-name"
                type="text"
                v-model="studentName"
                placeholder=" "
                required
                class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
              />
              <label 
                for="student-name" 
                class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                       peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Nombre del Estudiante
              </label>
            </div>
  
            <div class="relative md:col-span-2">
              <label for="student-grade" class="block text-gray-700 text-sm font-medium mb-1 text-left">Grado (1° a 6°)</label>
              <select
                id="student-grade"
                v-model="studentGrade"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 focus:border-2 outline-none transition-all duration-200 bg-white"
              >
                <option value="" disabled>Selecciona el grado</option>
                <option v-for="n in 6" :key="n" :value="n">{{ n }}°</option>
              </select>
            </div>
  
            <div class="md:col-span-2 pt-2">
              <label class="block text-gray-700 text-sm font-medium mb-2 text-left">Materias a reforzar o con tareas pendientes:</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-gray-700">
                <div v-for="subject in subjectsList" :key="subject" class="flex items-center">
                  <input
                    type="checkbox"
                    :id="`subject-${subject}`"
                    :value="subject"
                    v-model="subjectsToReinforce"
                    class="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label :for="`subject-${subject}`" class="ml-2">{{ subject }}</label>
                </div>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-emerald-500 text-white py-3 rounded-md font-semibold hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center mt-6"
          >
            <template v-if="isLoading">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>
                {{ !showStudentForm ? 'Registrando padre/madre...' : 'Activando suscripción...' }}
              </span>
            </template>
            <template v-else>
              <span>
                {{ !showStudentForm ? 'Registrar Padre/Madre' : 'Activar Suscripción' }}
              </span>
            </template>
          </button>
        </form>
  
        <div class="mt-8 text-sm text-center">
          <p class="text-gray-600">¿Ya tienes cuenta de Padre/Madre? 
            <a href="/student-login" class="text-emerald-500 hover:underline font-medium transition-colors duration-200 hover:text-emerald-600 hover:font-semibold">Inicia sesión aquí</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios'; // Asegúrate de tener axios instalado: npm install axios
  import { API_BASE_URL } from '@/config/api'; // <--- AÑADE ESTA LÍNEA (si no está)
  
  // ... (tus referencias de ref existentes)
  const parentFullName = ref('');
  const parentEmail = ref('');
  const parentPhone = ref('');
  const parentUsername = ref(''); 
  const parentPassword = ref('');
  const parentConfirmPassword = ref('');
  
  const studentName = ref('');
  const studentGrade = ref('');
  const subjectsToReinforce = ref([]);
  
  const subjectsList = [
    'Comunicación', 'Raz. Verbal', 'Matemática', 'Raz. Matemático', 
    'Ciencia y Tecnología', 'Personal Social', 'Álgebra', 'Aritmética', 
    'Geometría', 'Gramática', 'Plan Lector', 'Ortografía', 
    'Historia del Perú', 'Geografía', 'Biología', 'Inglés', 'Computación'
  ];
  
  const showStudentForm = ref(false); 
  const errorMessage = ref(null); 
  const successMessage = ref(null);
  const isLoading = ref(false);   
  
  const router = useRouter();
  
  // Variable para almacenar el ID del padre después del primer paso
  const registeredParentUserId = ref(null);
  
  // ELIMINA ESTA LÍNEA:
  // const API_BASE_URL = 'http://localhost:8000'; // Asegúrate de que esta URL sea correcta para tu backend
  
  const goBack = () => {
    router.back(); 
  };
  
  const handleSubmit = async () => {
    errorMessage.value = null; 
    successMessage.value = null;
    isLoading.value = true;   
  
    try {
      if (!showStudentForm.value) { // Paso 1: Registro del Padre/Madre
        if (parentPassword.value !== parentConfirmPassword.value) {
          errorMessage.value = 'Las contraseñas no coinciden. Por favor, verifica.';
          isLoading.value = false; // Detener carga
          return;
        }
        
        const parentData = {
          full_name: parentFullName.value,
          email: parentEmail.value,
          phone_number: parentPhone.value,
          password: parentPassword.value, 
        };
  
        console.log('Enviando datos de Padre/Madre:', parentData);
  
        // USO CORRECTO DE API_BASE_URL IMPORTADA
        const response = await axios.post(`${API_BASE_URL}/register/parent`, parentData);
        
        console.log('Respuesta del backend (Padre):', response.data);
        registeredParentUserId.value = response.data.user_id; 
  
        successMessage.value = '¡Registro de Padre/Madre completado! Ahora, por favor, registra a tu hijo/a.';
        showStudentForm.value = true; 
  
      } else { // Paso 2: Registro del Hijo/a
        if (!registeredParentUserId.value) {
          errorMessage.value = 'Error: No se encontró el ID del padre. Por favor, reinicia el proceso.';
          isLoading.value = false;
          return;
        }
  
        const studentData = {
          student_name: studentName.value,
          student_grade: parseInt(studentGrade.value), 
          subjects_to_reinforce: subjectsToReinforce.value,
        };
  
        console.log('Enviando datos de Estudiante:', studentData);
  
        // USO CORRECTO DE API_BASE_URL IMPORTADA
        const response = await axios.post(`${API_BASE_URL}/register/student/${registeredParentUserId.value}`, studentData);
  
        console.log('Respuesta del backend (Estudiante):', response.data);
  
        successMessage.value = '¡Registro de estudiante y activación de suscripción exitosos! Ya puedes acceder a la plataforma.';
        
        // Opcional: Limpiar el formulario y/o redirigir después del éxito
        parentFullName.value = '';
        parentEmail.value = '';
        parentPhone.value = '';
        parentUsername.value = ''; 
        parentPassword.value = '';
        parentConfirmPassword.value = '';
        studentName.value = '';
        studentGrade.value = '';
        subjectsToReinforce.value = [];
        showStudentForm.value = false; 
        registeredParentUserId.value = null; 
  
        // Puedes añadir una redirección aquí si es necesario
        // router.push('/student-login'); 
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        errorMessage.value = error.response.data.detail;
      } else {
        errorMessage.value = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
      }
    } finally {
      isLoading.value = false; 
    }
  };
  </script>
  
  <style scoped>
  /* Animaciones personalizadas para el fondo */
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  /* Retrasos para las animaciones del fondo */
  .animate-blob {
    animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  /* Animación de entrada para el formulario */
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
  
  /* Asegúrate de tener Font Awesome configurado en tu proyecto para los íconos */
  </style>