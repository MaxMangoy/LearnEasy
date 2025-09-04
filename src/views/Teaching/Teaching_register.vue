<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-start p-6 sm:p-10 font-sans antialiased relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-20">
      <div class="absolute w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-0 left-0"></div>
      <div class="absolute w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-0 right-0"></div>
      <div class="absolute w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-0 left-0"></div>
    </div>

    <header class="fixed top-0 left-0 w-screen bg-white/90 backdrop-blur-sm shadow-md py-3 sm:py-4 md:py-5 z-50 flex items-center justify-center px-4 sm:px-6 border-b border-gray-100 animate-fade-in-down">
      <button 
        @click="goBack" 
        class="absolute left-4 sm:left-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
        aria-label="Regresar"
      >
        <i class="fas fa-arrow-left text-rose-500 text-lg"></i>
      </button>
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
        LEARN EASY
      </h1>
    </header>

    <div class="relative z-10 bg-white p-8 sm:p-10 rounded-2xl shadow-3xl w-full max-w-xl md:max-w-2xl lg:max-w-4xl text-center transform transition-all duration-500 ease-out animate-fade-in-up mt-20 sm:mt-24 lg:mt-28 border border-gray-100">
      <div class="pb-4 mb-6 border-b border-gray-200">
        <h2 class="text-2xl font-semibold text-gray-700">Postular como Docente</h2>
        <p class="text-gray-500 text-sm mt-1">Completa el siguiente formulario para unirte a nuestro equipo.</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-4 text-left"> 
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>

        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm" role="alert">
          <span class="block sm:inline">{{ successMessage }}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"> 
          <div class="relative md:col-span-2">
            <input
              id="full-name"
              type="text"
              v-model="fullName"
              placeholder=" "
              required
              class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
            />
            <label 
              for="full-name" 
              class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                     peer-focus:-top-2.5 peer-focus:text-rose-600 peer-focus:text-sm"
            >
              Nombres y Apellidos
            </label>
          </div>

          <div class="relative">
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder=" "
              required
              class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
            />
            <label 
              for="email" 
              class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                     peer-focus:-top-2.5 peer-focus:text-rose-600 peer-focus:text-sm"
            >
              Correo Electrónico
            </label>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i class="fas fa-envelope text-rose-500"></i>
            </div>
          </div>
          
          <div class="relative">
            <input
              id="phone"
              type="tel"
              v-model="phone"
              placeholder=" "
              required
              class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
            />
            <label 
              for="phone" 
              class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                     peer-focus:-top-2.5 peer-focus:text-rose-600 peer-focus:text-sm"
            >
              Teléfono
            </label>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <i class="fas fa-phone text-rose-500"></i>
            </div>
          </div>

          <div class="relative">
            <input
              id="specialties"
              type="text"
              v-model="specialties"
              placeholder=" "
              required
              class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
            />
            <label 
              for="specialties" 
              class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                     peer-focus:-top-2.5 peer-focus:text-rose-600 peer-focus:text-sm"
            >
              Especialidades
            </label>
          </div>

          <div class="relative">
            <input
              id="experience"
              type="number"
              v-model="experienceYears"
              placeholder=" "
              required
              min="0"
              class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
            />
            <label 
              for="experience" 
              class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                     peer-focus:-top-2.5 peer-focus:text-rose-600 peer-focus:text-sm"
            >
              Años de Experiencia
            </label>
          </div>
          
          <div class="relative flex flex-col items-start md:col-span-2 pt-2"> 
            <label for="cv-upload" class="block text-gray-700 text-sm font-medium mb-1">Subir CV (PDF, DOCX, JPG, PNG)</label> 
            <input
              id="cv-upload"
              type="file"
              @change="handleCvUpload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              required
              class="w-full text-gray-700 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0 file:text-sm file:font-semibold
                     file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100
                     transition-all duration-200 cursor-pointer"
            />
            <p v-if="cvFileName" class="text-sm text-gray-500 mt-1">Archivo seleccionado: {{ cvFileName }}</p> 
          </div>

          <div class="relative md:col-span-2">
            <textarea
              id="availability"
              v-model="availability"
              placeholder=" "
              rows="2" required
              class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200 resize-y"
            ></textarea>
            <label 
              for="availability" 
              class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                     peer-focus:-top-2.5 peer-focus:text-rose-600 peer-focus:text-sm"
            >
              Disponibilidad Horaria (Ej. Lunes 9-12, Martes 2-5)
            </label>
          </div>

          <div class="relative">
            <label for="interview-date" class="block text-gray-700 text-sm font-medium mb-1">Fecha de Entrevista</label> 
            <input
              id="interview-date"
              type="date"
              v-model="interviewDate"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 focus:border-2 outline-none transition-all duration-200"
            />
          </div>
          <div class="relative">
            <label for="interview-time" class="block text-gray-700 text-sm font-medium mb-1">Hora de Entrevista</label> 
            <input
              id="interview-time"
              type="time"
              v-model="interviewTime"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 focus:border-2 outline-none transition-all duration-200"
            />
          </div>
        </div>
        
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-rose-500 text-white py-3 rounded-md font-semibold hover:bg-rose-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 flex items-center justify-center mt-6"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando postulación...
          </span>
          <span v-else>Postularme</span>
        </button>
      </form>

      <div class="mt-8 text-sm text-center">
        <p class="text-gray-600">¿Ya tienes cuenta de Docente? 
          <a href="/teacher-login" class="text-rose-500 hover:underline font-medium transition-colors duration-200 hover:text-rose-600 hover:font-semibold">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Si vas a usar axios aquí en el futuro, mantén la importación, si no, puedes quitarla.
