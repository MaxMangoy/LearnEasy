<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center p-6 font-sans antialiased">
      
      <div class="relative z-10 flex flex-col items-center max-w-md w-full">
        
        <div class="relative mb-8 animate-fade-in-down">
          <div class="absolute -inset-3 bg-gradient-to-r from-learn-easy-red/20 to-red-600/20 rounded-full blur-md opacity-75"></div>
          <img :src="logoSrc" alt="Learn Easy Logo" 
               class="relative z-10 w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-full 
                      border-4 border-white/50 shadow-lg">
        </div>
        
        <h1 class="text-4xl sm:text-6xl font-extrabold text-center mb-6 
                   text-gray-900 leading-tight tracking-tight animate-fade-in">
          LEARN EASY
        </h1>
        
        <p class="text-lg sm:text-xl text-gray-700/90 mb-12 leading-relaxed 
                  text-center font-medium animate-fade-in-up max-w-xs mx-auto">
          Transforma tu aprendizaje en una experiencia simple, rápida y efectiva.
        </p>
        
        <div class="relative z-10 animate-fade-in-up" style="animation-delay: 0.3s">
          <button 
            @click="goToRoleSelection"
            class="relative px-12 py-4 sm:px-14 sm:py-5 text-xl sm:text-2xl font-bold 
                   text-gray-900 bg-custom-button-gradient rounded-full 
                   shadow-xl hover:shadow-2xl transition-all duration-300 ease-out
                   hover:-translate-y-1 active:scale-[0.98] active:brightness-90
                   overflow-hidden group w-full max-w-xs mx-auto animate-pulse-subtle
                   focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
          >
            <span class="relative z-10 flex items-center justify-center">
              Comenzar
              <svg class="ml-3 w-6 h-6 transition-transform duration-300 ease-out 
                          group-hover:translate-x-1 group-hover:scale-110" 
                   fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
              </svg>
            </span>
            <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-12 
                          group-hover:translate-x-[100%]"></span>
          </button>
        </div>
      </div>
      
      <div class="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-learn-easy-green/10 
                  blur-3xl pointer-events-none transform rotate-45"></div>
      <div class="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-learn-easy-red/10 
                  blur-3xl pointer-events-none transform -rotate-45"></div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import logoSrc from '@/assets/imagenes/logo.jpg'; 
  
  const router = useRouter();
  
  const goToRoleSelection = () => {
    router.push('/roles');
  };
  </script>
  
  <style scoped>
  /* Definición de colores personalizados y variables CSS para el botón */
  :root {
    --color-learn-easy-red: #FF6F6F; 
    /* Nuevas variables para el color del botón */
    --color-button-base: #bee0e9; /* El color principal solicitado */
    --color-button-darker: #a7cbe0; /* Un tono ligeramente más oscuro para el degradado */
  }
  
  /* Clase para el degradado del botón con el color solicitado */
  .bg-custom-button-gradient {
    background-image: linear-gradient(to bottom right, var(--color-button-darker), var(--color-button-base));
  }
  
  /* Animaciones existentes */
  @keyframes fade-in-down {
    0% {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes fade-in {
    0% {
      opacity: 0;
      filter: blur(4px);
    }
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
  
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
  
  /* Animación para el botón: pulsación suave */
  @keyframes pulse-subtle {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Sombra inicial (shadow-xl) */
    }
    50% {
      transform: scale(1.01); /* Ligeramente más grande para el efecto de pulsación */
      box-shadow: 0 15px 20px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -4px rgba(0, 0, 0, 0.1); /* Sombra más grande en el pico */
    }
  }
  
  .animate-fade-in-down {
    animation: fade-in-down 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .animate-fade-in {
    animation: fade-in 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: 0.2s;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.4s;
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 2s infinite ease-in-out; /* Aplica la animación de pulsación infinita */
  }
  </style>