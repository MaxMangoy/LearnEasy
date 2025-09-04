<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white flex font-sans antialiased">
      <TeachingSidebar ref="sidebarRef" />
  
      <div class="flex-1 flex flex-col md:ml-64 transition-all duration-300 ease-in-out">
        <TeachingHeader @toggle-sidebar="toggleSidebar" />
    
        <main class="flex flex-col items-center justify-start w-full max-w-6xl mt-24 sm:mt-28 md:mt-32 px-4 md:px-0 mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 sm:mb-10 text-center animate-fade-in-up">
            ¡Bienvenido, Docente!
          </h2>
    
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-fade-in-up animation-delay-200">
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center">
              <i class="fas fa-user-circle text-sky-500 text-5xl mb-4"></i>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Mi Perfil</h3>
              <p class="text-gray-500 text-sm mb-4">
                Gestiona tu información personal, cursos a cargo y contraseña.
              </p>
              <button @click="goToProfile" class="bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition-colors duration-200">
                Ver Perfil
              </button>
            </div>
    
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center">
              <i class="fas fa-calendar-alt text-amber-500 text-5xl mb-4"></i>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Registro de Horarios</h3>
              <p class="text-gray-500 text-sm mb-4">
                Define tus horas disponibles para clases y reforzamientos.
              </p>
              <button @click="goToSchedule" class="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 transition-colors duration-200">
                Gestionar Horarios
              </button>
            </div>
    
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center">
              <i class="fas fa-book-open text-green-500 text-5xl mb-4"></i>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Reforzamiento y Tareas</h3>
              <p class="text-gray-500 text-sm mb-4">
                Accede a la lista de estudiantes, materiales y seguimiento.
              </p>
              <button @click="goToReinforcement" class="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                Ir a Reforzamiento
              </button>
            </div>
          </div>
    
          <div class="w-full mt-8 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center">
              <i class="fas fa-puzzle-piece text-purple-500 text-5xl mb-4"></i>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Crear Juegos Didácticos</h3>
              <p class="text-gray-500 text-sm mb-4">
                Desarrolla actividades interactivas para tus estudiantes. 
              </p>
              <button @click="goToGames" class="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">
                Crear Juego
              </button>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import TeachingSidebar from './Teaching_sidebar.vue'; 
  import TeachingHeader from './Teaching_header.vue'; // ¡Nueva importación para el encabezado!
  
  const router = useRouter();
  const sidebarRef = ref(null); 
  
  const toggleSidebar = () => {
    if (sidebarRef.value) {
      sidebarRef.value.toggleSidebar();
    }
  };
  
  const goToProfile = () => {
    router.push('/teacher-profile'); 
  };
  
  const goToSchedule = () => {
    alert('Navegar a Registro de Horarios (Implementación pendiente)');
    // router.push('/teacher-schedule');
  };
  
  const goToReinforcement = () => {
    alert('Navegar a Reforzamiento y Tareas (Implementación pendiente)');
    // router.push('/teacher-reinforcement');
  };
  
  const goToGames = () => {
    alert('Navegar a Crear Juegos Didácticos (Implementación pendiente)');
    // router.push('/teacher-games');
  };
  </script>
  
  <style scoped>
  /* Animaciones */
  @keyframes fade-in-down {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
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
  
  .animate-fade-in-down {
    animation: fade-in-down 0.5s ease-out forwards;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
  
  /* Retrasos para animaciones en cascada */
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  /* Puedes añadir más estilos si los necesitas aquí */
  </style>