// import axios from 'axios'; 

import { API_BASE_URL } from '@/config/api'; // <--- ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ AQUÍ

const fullName = ref('');
const email = ref('');
const phone = ref('');
const specialties = ref('');
const experienceYears = ref(0);
const cvFile = ref(null);
const cvFileName = ref('');
const availability = ref('');
const interviewDate = ref('');
const interviewTime = ref('');

const errorMessage = ref(null);
const successMessage = ref(null);
const isLoading = ref(false);

const router = useRouter();

// ELIMINA ESTA LÍNEA:
// const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
// if (!API_BASE_URL) {
//   console.error("VITE_APP_API_URL no está definida en tus variables de entorno.");
//   errorMessage.value = "Error de configuración: La URL de la API no está definida.";
// }

const goBack = () => {
  router.back();
};

const handleCvUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validación de tipos de archivo permitidos
    const allowedTypes = [
      'application/pdf',
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'image/jpeg', // .jpg, .jpeg
      'image/png'   // .png
    ];
    
    if (!allowedTypes.includes(file.type)) {
      errorMessage.value = "Tipo de archivo no permitido. Por favor, sube un PDF, DOCX, JPG o PNG.";
      cvFile.value = null;
      cvFileName.value = '';
      event.target.value = ''; // Limpiar la selección de archivo
      return;
    }
    // Validación del tamaño del archivo (ej. max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      errorMessage.value = "El archivo es demasiado grande. Máximo 5MB.";
      cvFile.value = null;
      cvFileName.value = '';
      event.target.value = ''; // Limpiar la selección de archivo
      return;
    }

    cvFile.value = file;
    cvFileName.value = file.name;
    errorMessage.value = null; // Limpiar cualquier mensaje de error anterior
    console.log('CV seleccionado:', file.name);
  } else {
    cvFile.value = null;
    cvFileName.value = '';
  }
};

const handleRegister = async () => {
  errorMessage.value = null;
  successMessage.value = null;
  isLoading.value = true;

  console.log('handleRegister: 1. Iniciando...'); 

  // La validación de API_BASE_URL ahora la puedes hacer directamente así:
  if (!API_BASE_URL) {
    console.error("handleRegister: 2. API_BASE_URL no definida."); 
    errorMessage.value = "Error de configuración: La URL de la API no está definida."; // Mensaje para el usuario
    isLoading.value = false;
    return;
  }

  // Validación básica antes de enviar
  if (!fullName.value || !email.value || !phone.value || !specialties.value ||
      experienceYears.value === null || !cvFile.value || !availability.value ||
      !interviewDate.value || !interviewTime.value) {
    errorMessage.value = "Por favor, completa todos los campos del formulario.";
    isLoading.value = false;
    console.warn("handleRegister: 3. Campos faltantes en el formulario."); 
    console.log("handleRegister: 3.1. cvFile.value al validar:", cvFile.value); 
    return;
  }

  try {
    const formData = new FormData();
    formData.append('full_name', fullName.value);
    formData.append('email', email.value);
    formData.append('phone_number', phone.value);
    formData.append('specialties', specialties.value);
    formData.append('years_of_experience', experienceYears.value);
    formData.append('availability', availability.value);
    formData.append('interview_date', interviewDate.value);
    formData.append('interview_time', interviewTime.value);
    
    console.log("handleRegister: 4. Preparando CV..."); 
    // Asegúrate de que cvFile.value sea un objeto File
    if (cvFile.value) {
      formData.append('cv_file', cvFile.value);
      console.log('handleRegister: 5. CV adjuntado a FormData:', cvFile.value.name); 
    } else {
        errorMessage.value = "Por favor, sube tu CV.";
        isLoading.value = false;
        console.error("handleRegister: 6. cvFile.value es nulo/inválido antes de adjuntar."); 
        return;
    }

    console.log('handleRegister: 7. Enviando datos al backend...'); 
    // Realiza la llamada HTTP al backend
    const response = await fetch(`${API_BASE_URL}/register-teacher/`, { // <-- USA API_BASE_URL IMPORTADA
      method: 'POST',
      body: formData,
      // No establezcas 'Content-Type': 'multipart/form-data' manualmente.
      // Fetch API lo hace automáticamente cuando el body es una instancia de FormData.
    });

    console.log('handleRegister: 8. Respuesta recibida del backend.'); 

    if (!response.ok) {
      // Si la respuesta no es OK (ej. 400, 500), intenta parsear el error del backend
      const errorData = await response.json();
      console.error('handleRegister: 9. Error de respuesta del backend:', errorData); 
      throw new Error(errorData.detail || 'Error desconocido al enviar la postulación.');
    }

    const data = await response.json();
    console.log('handleRegister: 10. Postulación exitosa, datos:', data); 
    successMessage.value = '¡Postulación enviada con éxito! Nuestro equipo evaluará tu perfil y te contactará por correo para informarte sobre los siguientes pasos.';

    // Opcional: Limpiar el formulario después del éxito
    fullName.value = '';
    email.value = '';
    phone.value = '';
    specialties.value = '';
    experienceYears.value = 0;
    cvFile.value = null;
    cvFileName.value = '';
    availability.value = '';
    interviewDate.value = '';
    interviewTime.value = '';

  } catch (error) {
    console.error('handleRegister: 11. Error durante la postulación (en catch):', error); 
    errorMessage.value = error.message || 'Ocurrió un error inesperado al enviar tu postulación. Por favor, inténtalo de nuevo.';
  } finally {
    isLoading.value = false;
    console.log('handleRegister: 12. Finalizando...'); 
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