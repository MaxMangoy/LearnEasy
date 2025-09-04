<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-start p-6 sm:p-10 font-sans antialiased relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-20">
      <div class="absolute w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-0 left-0"></div>
      <div class="absolute w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-0 right-0"></div>
      <div class="absolute w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-0 left-0"></div>
    </div>

    <header class="fixed top-0 left-0 w-screen bg-white/90 backdrop-blur-sm shadow-md py-3 sm:py-4 md:py-5 z-50 flex items-center justify-center px-4 sm:px-6 border-b border-gray-100 animate-fade-in-down">
      <button 
        @click="goBack" 
        class="absolute left-4 sm:left-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Regresar"
      >
        <i class="fas fa-arrow-left text-green-500 text-lg"></i> </button>
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
        LEARN EASY
      </h1>
    </header>

    <div class="relative z-10 bg-white p-8 sm:p-10 rounded-2xl shadow-3xl w-full max-w-md text-center transform transition-all duration-500 ease-out animate-fade-in-up mt-20 sm:mt-24 lg:mt-28 border border-gray-100">
      <div class="pb-4 mb-6 border-b border-gray-200">
        <h2 class="text-2xl font-semibold text-gray-700">Iniciar Sesión Estudiante</h2>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>

        <div class="relative">
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder=" "
            required
            class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
          />
          <label 
            for="email" 
            class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                   peer-focus:-top-2.5 peer-focus:text-green-600 peer-focus:text-sm" >
            Correo Electrónico
          </label>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <i class="fas fa-envelope text-green-500"></i> </div>
        </div>
        
        <div class="relative">
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder=" "
            required
            class="peer w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 focus:border-2 placeholder-transparent outline-none transition-all duration-200"
          />
          <label 
            for="password" 
            class="absolute left-3 -top-2.5 text-gray-600 text-sm bg-white px-1 transition-all duration-200
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3
                   peer-focus:-top-2.5 peer-focus:text-green-600 peer-focus:text-sm" >
            Contraseña
          </label>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'" class="text-green-500 hover:text-green-600"></i> </div>
          </div>

        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center">
            <input 
              id="remember-me" 
              name="remember-me" 
              type="checkbox" 
              class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer" />
            <label for="remember-me" class="ml-2 block text-gray-900">
              Recordarme
            </label>
          </div>
          <a href="#" class="font-medium text-green-500 hover:text-green-600 hover:font-semibold transition-colors duration-200"> ¿Olvidaste tu contraseña?
          </a>
        </div>
        
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center" >
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Accediendo...
          </span>
          <span v-else>Acceder</span>
        </button>
      </form>

      <div class="mt-8 text-sm">
        <p class="text-gray-600">¿No tienes cuenta de Estudiante (Padre de Familia)? 
          <router-link to="/student-register" class="text-green-500 hover:underline font-medium transition-colors duration-200 hover:text-green-600 hover:font-semibold">Regístrate aquí</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// REMUEVE esta línea: import axios from 'axios'; 
import { useUserStore } from '@/stores/user'; // <--- Importa tu store de usuario

const email = ref('');
const password = ref('');
const errorMessage = ref(null); 
const isLoading = ref(false);   
const showPassword = ref(false); 
const router = useRouter();
const userStore = useUserStore(); // <--- Instancia de tu store de usuario

const goBack = () => {
  router.push({ name: 'roles' }); 
};

const handleLogin = async () => {
  errorMessage.value = null; 
  isLoading.value = true;   

  try {
    // LLAMADA CLAVE: Usa la acción 'login' de tu store de Pinia.
    // Esta acción debe encargarse de la comunicación con tu backend
    // y de actualizar el estado del store (isAuthenticated, user, etc.).
    await userStore.login({
      email: email.value,
      password: password.value,
      role: 'parent' // <--- ¡Pasa el rol 'parent' aquí!
    });

    // Si la acción 'login' en el store no lanzó un error, redirige.
    router.push({ name: 'studentProfile' }); 

  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage.value = error.response.data.detail || 'Correo o contraseña incorrectos.';
      } else if (error.response.status === 403) {
        errorMessage.value = error.response.data.detail || 'Tu cuenta no ha sido aprobada o no tiene los permisos necesarios.';
      } else {
        errorMessage.value = 'Error en el servidor. Inténtalo de nuevo más tarde.';
      }
    } else if (error.request) {
      errorMessage.value = 'No se pudo conectar con el servidor. Verifica tu conexión.';
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