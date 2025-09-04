<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center p-4 sm:p-6 font-sans antialiased">
    <header class="fixed top-0 left-0 w-screen bg-white/90 backdrop-blur-sm shadow-md py-3 sm:py-4 md:py-5 z-50 flex justify-center items-center px-4 sm:px-6 border-b border-gray-100 animate-fade-in-down">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
        LEARN EASY
      </h1>
    </header>

    <div class="flex flex-col items-center flex-grow justify-center w-full max-w-4xl mt-10 sm:mt-12 md:mt-16">
      <div class="mb-10 sm:mb-12 text-center space-y-2">
        <h2 class="text-2xl sm:text-3xl font-medium text-gray-600">Bienvenido a</h2>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
          Selecciona tu Rol
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl w-full">
        <button
          v-for="(role, index) in roles"
          :key="role.id"
          @click="selectRole(role.id)"
          class="role-card group"
          :style="`animation-delay: ${index * 0.1}s`"
          :aria-label="`Seleccionar rol de ${role.name}`"
        >
          <div class="icon-container">
            <i :class="role.icon"></i>
          </div>
          <span class="role-title">{{ role.name }}</span>
          <span class="role-subtitle" v-if="role.subtitle">{{ role.subtitle }}</span>
        </button>
      </div>

      <div class="flex flex-row gap-4 mt-6">
        <button
          @click="selectRole('designer')"
          class="mini-role-button group bg-gradient-to-br from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 focus:ring-purple-300"
          aria-label="Seleccionar rol de Diseñador Manual"
        >
          <i class="fas fa-paint-brush"></i>
          <span>Diseñador Manual</span>
        </button>
        <button
          @click="selectRole('psychologist')"
          class="mini-role-button group bg-gradient-to-br from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 focus:ring-teal-300"
          aria-label="Seleccionar rol de Asesor Psicológico"
        >
          <i class="fas fa-brain"></i>
          <span>Asesor Psicológico</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const roles = [
  {
    id: 'teacher',
    name: 'Docente',
    icon: 'fas fa-chalkboard-teacher',
    color: 'from-rose-500 to-rose-600'
  },
  {
    id: 'student',
    name: 'Estudiante',
    subtitle: 'Padre de familia',
    icon: 'fas fa-user-graduate',
    color: 'from-emerald-500 to-emerald-600'
  }
];

const selectRole = (roleId) => {
  // Redirigir a la ruta específica de login para cada rol
  switch (roleId) {
    case 'teacher':
      router.push('/teacher-login');
      break;
    case 'student':
      router.push('/student-login');
      break;
    case 'designer':
      // Modificación aquí: la ruta para Designer
      router.push('/Designer/Designer_login'); 
      break;
    case 'psychologist':
      router.push('/psychologist-login'); 
      break;
    default:
      console.warn('Rol no reconocido:', roleId);
      router.push('/');
  }
};
</script>

<style scoped>
/* Animaciones mejoradas */
@keyframes card-entrance {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

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

/* Estilos base mejorados */
.role-card {
  @apply relative overflow-hidden rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer
  transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
  hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
  animate-card-entrance;
  opacity: 0;
  animation-fill-mode: forwards;
}

.icon-container {
  @apply flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110;
}

.icon-container i {
  @apply text-4xl sm:text-5xl;
}

.role-title {
  @apply text-xl sm:text-2xl font-semibold text-center;
}

.role-subtitle {
  @apply text-sm sm:text-base font-medium opacity-80 mt-1;
}

/* Colores y efectos para cada tarjeta */
.role-card:nth-child(1) {
  @apply bg-gradient-to-br from-rose-500 to-rose-600 text-white focus:ring-rose-300;
}

.role-card:nth-child(2) {
  @apply bg-gradient-to-br from-emerald-500 to-emerald-600 text-white focus:ring-emerald-300;
}

/* Las siguientes reglas de nth-child ya no aplicarán si solo hay 2 roles */
.role-card:nth-child(3) {
  /* @apply bg-gradient-to-br from-sky-500 to-sky-600 text-white focus:ring-sky-300; */
}

.role-card:nth-child(4) {
  /* @apply bg-gradient-to-br from-emerald-500 to-emerald-600 text-white focus:ring-emerald-300; */
}

/* Efecto hover refinado */
.role-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

/* Efecto de "brillo" más sutil */
.role-card::after {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  content: '';
  background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
}

.role-card:hover::after {
  opacity: 1;
}

/* Animación personalizada */
.animate-card-entrance {
  animation: card-entrance 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Mejoras de accesibilidad para enfoque */
.role-card:focus {
  @apply ring-2 ring-offset-2 ring-opacity-50;
  outline: none;
}

/* Estilos para los nuevos botones pequeños */
.mini-role-button {
  @apply px-4 py-2 text-sm rounded-lg flex items-center gap-2
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.mini-role-button i {
  @apply text-base;
}
</style>